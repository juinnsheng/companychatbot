import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import BusinessUnits from './pages/BusinessUnits';
import Sustainability from './pages/Sustainability';
import Media from './pages/Media';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'business-units':
        return <BusinessUnits />;
      case 'sustainability':
        return <Sustainability />;
      case 'media':
        return <Media />;
      case 'careers':
        return <Careers />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>{renderPage()}</main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;