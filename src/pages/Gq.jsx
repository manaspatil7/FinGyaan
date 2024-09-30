// src/pages/Gq.jsx
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom'; 
import { db } from '../firebase/firebase'; // Make sure to import your firebase configuration
import { doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import { FaMoneyBill, FaChartLine, FaWallet, FaQuoteLeft, FaCheckCircle } from 'react-icons/fa';

const Gq = () => {
  const navigate = useNavigate(); 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState({
    interest: [],
    staticIncome: '',
    currentInvestment: '',
    retirementGoal: '',
  });
  const [userId, setUserId] = useState(null); // State to store the user ID

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser; // Get the currently logged-in user
    if (user) {
      setUserId(user.uid); // Set user ID
    } else {
      alert('User not found. Please log in again.');
      navigate('/login'); // Redirect to login if user is not found
    }
  }, [navigate]);

  const questions = [
    {
      question: "What are your interests?",
      type: "interests",
      options: [
        "Investment & Portfolio Management",
        "Personal Finance",
        "Corporate Finance",
        "Accounting & Financial Reporting",
        "Banking & Financial Institutions",
        "Taxation",
        "Financial Markets & Instruments",
        "Financial Risk Management",
        "Wealth Management",
        "Retirement Planning",
        "Entrepreneurship & Small Business Finance",
        "Real Estate Finance",
        "Fintech & Innovation",
      ],
      key: "interest",
      quote: "Invest in yourself. Your career is the engine of your wealth.",
      icon: <FaChartLine className="mx-auto text-4xl text-green-500" />,
    },
    {
      question: "What is your income?",
      type: "input",
      key: "staticIncome",
      quote: "Budgeting isn't about limiting yourself—it's about making the things that excite you possible.",
      icon: <FaMoneyBill className="mx-auto text-4xl text-green-500" />,
    },
    {
      question: "Do you have any current investments?",
      type: "investmentCheck",
      key: "currentInvestment",
      quote: "Don't watch the market closely; invest for the long-term.",
      icon: <FaWallet className="mx-auto text-4xl text-green-500" />,
    },
    {
      question: "What amount do you have as a goal for retirement?",
      type: "input",
      key: "retirementGoal",
      quote: "The goal isn’t more money. The goal is living life on your terms.",
      icon: <FaQuoteLeft className="mx-auto text-4xl text-green-500" />,
    },
  ];

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [questions[currentQuestion].key]: value,
    }));
  };

  const handleInterestSelect = (interest) => {
    setFormData((prevData) => {
      const selectedInterests = prevData.interest.includes(interest)
        ? prevData.interest.filter((i) => i !== interest)
        : [...prevData.interest, interest];
      return {
        ...prevData,
        interest: selectedInterests.length > 3 ? selectedInterests.slice(0, 3) : selectedInterests,
      };
    });
  };

  const handleNext = async () => {
    if (currentQuestion === 0 && formData.interest.length === 0) {
      alert('Please select at least one interest.');
      return;
    }
    if (currentQuestion !== 0 && !formData[questions[currentQuestion].key]) {
      alert('Please provide a valid input.');
      return;
    }

    if (currentQuestion === 2) {
      // Handle current investments question
      if (formData.currentInvestment === '') {
        alert('Please select an option for current investments.');
        return;
      }
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Save data to Firestore
      if (userId) { // Check if userId is available
        await setDoc(doc(db, "users", userId), {
          interests: formData.interest,
          income: formData.staticIncome,
          currentInvestment: formData.currentInvestment,
          retirementGoal: formData.retirementGoal,
        }, { merge: true });
      } else {
        alert('User not found. Please log in again.');
        return;
      }
      navigate('/'); // Redirect to home page after submission
    }
  };

  // Animation properties
  const fadeProps = useSpring({
    opacity: 1,
    transform: `translateY(0px)`,
    from: { opacity: 0, transform: `translateY(20px)` },
    config: { duration: 300 },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <animated.div
        style={fadeProps}
        className="bg-white rounded-2xl shadow-lg p-8 w-11/12 max-w-xl transition-transform transform hover:scale-105"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Investment Questionnaire</h2>
        
        <div className="flex justify-center mb-4">
          {questions[currentQuestion].icon}
        </div>

        <p className="text-center italic mb-4">{questions[currentQuestion].quote}</p>
        
        <div className="mb-4">
          {questions[currentQuestion].type === "interests" ? (
            <div className="grid grid-cols-2 gap-4">
              {questions[currentQuestion].options.map((interest) => (
                <div
                  key={interest}
                  onClick={() => handleInterestSelect(interest)}
                  className={`cursor-pointer rounded-lg border-2 p-4 text-center transition duration-200 ease-in-out 
                    ${formData.interest.includes(interest) ? 'bg-green-500 text-white border-green-700' : 'bg-white text-green-700 border-gray-300'}
                    hover:bg-green-100`}
                >
                  {interest}
                  {formData.interest.includes(interest) && <span className="ml-2 text-white"><FaCheckCircle /></span>}
                </div>
              ))}
            </div>
          ) : questions[currentQuestion].type === "investmentCheck" ? (
            <div>
              <p className="text-center mb-4">Have you done any investments?</p>
              <div className="flex justify-center space-x-4 mb-4"> {/* Adjusted to use space-x-4 for spacing */}
                <button
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, currentInvestment: 'No' })); // Set investment to 'No'
                    setCurrentQuestion(currentQuestion + 1);
                  }}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out"
                >
                  No
                </button>
                <button
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, currentInvestment: 'Yes' })); // Set investment to 'Yes'
                    setCurrentQuestion(currentQuestion + 1);
                  }}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out"
                >
                  Yes
                </button>
              </div>
              {formData.currentInvestment === 'Yes' && (
                <input
                  type="text"
                  placeholder="How much?"
                  value={formData.currentInvestment === 'Yes' ? formData.currentInvestment : ''}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded py-2 px-3 mb-3 transition duration-200 ease-in-out focus:outline-none focus:ring focus:ring-green-300"
                  required
                />
              )}
            </div>
          ) : (
            <div>
              <input
                type="text"
                placeholder={`Enter ${questions[currentQuestion].question.toLowerCase()}`}
                value={formData[questions[currentQuestion].key]}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 rounded py-2 px-3 mb-3 transition duration-200 ease-in-out focus:outline-none focus:ring focus:ring-green-300"
                required
              />
            </div>
          )}
        </div>
        
        {currentQuestion === questions.length - 1 && (
          <p className="text-sm text-center mb-4">
            By clicking "Submit", you agree to our Terms and Conditions.
          </p>
        )}
        
        <button
          onClick={handleNext}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out w-full"
        >
          {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </animated.div>
    </div>
  );
};

export default Gq;
