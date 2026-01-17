import json
import os
from typing import List, Dict
from sentence_transformers import SentenceTransformer
from pinecone import Pinecone, ServerlessSpec
from dotenv import load_dotenv
import time

load_dotenv()

class DataPreprocessor:
    def __init__(self):
        """Initialize the data preprocessor with HuggingFace embeddings"""
        print("Loading embedding model...")
        self.model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
        self.dimension = 384  # Dimension for all-MiniLM-L6-v2
        
        # Initialize Pinecone
        print("Initializing Pinecone...")
        self.pc = Pinecone(api_key=os.getenv('PINECONE_API_KEY'))
        self.index_name = os.getenv('PINECONE_INDEX_NAME', 'company-a-chatbot')
        
    def create_pinecone_index(self):
        """Create a new Pinecone index if it doesn't exist"""
        try:
            # Check if index exists
            existing_indexes = self.pc.list_indexes()
            
            if self.index_name not in [index.name for index in existing_indexes]:
                print(f"Creating new index: {self.index_name}")
                self.pc.create_index(
                    name=self.index_name,
                    dimension=self.dimension,
                    metric='cosine',
                    spec=ServerlessSpec(
                        cloud='aws',
                        region='us-east-1'
                    )
                )
                # Wait for index to be ready
                while not self.pc.describe_index(self.index_name).status['ready']:
                    time.sleep(1)
                print("Index created successfully!")
            else:
                print(f"Index {self.index_name} already exists")
                
            return self.pc.Index(self.index_name)
        except Exception as e:
            print(f"Error creating index: {e}")
            raise
    
    def chunk_text(self, text: str, chunk_size: int = 500, overlap: int = 50) -> List[str]:
        """Split text into overlapping chunks"""
        words = text.split()
        chunks = []
        
        for i in range(0, len(words), chunk_size - overlap):
            chunk = ' '.join(words[i:i + chunk_size])
            if chunk:
                chunks.append(chunk)
                
        return chunks
    
    def process_company_data(self, data_path: str) -> List[Dict]:
        """Process company data and create document chunks"""
        with open(data_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        documents = []
        doc_id = 0
        
        # Process company info
        company_text = f"{data['company_info']['name']} - {data['company_info']['tagline']}. "
        company_text += f"Founded in {data['company_info']['founded']}. "
        company_text += f"Headquarters: {data['company_info']['headquarters']}. "
        company_text += f"Industry: {data['company_info']['industry']}. "
        company_text += f"Employees: {data['company_info']['employees']}."
        
        documents.append({
            'id': f'doc_{doc_id}',
            'text': company_text,
            'metadata': {
                'category': 'company_info',
                'source': 'company_overview'
            }
        })
        doc_id += 1
        
        # Process history
        for item in data['history']:
            text = f"Year {item['year']}: {item['title']}. {item['content']}"
            documents.append({
                'id': f'doc_{doc_id}',
                'text': text,
                'metadata': {
                    'category': 'history',
                    'year': item['year'],
                    'title': item['title']
                }
            })
            doc_id += 1
        
        # Process leadership
        for leader in data['leadership']:
            text = f"{leader['name']}, {leader['position']} at Company A. {leader['bio']} Contact: {leader['email']}"
            documents.append({
                'id': f'doc_{doc_id}',
                'text': text,
                'metadata': {
                    'category': 'leadership',
                    'name': leader['name'],
                    'position': leader['position'],
                    'email': leader['email']
                }
            })
            doc_id += 1
        
        # Process business units
        for bu in data['business_units']:
            text = f"{bu['name']}: {bu['description']} Revenue contribution: {bu['revenue_contribution']}. "
            text += f"Key products: {', '.join(bu['key_products'])}."
            documents.append({
                'id': f'doc_{doc_id}',
                'text': text,
                'metadata': {
                    'category': 'business_units',
                    'unit_name': bu['name']
                }
            })
            doc_id += 1
        
        # Process offices
        for office in data['offices']:
            text = f"{office['location']} - {office['type']}. Address: {office['address']}. "
            text += f"Phone: {office['phone']}, Email: {office['email']}. "
            text += f"Functions: {', '.join(office['functions'])}."
            documents.append({
                'id': f'doc_{doc_id}',
                'text': text,
                'metadata': {
                    'category': 'offices',
                    'location': office['location'],
                    'type': office['type']
                }
            })
            doc_id += 1
        
        # Process financials
        for year, financial_data in data['financials'].items():
            text = f"Fiscal Year {financial_data['year']} Financial Results for Company A: "
            text += f"Revenue: {financial_data['revenue']}, Net Income: {financial_data['net_income']}, "
            text += f"Operating Margin: {financial_data['operating_margin']}, "
            text += f"R&D Investment: {financial_data['rd_investment']}, "
            text += f"Employee Count: {financial_data['employee_count']}. "
            text += f"Highlights: {financial_data['highlights']}"
            documents.append({
                'id': f'doc_{doc_id}',
                'text': text,
                'metadata': {
                    'category': 'financials',
                    'year': financial_data['year']
                }
            })
            doc_id += 1
        
        # Process sustainability
        for item in data['sustainability']:
            text = f"{item['title']}: {item['content']}"
            documents.append({
                'id': f'doc_{doc_id}',
                'text': text,
                'metadata': {
                    'category': 'sustainability',
                    'title': item['title']
                }
            })
            doc_id += 1
        
        # Process careers
        for item in data['careers']:
            text = f"{item['title']}: {item['content']}"
            documents.append({
                'id': f'doc_{doc_id}',
                'text': text,
                'metadata': {
                    'category': 'careers',
                    'title': item['title']
                }
            })
            doc_id += 1
        
        # Process media
        for item in data['media']:
            text = f"{item['date']} - {item['type']}: {item['title']}. {item['content']}"
            documents.append({
                'id': f'doc_{doc_id}',
                'text': text,
                'metadata': {
                    'category': 'media',
                    'date': item['date'],
                    'type': item['type']
                }
            })
            doc_id += 1
        
        # Process contact
        contact = data['contact']
        text = f"Company A Contact Information: General inquiries: {contact['general_inquiries']}, "
        text += f"Investor relations: {contact['investor_relations']}, Media: {contact['media_inquiries']}, "
        text += f"Careers: {contact['careers']}, Customer support: {contact['customer_support']}. "
        text += f"Main phone: {contact['phone_main']}, Address: {contact['address']}"
        documents.append({
            'id': f'doc_{doc_id}',
            'text': text,
            'metadata': {
                'category': 'contact',
                'source': 'contact_info'
            }
        })
        
        return documents
    
    def embed_and_upload(self, documents: List[Dict], index):
        """Generate embeddings and upload to Pinecone"""
        print(f"Processing {len(documents)} documents...")
        
        vectors_to_upsert = []
        
        for doc in documents:
            # Generate embedding
            embedding = self.model.encode(doc['text']).tolist()
            
            # Prepare vector for Pinecone
            vector = {
                'id': doc['id'],
                'values': embedding,
                'metadata': {
                    **doc['metadata'],
                    'text': doc['text']
                }
            }
            vectors_to_upsert.append(vector)
            
            # Upload in batches of 100
            if len(vectors_to_upsert) >= 100:
                index.upsert(vectors=vectors_to_upsert)
                print(f"Uploaded {len(vectors_to_upsert)} vectors...")
                vectors_to_upsert = []
        
        # Upload remaining vectors
        if vectors_to_upsert:
            index.upsert(vectors=vectors_to_upsert)
            print(f"Uploaded final {len(vectors_to_upsert)} vectors")
        
        print("All documents uploaded successfully!")
        
        # Get index stats
        stats = index.describe_index_stats()
        print(f"Total vectors in index: {stats['total_vector_count']}")

def main():
    """Main execution function"""
    print("=" * 60)
    print("Company A - Data Processing & Pinecone Upload")
    print("=" * 60)
    
    # Initialize preprocessor
    preprocessor = DataPreprocessor()
    
    # Create/get Pinecone index
    index = preprocessor.create_pinecone_index()
    
    # Process company data
    print("\nProcessing company data...")
    documents = preprocessor.process_company_data('company_data.json')
    print(f"Created {len(documents)} document chunks")
    
    # Embed and upload to Pinecone
    print("\nGenerating embeddings and uploading to Pinecone...")
    preprocessor.embed_and_upload(documents, index)
    
    print("\n" + "=" * 60)
    print("Data preprocessing complete!")
    print("=" * 60)

if __name__ == "__main__":
    main()