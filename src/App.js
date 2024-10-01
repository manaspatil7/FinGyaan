// App.js
import { React, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'; // Import your Tailwind CSS file
import Home from './pages/Home';
import NewsPage from './pages/NewsPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Events from './pages/Events';
import LoginSignup from './pages/LoginSignup';
import Tools from './pages/Tools';
import FdCalculator from './pages/FdCalculator';
import SIPCalculator from './pages/SIPCalculator'
import MfCalculator from './pages/MfCalculator';
import Profile from './pages/Profile';
import RetirementCalculator from './pages/RetirementCalculator'
import LoanCalculator from './pages/LoanCalculator';
import TaxCalculator from './TaxCalculator';
import ContactUsForm from './pages/ContactUsForm'
import Courses from './pages/Courses';
import Gq from './pages/Gq';
import ViewCourse from './pages/ViewCourse';
import Portfolio from './pages/Portfolio';
import CertificateGenerator from './pages/CertificateGenerator';
import Games from './pages/Games';

function App() {

  const [language, setLanguage] = useState('en'); // Default to English

  const handleLanguageChange = (newLanguage) => {
      setLanguage(newLanguage);
  };

  return (
    <Router>
      <Navbar onLanguageChange={handleLanguageChange}/>
      <Routes>
        {/* Route for Home page */}
        <Route path="/" element={<Home language={language} />} />
        <Route path="/newspage" element={<NewsPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/fdcalculator" element={<FdCalculator />} />
        <Route path="/sip-calculator" element={<SIPCalculator />} />
        <Route path="/mfcalculator" element={<MfCalculator />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/retirement-calculator" element={<RetirementCalculator />} />
        <Route path="/loan-calculator" element={<LoanCalculator />} />
        <Route path="/tax-calculator" element={<TaxCalculator />} />
        <Route path="/contact" element={<ContactUsForm />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/gq" element={<Gq />} />
        <Route path="/view-course" element={<ViewCourse />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/certificate" element={<CertificateGenerator />} />
        <Route path="/games" element={<Games />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
