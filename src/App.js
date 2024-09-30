// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'; // Import your Tailwind CSS file
import Home from './pages/Home';
import NewsPage from './pages/NewsPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Events from './pages/Events';
import LoginSignup from './pages/LoginSignup';
import Tools from './pages/Tools';



function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* Route for Home page */}
        <Route path="/" element={<Home />} />
        <Route path="/newspage" element={<NewsPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/tools" element={<Tools />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
