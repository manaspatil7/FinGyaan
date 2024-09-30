import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const FdCalculator = () => {
  const [principal, setPrincipal] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [years, setYears] = useState(0);
  const [result, setResult] = useState(null);
  const [isCalculated, setIsCalculated] = useState(false); // State to track if calculation has been done

  // Function to calculate the Fixed Deposit
  const calculateFD = () => {
    const principalAmount = parseFloat(principal);
    const rateOfInterest = parseFloat(interestRate) / 100;
    const timeInYears = parseFloat(years);

    const totalInterest = principalAmount * rateOfInterest * timeInYears;
    const maturityValue = principalAmount + totalInterest;

    const yearlyReturns = [];
    for (let i = 1; i <= timeInYears; i++) {
      yearlyReturns.push((principalAmount * rateOfInterest * i).toFixed(2));
    }

    const investmentPercentage = ((principalAmount / maturityValue) * 100).toFixed(2);
    const returnsPercentage = ((totalInterest / maturityValue) * 100).toFixed(2);

    setResult({
      totalAmount: maturityValue.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      yearlyReturns,
      investmentPercentage,
      returnsPercentage,
    });

    setIsCalculated(true);
  };

  // Handle principal change for both input box and slider
  const handlePrincipalChange = (value) => {
    setPrincipal(value);
  };

  // Handle interest rate change for both input box and slider
  const handleInterestRateChange = (value) => {
    setInterestRate(value);
  };

  // Handle years change for both input box and slider
  const handleYearsChange = (value) => {
    setYears(value);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white">
      {/* Information Section */}
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Fixed Deposit (FD) Information</h1>
      <p className="text-gray-600 mb-4">
        A Fixed Deposit (FD) is a financial instrument provided by banks that offers a higher interest rate
        than a regular savings account until the given maturity date. FDs are typically used for saving
        purposes and provide a reliable way to grow your money with guaranteed returns.
      </p>
      <p className="text-gray-600 mb-4">
        Fixed Deposits come with various tenures and interest rates. They are a secure investment option,
        ideal for risk-averse individuals looking to save for future goals.
      </p>
      <p className="text-gray-600 mb-4">
        With FDs, you can also benefit from compounding interest, where the interest earned gets added to the principal,
        resulting in higher returns over time. Choose an FD that aligns with your financial goals and risk appetite.
      </p>

      {/* FD Calculator Section */}
      <h2 className="text-2xl font-bold text-center mt-8 mb-4 text-gray-800">FD Calculator</h2>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Calculator Section */}
        <div
          className={`bg-white p-6 rounded-lg shadow-lg flex-1 max-w-md transition-all duration-300 ${
            isCalculated ? 'md:max-w-md md:ml-auto' : 'md:max-w-md md:mx-auto'
          }`}
          style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
        >
          <h3 className="text-xl font-semibold mb-4">Enter Your Details</h3>

          {/* Principal Amount Input */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="principal">
              Principal Amount (INR):
            </label>
            <input
              type="number"
              id="principal"
              min="0"
              max="10000000" // 1 crore
              value={principal}
              onChange={(e) => handlePrincipalChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-2"
              placeholder="Enter principal amount"
            />
            <input
              type="range"
              id="principalSlider"
              min="0"
              max="10000000"
              step="100000"
              value={principal}
              onChange={(e) => handlePrincipalChange(e.target.value)}
              className="w-full"
            />
            <span className="text-gray-600">Current Value: ₹{principal}</span>
          </div>

          {/* Interest Rate Input */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="interestRate">
              Interest Rate (Annual %):
            </label>
            <input
              type="number"
              id="interestRate"
              min="0"
              max="20"
              step="0.1"
              value={interestRate}
              onChange={(e) => handleInterestRateChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-2"
              placeholder="Enter interest rate"
            />
            <input
              type="range"
              id="interestRateSlider"
              min="0"
              max="20"
              step="0.1"
              value={interestRate}
              onChange={(e) => handleInterestRateChange(e.target.value)}
              className="w-full"
            />
            <span className="text-gray-600">Current Rate: {interestRate}%</span>
          </div>

          {/* Years Input */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="years">
              Number of Years:
            </label>
            <input
              type="number"
              id="years"
              min="1"
              max="30" // Limiting to 30 years for FD
              value={years}
              onChange={(e) => handleYearsChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-2"
              placeholder="Enter number of years"
            />
            <input
              type="range"
              id="yearsSlider"
              min="1"
              max="30"
              value={years}
              onChange={(e) => handleYearsChange(e.target.value)}
              className="w-full"
            />
            <span className="text-gray-600">Current Duration: {years} years</span>
          </div>

          <button
            onClick={calculateFD}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200 shadow-md hover:shadow-lg"
          >
            Calculate
          </button>

          {/* Results Section */}
          {result && (
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-800">Calculation Results:</h3>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-gray-600">Total Amount (Maturity Value): <span className="font-bold">₹{result.totalAmount}</span></p>
                <p className="text-gray-600">Total Interest Earned: <span className="font-bold">₹{result.totalInterest}</span></p>
              </div>
            </div>
          )}
        </div>

        {/* Graph Section */}
        {result && (
          <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Yearly Returns:</h3>
            <div className="h-64 mb-4">
              <Bar
                data={{
                  labels: Array.from({ length: years }, (_, i) => `Year ${i + 1}`),
                  datasets: [
                    {
                      label: 'Interest Earned (INR)',
                      data: result.yearlyReturns,
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

            {/* Pie Chart Section */}
            <h3 className="text-xl font-bold text-gray-800 mb-4">Investment vs Returns:</h3>
            <div className="h-64">
              <Pie
                data={{
                  labels: ['Investment', 'Returns'],
                  datasets: [
                    {
                      label: 'Investment vs Returns',
                      data: [result.investmentPercentage, result.returnsPercentage],
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

export default FdCalculator;
