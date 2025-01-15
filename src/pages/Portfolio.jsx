// import React, { useState, useEffect } from 'react';
// import { Pie, Bar, Doughnut, Line } from 'react-chartjs-2';
// import { getAuth } from 'firebase/auth';
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { db } from '../firebase/firebase';
// import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, ArcElement } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

// const PortfolioPage = () => {
//   const [userData, setUserData] = useState(null);
//   const [income, setIncome] = useState('');
//   const [investmentAmount, setInvestmentAmount] = useState('');
//   const [savings, setSavings] = useState('');
//   const [expenditure, setExpenditure] = useState('');
//   const [gold, setGold] = useState('');
//   const [stocks, setStocks] = useState('');
//   const [realEstate, setRealEstate] = useState('');
//   const [mf, setMF] = useState('');
//   const [sip, setSIP] = useState('');

//   const auth = getAuth();
//   const user = auth.currentUser;

//   const fetchData = async () => {
//     if (user) {
//       const docRef = doc(db, 'users', user.uid);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setUserData(docSnap.data());
//       }
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [user]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const userData = {
//       income,
//       investmentAmount,
//       savings,
//       expenditure,
//       investment: {
//         gold,
//         stocks,
//         realEstate,
//         mf,
//         sip,
//       },
//     };

//     if (user) {
//       await setDoc(doc(db, 'users', user.uid), userData, { merge: true });
//       fetchData();  // Fetch data again to update the charts
//     }
//   };

//   const pieData = {
//     labels: ['Income', 'Savings', 'Expenditure'],
//     datasets: [{
//       data: [
//         parseInt(userData?.income) || 0,
//         parseInt(userData?.savings) || 0,
//         parseInt(userData?.expenditure) || 0,
//       ],
//       backgroundColor: ['#42a5f5', '#66bb6a', '#ff7043'],
//       borderColor: '#fff',
//       borderWidth: 2,
//     }],
//   };

//   const barData = {
//     labels: ['Gold', 'Stocks', 'Real Estate', 'Mutual Funds', 'SIP'],
//     datasets: [{
//       label: 'Investment Overview',
//       data: [
//         parseInt(userData?.investment?.gold) || 0,
//         parseInt(userData?.investment?.stocks) || 0,
//         parseInt(userData?.investment?.realEstate) || 0,
//         parseInt(userData?.investment?.mf) || 0,
//         parseInt(userData?.investment?.sip) || 0,
//       ],
//       backgroundColor: ['#42a5f5', '#66bb6a', '#ff7043', '#ab47bc', '#ffca28'],
//       borderColor: '#fff',
//       borderWidth: 2,
//     }],
//   };

//   const returnData = {
//     labels: ['Gold', 'Stocks', 'Real Estate', 'Mutual Funds', 'SIP'],
//     datasets: [{
//       label: 'Annual Returns (%)',
//       data: [
//         (parseInt(userData?.investment?.gold) || 0) * 0.03,
//         (parseInt(userData?.investment?.stocks) || 0) * 0.07,
//         (parseInt(userData?.investment?.realEstate) || 0) * 0.05,
//         (parseInt(userData?.investment?.mf) || 0) * 0.06,
//         (parseInt(userData?.investment?.sip) || 0) * 0.04,
//       ],
//       backgroundColor: ['#42a5f5', '#66bb6a', '#ff7043', '#ab47bc', '#ffca28'],
//       borderColor: '#fff',
//       borderWidth: 2,
//     }],
//   };

//   // Generate recommendation based on the retirement goal
//   const recommendInvestmentStrategy = () => {
//     const currentInvestments = [
//       parseInt(userData?.investment?.gold) || 0,
//       parseInt(userData?.investment?.stocks) || 0,
//       parseInt(userData?.investment?.realEstate) || 0,
//       parseInt(userData?.investment?.mf) || 0,
//       parseInt(userData?.investment?.sip) || 0,
//     ];

//     const totalInvestments = currentInvestments.reduce((a, b) => a + b, 0);
//     const retirementTarget = parseInt(userData?.retirementGoal) || 1000000; // Assuming a default retirement goal

//     if (totalInvestments < retirementTarget * 0.5) {
//       return 'You should increase your investment in long-term growth assets like SIP and Mutual Funds.';
//     } else if (totalInvestments < retirementTarget) {
//       return 'You are on track, but consider diversifying with stocks and real estate for better returns.';
//     } else {
//       return 'Congratulations! You are on track to meet your retirement goal. Consider maintaining a balanced portfolio.';
//     }
//   };

//    // Line chart for long-term vs short-term investments
//    const investmentComparisonData = {
//     labels: ['Year 1', 'Year 5', 'Year 10', 'Year 20', 'Year 30'],
//     datasets: [
//       {
//         label: 'Short-Term Investments',
//         data: [
//           (parseInt(userData?.investment?.gold) || 0) * 0.03,
//           (parseInt(userData?.investment?.stocks) || 0) * 0.07,
//           (parseInt(userData?.investment?.mf) || 0) * 0.06,
//         ],
//         borderColor: '#ff7043',
//         fill: false,
//       },
//       {
//         label: 'Long-Term Investments',
//         data: [
//           (parseInt(userData?.investment?.sip) || 0) * 0.04,
//           (parseInt(userData?.investment?.realEstate) || 0) * 0.05,
//         ],
//         borderColor: '#42a5f5',
//         fill: false,
//       }
//     ]
//   };

//   return (
//     <div className="portfolio-page p-6 bg-white text-gray-900">
//       <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">My Financial Portfolio</h2>

//       {/* Input Form */}
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//   <input
//     type="number"
//     placeholder="Income"
//     value={income}
//     onChange={(e) => setIncome(e.target.value)}
//     className="p-2 border rounded w-full"
//   />
//   <input
//     type="number"
//     placeholder="Savings"
//     value={savings}
//     onChange={(e) => setSavings(e.target.value)}
//     className="p-2 border rounded w-full"
//   />
//   <input
//     type="number"
//     placeholder="Expenditure"
//     value={expenditure}
//     onChange={(e) => setExpenditure(e.target.value)}
//     className="p-2 border rounded w-full"
//   />
//   <input
//     type="number"
//     placeholder="Gold Investment"
//     value={gold}
//     onChange={(e) => setGold(e.target.value)}
//     className="p-2 border rounded w-full"
//   />
//   <input
//     type="number"
//     placeholder="Stocks Investment"
//     value={stocks}
//     onChange={(e) => setStocks(e.target.value)}
//     className="p-2 border rounded w-full"
//   />
//   <input
//     type="number"
//     placeholder="Real Estate Investment"
//     value={realEstate}
//     onChange={(e) => setRealEstate(e.target.value)}
//     className="p-2 border rounded w-full"
//   />
//   <input
//     type="number"
//     placeholder="Mutual Funds Investment"
//     value={mf}
//     onChange={(e) => setMF(e.target.value)}
//     className="p-2 border rounded w-full"
//   />
//   <input
//     type="number"
//     placeholder="SIP Investment"
//     value={sip}
//     onChange={(e) => setSIP(e.target.value)}
//     className="p-2 border rounded w-full"
//   />
  
//   {/* Submit button centered in desktop view */}
//   <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center">
//     <button type="submit" className="bg-blue-500 text-white p-3 px-6 rounded hover:scale-105">Submit</button>
//   </div>
// </form>


//       {/* Charts Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Pie Chart */}
//         <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col h-[400px]">
//           <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">Income, Savings, and Expenditure</h3>
//           <div className="flex-grow">
//             <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
//           </div>
//         </div>

//         {/* Bar Chart */}
//         <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col h-[400px]">
//           <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">Investment Overview</h3>
//           <div className="flex-grow">
//             <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
//           </div>
//         </div>

//         {/* Annual Returns Chart */}
//         <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col h-[400px]">
//           <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">Annual Returns on Investments</h3>
//           <div className="flex-grow">
//             <Doughnut data={returnData} options={{ responsive: true, maintainAspectRatio: false }} />
//           </div>
//         </div>

//       </div>



//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-3">
//   {/* Investment Comparison */}
//   <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col h-[400px]">
//     <h3 className="text-lg font-semibold mb-2">Investment Comparison (Returns vs Risks)</h3>
//     <div className='flex-grow'>
//     <Bar
//       data={{
//         labels: ['Long-Term', 'Short-Term'], // Comparison between long-term and short-term investments
//         datasets: [
//           {
//             label: 'Returns (%)',
//             data: [120, 12], // Hypothetical returns for long-term and short-term
//             backgroundColor: '#42a5f5', // Long-term returns
//           },
//           {
//             label: 'Risks (%)',
//             data: [40, 15], // Hypothetical risks (volatility)
//             backgroundColor: '#ff7043', // Long-term risks
//           },
//         ],
//       }}
//       options={{
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//           legend: {
//             position: 'top',
//           },
//           tooltip: {
//             callbacks: {
//               label: function (tooltipItem) {
//                 return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`;
//               },
//             },
//           },
//         },
//         scales: {
//           y: {
//             beginAtZero: true,
//             title: {
//               display: true,
//               text: 'Percentage (%)',
//             },
//           },
//         },
//       }}
//     />
//     </div>
//   </div>

//   {/* Recommendations */}
//   <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl flex flex-col justify-between h-auto sm:h-[400px]">
//   <div className="recommendation bg-green-100 border-l-4 border-green-500 text-green-700 p-4 h-full flex flex-col justify-center">
//     <h3 className="text-md sm:text-lg font-bold mb-2">Investment Recommendation</h3>
//     <p>
//       Based on your investment horizon and risk appetite, here are our recommendations:
//       <p className="font-bold">{recommendInvestmentStrategy()}</p>
//       <ul className="list-disc ml-4 mt-2">
//         <li>
//           <strong>Long-Term Investments:</strong> Ideal for building wealth over time. Focus on diversified portfolios, such as mutual funds or stocks, which offer higher returns but come with greater risks.
//         </li>
//         <li>
//           <strong>Short-Term Investments:</strong> Suitable for immediate goals. Consider bonds, fixed deposits, or money market funds for lower returns but with reduced risk.
//         </li>
//       </ul>
//     </p>
//   </div>
// </div>



// </div>


//     </div>
//   );
// };

// export default PortfolioPage;













// // import React, { useState, useEffect } from 'react';
// // import { Pie, Bar, Line, Doughnut } from 'react-chartjs-2';
// // import { getAuth } from 'firebase/auth';
// // import { doc, getDoc, setDoc } from 'firebase/firestore';
// // import { db } from '../firebase/firebase';
// // import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement, Title, ArcElement } from 'chart.js';

// // // Register Chart.js components
// // ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement, Title);

// // const PortfolioPage = () => {
// //   const [userData, setUserData] = useState(null);
// //   const [income, setIncome] = useState('');
// //   const [investmentAmount, setInvestmentAmount] = useState('');
// //   const [savings, setSavings] = useState('');
// //   const [expenditure, setExpenditure] = useState('');
// //   const [gold, setGold] = useState('');
// //   const [stocks, setStocks] = useState('');
// //   const [realEstate, setRealEstate] = useState('');
// //   const [mf, setMF] = useState('');
// //   const [sip, setSIP] = useState('');

// //   const auth = getAuth();
// //   const user = auth.currentUser;

// //   const fetchData = async () => {
// //     if (user) {
// //       const docRef = doc(db, 'users', user.uid);
// //       const docSnap = await getDoc(docRef);
// //       if (docSnap.exists()) {
// //         setUserData(docSnap.data());
// //       }
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, [user]);

// //   const calculateAnnualReturns = (investment, category) => {
// //     const returnRates = {
// //       gold: 0.03,
// //       stocks: 0.07,
// //       realEstate: 0.05,
// //       mf: 0.06,
// //       sip: 0.04,
// //     };
    
// //     return (investment * (returnRates[category] || 0)).toFixed(2);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const userData = {
// //       income,
// //       investmentAmount,
// //       savings,
// //       expenditure,
// //       investment: {
// //         gold,
// //         stocks,
// //         realEstate,
// //         mf,
// //         sip,
// //       },
// //     };

// //     if (user) {
// //       await setDoc(doc(db, 'users', user.uid), userData, { merge: true });
// //       fetchData();  // Fetch data again to update the charts
// //     }
// //   };

// //   const pieData = {
// //     labels: ['Income', 'Savings', 'Expenditure'],
// //     datasets: [{
// //       data: [
// //         parseInt(userData?.income) || 0,
// //         parseInt(userData?.savings) || 0,
// //         parseInt(userData?.expenditure) || 0,
// //       ],
// //       backgroundColor: ['#42a5f5', '#66bb6a', '#ff7043'],
// //       borderColor: '#fff',
// //       borderWidth: 2,
// //     }],
// //   };

// //   const barData = {
// //     labels: ['Gold', 'Stocks', 'Real Estate', 'Mutual Funds', 'SIP'],
// //     datasets: [{
// //       label: 'Investment Overview',
// //       data: [
// //         parseInt(userData?.investment?.gold) || 0,
// //         parseInt(userData?.investment?.stocks) || 0,
// //         parseInt(userData?.investment?.realEstate) || 0,
// //         parseInt(userData?.investment?.mf) || 0,
// //         parseInt(userData?.investment?.sip) || 0,
// //       ],
// //       backgroundColor: ['#42a5f5', '#66bb6a', '#ff7043', '#ab47bc', '#ffca28'],
// //       borderColor: '#fff',
// //       borderWidth: 2,
// //     }],
// //   };

// //   const goalProgressData = {
// //     labels: ['Current Savings', 'Retirement Goal'],
// //     datasets: [{
// //       label: 'Savings Progress',
// //       data: [
// //         parseInt(userData?.savings) || 0,
// //         parseInt(userData?.retirementGoal) || 0,
// //       ],
// //       backgroundColor: ['#66bb6a', '#ff7043'],
// //       borderColor: '#fff',
// //       borderWidth: 2,
// //     }],
// //   };

// //   const returnData = {
// //     labels: ['Gold', 'Stocks', 'Real Estate', 'Mutual Funds', 'SIP'],
// //     datasets: [{
// //       label: 'Annual Returns (%)',
// //       data: [
// //         calculateAnnualReturns(parseInt(userData?.investment?.gold) || 0, 'gold'),
// //         calculateAnnualReturns(parseInt(userData?.investment?.stocks) || 0, 'stocks'),
// //         calculateAnnualReturns(parseInt(userData?.investment?.realEstate) || 0, 'realEstate'),
// //         calculateAnnualReturns(parseInt(userData?.investment?.mf) || 0, 'mf'),
// //         calculateAnnualReturns(parseInt(userData?.investment?.sip) || 0, 'sip'),
// //       ],
// //       backgroundColor: ['#42a5f5', '#66bb6a', '#ff7043', '#ab47bc', '#ffca28'],
// //       borderColor: '#fff',
// //       borderWidth: 2,
// //     }],
// //   };

// //   return (
// //     <div className="portfolio-page p-6 bg-white text-gray-900">
// //       <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">My Financial Portfolio</h2>

// //       {/* Input Form */}
// //       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// //         <input
// //           type="number"
// //           placeholder="Income"
// //           value={income}
// //           onChange={(e) => setIncome(e.target.value)}
// //           className="p-2 border rounded w-full"
// //         />
// //         <input
// //           type="number"
// //           placeholder="Savings"
// //           value={savings}
// //           onChange={(e) => setSavings(e.target.value)}
// //           className="p-2 border rounded w-full"
// //         />
// //         <input
// //           type="number"
// //           placeholder="Expenditure"
// //           value={expenditure}
// //           onChange={(e) => setExpenditure(e.target.value)}
// //           className="p-2 border rounded w-full"
// //         />
// //         <input
// //           type="number"
// //           placeholder="Gold Investment"
// //           value={gold}
// //           onChange={(e) => setGold(e.target.value)}
// //           className="p-2 border rounded w-full"
// //         />
// //         <input
// //           type="number"
// //           placeholder="Stocks Investment"
// //           value={stocks}
// //           onChange={(e) => setStocks(e.target.value)}
// //           className="p-2 border rounded w-full"
// //         />
// //         <input
// //           type="number"
// //           placeholder="Real Estate Investment"
// //           value={realEstate}
// //           onChange={(e) => setRealEstate(e.target.value)}
// //           className="p-2 border rounded w-full"
// //         />
// //         <input
// //           type="number"
// //           placeholder="Mutual Funds Investment"
// //           value={mf}
// //           onChange={(e) => setMF(e.target.value)}
// //           className="p-2 border rounded w-full"
// //         />
// //         <input
// //           type="number"
// //           placeholder="SIP Investment"
// //           value={sip}
// //           onChange={(e) => setSIP(e.target.value)}
// //           className="p-2 border rounded w-full"
// //         />
// //         <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
// //       </form>

// //       {/* Charts Section */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         {/* Pie Chart */}
// //         <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col">
// //           <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">Income, Savings, and Expenditure</h3>
// //           <div className="flex-grow">
// //             <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
// //           </div>
// //         </div>

// //         {/* Bar Chart */}
// //         <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col">
// //           <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">Investment Overview</h3>
// //           <div className="flex-grow">
// //             <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
// //           </div>
// //         </div>

        

// //         {/* Annual Returns Chart */}
// //         <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col">
// //         <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">Annual Returns on Investments</h3>
// //         <div className="flex-grow">
// //           <Doughnut data={returnData} options={{ responsive: true, maintainAspectRatio: false }} />
// //         </div>
// //       </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default PortfolioPage;

import React, { useState, useEffect, useCallback } from 'react';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const PortfolioPage = () => {
  const [userData, setUserData] = useState(null);
  const [income, setIncome] = useState('');
  const [savings, setSavings] = useState('');
  const [expenditure, setExpenditure] = useState('');
  const [gold, setGold] = useState('');
  const [stocks, setStocks] = useState('');
  const [realEstate, setRealEstate] = useState('');
  const [mf, setMF] = useState('');
  const [sip, setSIP] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  // Use useCallback to memoize fetchData so it doesn't get recreated on every render
  const fetchData = useCallback(async () => {
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    }
  }, [user]); // Dependency array includes `user`, as it's needed to fetch data

  useEffect(() => {
    fetchData(); // Now fetchData is stable and correctly referenced
  }, [fetchData]); // Correctly include fetchData as a dependency

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      income,
      investmentAmount: '', // Removed setInvestmentAmount, as it was unused
      savings,
      expenditure,
      investment: {
        gold,
        stocks,
        realEstate,
        mf,
        sip,
      },
    };

    if (user) {
      await setDoc(doc(db, 'users', user.uid), userData, { merge: true });
      fetchData();  // Fetch data again to update the charts
    }
  };

  const pieData = {
    labels: ['Income', 'Savings', 'Expenditure'],
    datasets: [{
      data: [
        parseInt(userData?.income) || 0,
        parseInt(userData?.savings) || 0,
        parseInt(userData?.expenditure) || 0,
      ],
      backgroundColor: ['#42a5f5', '#66bb6a', '#ff7043'],
      borderColor: '#fff',
      borderWidth: 2,
    }],
  };

  const barData = {
    labels: ['Gold', 'Stocks', 'Real Estate', 'Mutual Funds', 'SIP'],
    datasets: [{
      label: 'Investment Overview',
      data: [
        parseInt(userData?.investment?.gold) || 0,
        parseInt(userData?.investment?.stocks) || 0,
        parseInt(userData?.investment?.realEstate) || 0,
        parseInt(userData?.investment?.mf) || 0,
        parseInt(userData?.investment?.sip) || 0,
      ],
      backgroundColor: ['#42a5f5', '#66bb6a', '#ff7043', '#ab47bc', '#ffca28'],
      borderColor: '#fff',
      borderWidth: 2,
    }],
  };

  const returnData = {
    labels: ['Gold', 'Stocks', 'Real Estate', 'Mutual Funds', 'SIP'],
    datasets: [{
      label: 'Annual Returns (%)',
      data: [
        (parseInt(userData?.investment?.gold) || 0) * 0.03,
        (parseInt(userData?.investment?.stocks) || 0) * 0.07,
        (parseInt(userData?.investment?.realEstate) || 0) * 0.05,
        (parseInt(userData?.investment?.mf) || 0) * 0.06,
        (parseInt(userData?.investment?.sip) || 0) * 0.04,
      ],
      backgroundColor: ['#42a5f5', '#66bb6a', '#ff7043', '#ab47bc', '#ffca28'],
      borderColor: '#fff',
      borderWidth: 2,
    }],
  };

  // Generate recommendation based on the retirement goal
  const recommendInvestmentStrategy = () => {
    const currentInvestments = [
      parseInt(userData?.investment?.gold) || 0,
      parseInt(userData?.investment?.stocks) || 0,
      parseInt(userData?.investment?.realEstate) || 0,
      parseInt(userData?.investment?.mf) || 0,
      parseInt(userData?.investment?.sip) || 0,
    ];

    const totalInvestments = currentInvestments.reduce((a, b) => a + b, 0);
    const retirementTarget = parseInt(userData?.retirementGoal) || 1000000; // Assuming a default retirement goal

    if (totalInvestments < retirementTarget * 0.5) {
      return 'You should increase your investment in long-term growth assets like SIP and Mutual Funds.';
    } else if (totalInvestments < retirementTarget) {
      return 'You are on track, but consider diversifying with stocks and real estate for better returns.';
    } else {
      return 'Congratulations! You are on track to meet your retirement goal. Consider maintaining a balanced portfolio.';
    }
  };

  return (
    <div className="portfolio-page p-6 bg-white text-gray-900">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">My Financial Portfolio</h2>

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
        <input
          type="number"
          placeholder="Gold Investment"
          value={gold}
          onChange={(e) => setGold(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Stocks Investment"
          value={stocks}
          onChange={(e) => setStocks(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Real Estate Investment"
          value={realEstate}
          onChange={(e) => setRealEstate(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Mutual Funds Investment"
          value={mf}
          onChange={(e) => setMF(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="SIP Investment"
          value={sip}
          onChange={(e) => setSIP(e.target.value)}
          className="p-2 border rounded w-full"
        />
        
        {/* Submit button centered in desktop view */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center">
          <button type="submit" className="bg-blue-500 text-white p-3 px-6 rounded hover:scale-105">Submit</button>
        </div>
      </form>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col h-[400px]">
          <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">Income, Savings, and Expenditure</h3>
          <div className="flex-grow">
            <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col h-[400px]">
          <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">Investment Overview</h3>
          <div className="flex-grow">
            <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Annual Returns Chart */}
        <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col h-[400px]">
          <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">Annual Returns on Investments</h3>
          <div className="flex-grow">
            <Doughnut data={returnData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Investment Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-3">
        <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col h-[400px]">
          <h3 className="text-lg font-semibold mb-2">Investment Recommendation</h3>
          <div className="flex-grow">
            <p className="font-bold">{recommendInvestmentStrategy()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;








