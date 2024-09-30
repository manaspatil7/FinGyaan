import React, { useState } from 'react';
import { Doughnut, Radar } from 'react-chartjs-2';
import 'chart.js/auto';

const SipCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [annualReturnRate, setAnnualReturnRate] = useState(12);
  const [investmentYears, setInvestmentYears] = useState(5);
  const [result, setResult] = useState(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateSIP = () => {
    const investmentPerMonth = parseFloat(monthlyInvestment);
    const rateOfReturn = parseFloat(annualReturnRate) / 100 / 12; // Monthly rate
    const totalMonths = parseInt(investmentYears) * 12;

    let futureValue = 0;
    const yearlyReturns = [];

    for (let i = 0; i < totalMonths; i++) {
      futureValue = (futureValue + investmentPerMonth) * (1 + rateOfReturn);
      if ((i + 1) % 12 === 0) {
        yearlyReturns.push(futureValue); // Store the value at the end of each year
      }
    }

    const totalInvestment = investmentPerMonth * totalMonths;
    const totalReturns = futureValue - totalInvestment;

    const investmentPercentage = ((totalInvestment / futureValue) * 100).toFixed(2);
    const returnsPercentage = ((totalReturns / futureValue) * 100).toFixed(2);

    setResult({
      futureValue: futureValue.toFixed(2),
      totalInvestment: totalInvestment.toFixed(2),
      totalReturns: totalReturns.toFixed(2),
      yearlyReturns,
      investmentPercentage,
      returnsPercentage,
    });

    setIsCalculated(true); 
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Information Section */}
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">SIP (Systematic Investment Plan) Information</h1>
      <p className="text-gray-600 mb-4">
        A Systematic Investment Plan (SIP) allows you to invest a fixed sum regularly in mutual funds. It helps in wealth accumulation through the power of compounding.
      </p>

      {/* SIP Calculator Section */}
      <h2 className="text-2xl font-bold text-center mt-8 mb-4 text-gray-800">SIP Calculator</h2>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Input Section */}
        <div className={`bg-white p-6 rounded-lg shadow-lg flex-1 max-w-md transition-all duration-300 ${isCalculated ? 'md:max-w-md md:ml-auto' : 'md:max-w-md md:mx-auto'}`}>
          <h3 className="text-xl font-semibold mb-4">Enter Your Details</h3>

          <div className="mb-4">
            <label className="block text-gray-700">Monthly Investment (INR):</label>
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
            <label className="block text-gray-700">Expected Annual Return Rate (%):</label>
            <input
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={annualReturnRate}
              onChange={(e) => setAnnualReturnRate(e.target.value)}
              className="w-full"
            />
            <span className="block text-center font-semibold">{annualReturnRate}%</span>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Investment Duration (Years):</label>
            <input
              type="range"
              min="1"
              max="30"
              value={investmentYears}
              onChange={(e) => setInvestmentYears(e.target.value)}
              className="w-full"
            />
            <span className="block text-center font-semibold">{investmentYears} years</span>
          </div>

          <button
            onClick={calculateSIP}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Calculate
          </button>

          {result && (
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-800">Calculation Results:</h3>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-gray-600">Future Value (Maturity Value): <span className="font-bold">₹{result.futureValue}</span></p>
                <p className="text-gray-600">Total Investment: <span className="font-bold">₹{result.totalInvestment}</span></p>
                <p className="text-gray-600">Total Returns: <span className="font-bold">₹{result.totalReturns}</span></p>
              </div>
            </div>
          )}
        </div>

        {/* Graph Section */}
        {result && (
          <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
            {/* Radar Chart Section */}
            <h3 className="text-xl font-bold text-gray-800 mb-4">Yearly Returns:</h3>
            <div className="h-64 mb-4">
              <Radar
                data={{
                  labels: Array.from({ length: investmentYears }, (_, i) => `Year ${i + 1}`),
                  datasets: [
                    {
                      label: 'Future Value at Year End (INR)',
                      data: result.yearlyReturns.map(val => parseFloat(val).toFixed(2)),
                      backgroundColor: 'rgba(75, 192, 192, 0.6)',
                      borderColor: 'rgba(75, 192, 192, 1)',
                      borderWidth: 1,
                      fill: true,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    r: {
                      min: 0,
                      max: Math.max(...result.yearlyReturns) * 1.1, 
                      ticks: {
                        callback: function(value) {
                          return '₹' + value; 
                        },
                      },
                    },
                  },
                }}
                height={200}
              />
            </div>

            {/* Doughnut Chart Section */}
            <h3 className="text-xl font-bold text-gray-800 mb-4">Investment vs Returns:</h3>
            <div className="h-64">
              <Doughnut
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

export default SipCalculator;
