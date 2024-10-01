import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase'; // Import your firebase setup
import { onAuthStateChanged } from 'firebase/auth';
import { FaUserCircle } from 'react-icons/fa'; // Default profile icon for non-Google sign-ins
import logo from '../assets/logo.jpg';

const translations = {
  English: {
    home: "Home",
    courses: "Courses",
    portfolio: "Portfolio",
    tools: "Tools",
    news: "News",
    events: "Events",
    contact: "Contact Us",
    login: "Login / Sign In",
    profile: "Profile",
    gamification: "Games",
  },
  Hindi: {
    home: "घर",
    courses: "कोर्स",
    portfolio: "पोर्टफोलियो",
    tools: "उपकरण",
    news: "समाचार",
    events: "कार्यक्रम",
    contact: "संपर्क करें",
    login: "लॉगिन / साइन इन",
    profile: "प्रोफ़ाइल",
    gamification: "खेल",
  }
};

const Navbar = ({ onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); // State to store user info
  const [selectedLanguage, setSelectedLanguage] = useState('English'); // Language state
  const navigate = useNavigate(); // For navigation

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    onLanguageChange(newLanguage === 'English' ? 'en' : 'hi'); // Passing language code
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup the listener
    return () => unsubscribe();
  }, []);

  // Handle profile icon click - redirect to profile page
  const handleProfileClick = () => {
    navigate('/profile');
  };

  // Handle link click to close mobile menu
  const handleLinkClick = () => {
    setIsOpen(false); // Close the menu
  };

  // Check if the user signed in through Google
  const isGoogleSignIn = user?.providerData.some((provider) => provider.providerId === 'google.com');

  // Determine the profile photo to display
  const profilePhoto = isGoogleSignIn ? user.photoURL : user?.photoURL || '/default-profile.png';

  // Get translations based on selected language
  const t = translations[selectedLanguage];

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-white ml-2 text-2xl font-semibold">Fin</span>
              <span className="text-green-400 text-2xl font-semibold">Gyaan</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center space-x-4">
            <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-semibold">
              {t.home}
            </Link>
            <Link to="/courses" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-semibold">
              {t.courses}
            </Link>
            <Link to="/portfolio" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-semibold">
              {t.portfolio}
            </Link>
            <Link to="/tools" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-semibold">
              {t.tools}
            </Link>
            <Link to="/newspage" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-semibold">
              {t.news}
            </Link>
            <Link to="/events" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-semibold">
              {t.events}
            </Link>
            <Link to="/games" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-semibold">
              {t.gamification}
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-semibold">
              {t.contact}
            </Link>

            {/* Language Dropdown */}
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="text-gray-300 bg-gray-800 border border-gray-600 rounded-md px-2 py-1"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>

          {/* Profile Icon or Login Button for Desktop */}
          <div className="hidden md:flex items-center">
            {user ? (
              <Link to="/profile" className="flex items-center space-x-2" onClick={handleProfileClick}>
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-semibold"
              >
                {t.login}
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={handleLinkClick} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-semibold">
              {t.home}
            </Link>
            <Link to="/courses" onClick={handleLinkClick} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-semibold">
              {t.courses}
            </Link>
            <Link to="/portfolio" onClick={handleLinkClick} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-semibold">
              {t.portfolio}
            </Link>
            <Link to="/tools" onClick={handleLinkClick} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-semibold">
              {t.tools}
            </Link>
            <Link to="/newspage" onClick={handleLinkClick} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-semibold">
              {t.news}
            </Link>
            <Link to="/events" onClick={handleLinkClick} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-semibold">
              {t.events}
            </Link>
            <Link to="/games" onClick={handleLinkClick} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-semibold">
              {t.gamification}
            </Link>
            <Link to="/contact" onClick={handleLinkClick} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-semibold">
              {t.contact}
            </Link>

            {/* Mobile Language Dropdown */}
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="block w-full text-gray-300 bg-gray-800 border border-gray-600 rounded-md px-2 py-1 mt-2"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>

            {/* Mobile Profile Icon or Login Button */}
            {user ? (
              <div className="flex items-center mt-4">
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={handleProfileClick}
                />
              </div>
            ) : (
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="block w-full text-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-base font-semibold mt-4"
              >
                {t.login}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;









// import React, { useState } from 'react';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="bg-gray-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo Section */}
//           <div className="flex-shrink-0 flex items-center">
//             <img
//               className="h-8 w-8"
//               src="https://via.placeholder.com/50" // Replace with your logo
//               alt="Logo"
//             />
//             <span className="text-white ml-2 text-xl font-semibold">BrandName</span>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex md:items-center space-x-4">
//             <a href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-semibold">
//               Home
//             </a>
//             <a href="courses" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-semibold">
//               Courses
//             </a>
//             <a href="portfolio" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-semibold">
//               Portfolio
//             </a>
//             <a href="tools" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-semibold">
//               Tools
//             </a>
//             <a href="newspage" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-semibold">
//               News
//             </a>
//             <a href="events" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-semibold">
//               Events
//             </a>
//             <a href="contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-semibold">
//               Contact Us
//             </a>
//           </div>

//           {/* Login Button */}
//           <div className="hidden md:flex items-center">
//             <a
//               href="login"
//               className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-semibold"
//             >
//               Login / Sign In
//             </a>
//           </div>

//           {/* Mobile Hamburger Icon */}
//           <div className="flex md:hidden">
//             <button
//               onClick={toggleMenu}
//               className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
//             >
//               <svg
//                 className="h-6 w-6"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-gray-700">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <a
//               href="#home"
//               className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-semibold"
//             >
//               Home
//             </a>
//             <a
//               href="#courses"
//               className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-semibold"
//             >
//               Courses
//             </a>
//             <a
//               href="#portfolio"
//               className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-semibold"
//             >
//               Portfolio
//             </a>
//             <a
//               href="#news"
//               className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-semibold"
//             >
//               News
//             </a>
//             <a
//               href="events"
//               className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-semibold"
//             >
//               Events
//             </a>
//             <a
//               href="#contact"
//               className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-semibold"
//             >
//               Contact Us
//             </a>
//             <a
//               href="login"
//               className="block text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-base font-semibold"
//             >
//               Login / Sign In
//             </a>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
