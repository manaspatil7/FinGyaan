import React, { useState, useEffect } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const PortfolioPage = () => {
  const [userData, setUserData] = useState(null);
  const [income, setIncome] = useState('');
  const [investment, setInvestment] = useState('');
  const [savings, setSavings] = useState('');
  const [expenditure, setExpenditure] = useState('');
  const [pieData, setPieData] = useState({
    labels: ['Income', 'Investment', 'Savings', 'Expenditure'],
    datasets: [{
      data: [0, 0, 0, 0],
      backgroundColor: ['#4caf50', '#81c784', '#a5d6a7', '#c8e6c9'],
    }],
  });
  const [barData, setBarData] = useState({
    labels: ['Income', 'Investment', 'Savings', 'Expenditure'],
    datasets: [{
      label: 'Financial Overview',
      data: [0, 0, 0, 0],
      backgroundColor: ['#4caf50', '#81c784', '#a5d6a7', '#c8e6c9'],
    }],
  });
  const [lineData, setLineData] = useState({
    labels: ['Goal 1', 'Goal 2', 'Goal 3', 'Goal 4'],
    datasets: [{
      label: 'Goal Progress',
      data: [30, 50, 70, 100],
      fill: false,
      borderColor: '#4caf50',
    }],
  });

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      };
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (userData) {
      setPieData({
        labels: ['Income', 'Investment', 'Savings', 'Expenditure'],
        datasets: [{
          data: [
            parseInt(userData.income) || 0,
            parseInt(userData.investmentAmount) || 0,
            parseInt(userData.savings) || 0,
            parseInt(userData.expenditure) || 0,
          ],
          backgroundColor: ['#4caf50', '#81c784', '#a5d6a7', '#c8e6c9'],
        }],
      });
      
      setBarData({
        labels: ['Income', 'Investment', 'Savings', 'Expenditure'],
        datasets: [{
          label: 'Financial Overview',
          data: [
            parseInt(userData.income) || 0,
            parseInt(userData.investmentAmount) || 0,
            parseInt(userData.savings) || 0,
            parseInt(userData.expenditure) || 0,
          ],
          backgroundColor: ['#4caf50', '#81c784', '#a5d6a7', '#c8e6c9'],
        }],
      });
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      income,
      investmentAmount: investment,
      savings,
      expenditure,
    };

    if (user) {
      await setDoc(doc(db, 'users', user.uid), userData, { merge: true });
    }
  };

  return (
    <div className="portfolio-page p-6 bg-white text-gray-900">
      <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">My Financial Portfolio</h2>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <input
          type="number"
          placeholder="Income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Investment"
          value={investment}
          onChange={(e) => setInvestment(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Savings"
          value={savings}
          onChange={(e) => setSavings(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Expenditure"
          value={expenditure}
          onChange={(e) => setExpenditure(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <button type="submit" className="col-span-1 md:col-span-2 lg:col-span-4 bg-green-600 text-white p-2 rounded mt-4">Submit</button>
      </form>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-bold text-green-600 text-center mb-4">Financial Overview (Pie Chart)</h3>
          <Pie data={pieData} options={{ responsive: true }} />
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-bold text-green-600 text-center mb-4">Financial Overview (Bar Chart)</h3>
          <Bar data={barData} options={{ responsive: true }} />
        </div>

        {/* Line Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-green-600 text-center mb-4">Goal Progress</h3>
          <Line data={lineData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Motivational Quotes */}
      <div className="mt-8 p-4 bg-gray-50 text-center rounded-lg">
        <h3 className="text-xl font-bold">"The goal isn't more money. The goal is financial freedom." - Anonymous</h3>
        <h3 className="text-xl font-bold mt-4">"Do not save what is left after spending, but spend what is left after saving." - Warren Buffet</h3>
        <h3 className="text-xl font-bold mt-4">"A budget is telling your money where to go instead of wondering where it went." - Dave Ramsey</h3>
      </div>
    </div>
  );
};

export default PortfolioPage;
