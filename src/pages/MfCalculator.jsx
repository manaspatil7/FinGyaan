import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const MfCalculator = () => {
  const [method, setMethod] = useState('SIP'); // Default method is SIP
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [annualReturns, setAnnualReturns] = useState(10);
  const [years, setYears] = useState(5);
  const [result, setResult] = useState(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateMF = () => {
    const monthlyInvestmentAmount = parseFloat(monthlyInvestment);
    const expectedAnnualReturn = parseFloat(annualReturns) / 100;
    const investmentDuration = parseFloat(years);

    if (monthlyInvestmentAmount <= 0 || expectedAnnualReturn <= 0 || investmentDuration <= 0) {
      alert("Please enter positive values for all fields.");
      return;
    }

    let futureValue;
    let totalInvestment;
    let totalReturns;

    if (method === 'SIP') {
      totalInvestment = monthlyInvestmentAmount * investmentDuration * 12;
      const monthlyRate = expectedAnnualReturn / 12;
      const months = investmentDuration * 12;
      futureValue = 
        monthlyInvestmentAmount * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate);
      totalReturns = futureValue - totalInvestment;
    } else {
      totalInvestment = monthlyInvestmentAmount;
      futureValue = totalInvestment * (1 + expectedAnnualReturn) ** investmentDuration;
      totalReturns = futureValue - totalInvestment;
    }

    if (totalReturns < 0) {
      alert("The future value is less than the total investment. Please check your inputs.");
      return;
    }

    const growthData = [];
    for (let i = 1; i <= investmentDuration; i++) {
      let yearValue = method === 'SIP'
        ? monthlyInvestmentAmount * (((1 + expectedAnnualReturn / 12) ** (i * 12) - 1) / (expectedAnnualReturn / 12)) * (1 + expectedAnnualReturn / 12)
        : totalInvestment * (1 + expectedAnnualReturn) ** i;

      growthData.push(yearValue.toFixed(2));
    }

    const investmentPercentage = ((totalInvestment / futureValue) * 100).toFixed(2);
    const returnsPercentage = ((totalReturns / futureValue) * 100).toFixed(2);

    setResult({
      futureValue: futureValue.toFixed(2),
      totalInvestment: totalInvestment.toFixed(2),
      totalReturns: totalReturns.toFixed(2),
      growthData,
      investmentPercentage,
      returnsPercentage,
    });

    setIsCalculated(true);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Mutual Fund (MF) Calculator</h1>
      <p className="text-gray-600 mb-4">
        A Mutual Fund is an investment vehicle made up of a pool of money collected from many investors
        to purchase securities. Invest via SIP (Systematic Investment Plan) or lump sum investments.
      </p>

      <h2 className="text-2xl font-bold text-center mt-8 mb-4 text-gray-800">Calculate Your Investment Growth</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className={`bg-white p-6 rounded-lg shadow-lg flex-1 max-w-md transition-all duration-300 ${isCalculated ? 'md:max-w-md md:ml-auto' : 'md:max-w-md md:mx-auto'}`}>
          <h3 className="text-xl font-semibold mb-4">Enter Your Details</h3>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="method">Investment Method:</label>
            <select
              id="method"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="SIP">SIP</option>
              <option value="Lumpsum">Lumpsum</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Investment (INR):</label>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              className="w-full"
            />
            <span className="block text-center font-semibold">₹{monthlyInvestment}</span>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Expected Annual Returns (%):</label>
            <input
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={annualReturns}
              onChange={(e) => setAnnualReturns(e.target.value)}
              className="w-full"
            />
            <span className="block text-center font-semibold">{annualReturns}%</span>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Time Period (Years):</label>
            <input
              type="range"
              min="1"
              max="30"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full"
            />
            <span className="block text-center font-semibold">{years} years</span>
          </div>

          <button
            onClick={calculateMF}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Calculate
          </button>

          {result && (
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-800">Calculation Results:</h3>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-gray-600">Future Value: <span className="font-bold">₹{result.futureValue}</span></p>
                <p className="text-gray-600">Total Investment: <span className="font-bold">₹{result.totalInvestment}</span></p>
                <p className="text-gray-600">Total Returns: <span className="font-bold">₹{result.totalReturns}</span></p>
              </div>
            </div>
          )}
        </div>

        {result && (
          <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Growth Over Time:</h3>
            <div className="h-64 mb-4">
              <Bar
                data={{
                  labels: Array.from({ length: years }, (_, i) => `Year ${i + 1}`),
                  datasets: [
                    {
                      label: 'Investment Growth (INR)',
                      data: result.growthData,
                      backgroundColor: 'rgba(75, 192, 192, 0.6)',
                      borderColor: 'rgba(75, 192, 192, 1)',
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Amount (INR)',
                      },
                    },
                  },
                }}
                height={200}
              />
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-4">Investment vs Returns:</h3>
            <div className="h-64">
              <Pie
                data={{
                  labels: ['Investment', 'Returns'],
                  datasets: [
                    {
                      label: 'Investment vs Returns',
                      data: [result.totalInvestment, result.totalReturns],
                      backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                height={200}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MfCalculator;
