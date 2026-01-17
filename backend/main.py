from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
import os
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
from pinecone import Pinecone
import requests
import json

load_dotenv()

app = FastAPI(title="Company A Chatbot API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables
embedding_model = None
pinecone_index = None
conversation_history = {}

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = "default"
    history: Optional[List[Message]] = []

class ChatResponse(BaseModel):
    response: str
    sources: Optional[List[Dict]] = []

def initialize_services():
    """Initialize embedding model and Pinecone connection"""
    global embedding_model, pinecone_index
    
    print("Initializing services...")
    
    # Load embedding model
    embedding_model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
    
    # Initialize Pinecone
    pc = Pinecone(api_key=os.getenv('PINECONE_API_KEY'))
    index_name = os.getenv('PINECONE_INDEX_NAME', 'company-a-chatbot')
    pinecone_index = pc.Index(index_name)
    
    print("Services initialized successfully!")

@app.on_event("startup")
async def startup_event():
    """Run on application startup"""
    initialize_services()

def retrieve_context(query: str, top_k: int = 5) -> List[Dict]:
    """Retrieve relevant context from Pinecone"""
    # Generate query embedding
    query_embedding = embedding_model.encode(query).tolist()
    
    # Query Pinecone
    results = pinecone_index.query(
        vector=query_embedding,
        top_k=top_k,
        include_metadata=True
    )
    
    # Extract relevant documents
    contexts = []
    for match in results['matches']:
        if match['score'] > 0.3:  # Relevance threshold
            contexts.append({
                'text': match['metadata'].get('text', ''),
                'category': match['metadata'].get('category', ''),
                'score': match['score']
            })
    
    return contexts

def call_openrouter_api(messages: List[Dict], context: str) -> str:
    """Call OpenRouter API for response generation"""
    api_key = os.getenv('OPENROUTER_API_KEY')
    
    # Construct system prompt with context
    system_prompt = f"""You are a helpful AI assistant for Company A, a leading technology and manufacturing company. 
You provide accurate information about the company based on the context provided.

CONTEXT INFORMATION:
{context}

Instructions:
- Answer questions accurately based on the context provided
- If the information is not in the context, politely say you don't have that information
- Be professional, friendly, and concise
- For contact information, provide the relevant emails and phone numbers from the context
- When discussing financials, be specific about the year
"""

    # Prepare messages for API
    api_messages = [
        {"role": "system", "content": system_prompt}
    ] + messages
    
    # Call OpenRouter API
    response = requests.post(
        url="https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        },
        json={
            "model": "mistralai/devstral-2512:free",  # Free model
            "messages": api_messages,
            "temperature": 0.7,
            "max_tokens": 500
        }
    )
    
    if response.status_code == 200:
        result = response.json()
        return result['choices'][0]['message']['content']
    else:
        raise HTTPException(status_code=500, detail=f"OpenRouter API error: {response.text}")

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Main chat endpoint"""
    try:
        # Retrieve relevant context
        contexts = retrieve_context(request.message, top_k=5)
        
        # Combine context texts
        context_text = "\n\n".join([f"[{ctx['category']}]: {ctx['text']}" for ctx in contexts])
        
        # Build message history
        messages = []
        for msg in request.history[-5:]:  # Keep last 5 messages for context
            messages.append({
                "role": msg.role,
                "content": msg.content
            })
        
        # Add current message
        messages.append({
            "role": "user",
            "content": request.message
        })
        
        # Get response from OpenRouter
        response = call_openrouter_api(messages, context_text)
        
        return ChatResponse(
            response=response,
            sources=contexts[:3]  # Return top 3 sources
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "embedding_model": "sentence-transformers/all-MiniLM-L6-v2",
        "llm": "OpenRouter API",
        "vector_db": "Pinecone"
    }

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Company A Chatbot API",
        "version": "1.0.0",
        "endpoints": {
            "/chat": "POST - Send chat messages",
            "/health": "GET - Health check"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)