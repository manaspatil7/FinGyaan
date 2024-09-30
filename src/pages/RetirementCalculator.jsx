import React, { useState } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [annualReturnRate, setAnnualReturnRate] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [expectedInflationRate, setExpectedInflationRate] = useState('');
  const [result, setResult] = useState(null);
  const [isCalculated, setIsCalculated] = useState(false); // State to track if calculation has been done

  const calculateRetirement = () => {
    const investmentPerMonth = parseFloat(monthlyInvestment);
    const rateOfReturn = parseFloat(annualReturnRate) / 100 / 12; // Monthly rate
    const inflationRate = parseFloat(expectedInflationRate) / 100 / 12; // Monthly inflation rate
    const totalMonths = (parseInt(retirementAge) - parseInt(currentAge)) * 12;

    // Calculate future value of retirement savings
    let futureValue = parseFloat(currentSavings); // Start with current savings
    const yearlyReturns = [];

    for (let i = 0; i < totalMonths; i++) {
      futureValue = (futureValue + investmentPerMonth) * (1 + rateOfReturn);
      if ((i + 1) % 12 === 0) {
        yearlyReturns.push(futureValue); // Store the value at the end of each year
      }
    }

    const totalInvestment = investmentPerMonth * totalMonths + parseFloat(currentSavings);
    const totalReturns = futureValue - totalInvestment;

    // Adjusting future value for inflation
    const futureValueAdjusted = futureValue / Math.pow(1 + inflationRate, totalMonths);

    // Calculate investment and returns percentage for doughnut chart
    const investmentPercentage = ((totalInvestment / futureValue) * 100).toFixed(2);
    const returnsPercentage = ((totalReturns / futureValue) * 100).toFixed(2);

    setResult({
      futureValue: futureValue.toFixed(2),
      futureValueAdjusted: futureValueAdjusted.toFixed(2),
      totalInvestment: totalInvestment.toFixed(2),
      totalReturns: totalReturns.toFixed(2),
      yearlyReturns,
      investmentPercentage,
      returnsPercentage,
    });

    setIsCalculated(true); // Set the calculated state to true
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white">
      {/* Information Section */}
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Retirement Calculator</h1>
      <p className="text-gray-600 mb-4">
        Planning for retirement is crucial to ensure you have the financial resources needed to enjoy your retirement years.
        A Retirement Calculator helps you determine how much you need to invest regularly to reach your retirement goals.
      </p>

      {/* Retirement Calculator Section */}
      <h2 className="text-2xl font-bold text-center mt-8 mb-4 text-gray-800">Retirement Savings Calculator</h2>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Calculator Section */}
        <div
          className={`bg-white p-6 rounded-lg shadow-lg flex-1 max-w-md transition-all duration-300 ${
            isCalculated ? 'md:max-w-md md:ml-auto' : 'md:max-w-md md:mx-auto'
          }`}
          style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
        >
          <h3 className="text-xl font-semibold mb-4">Enter Your Details</h3>

          {/* Current Age Input */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="currentAge">
              Current Age:
            </label>
            <input
              type="number"
              id="currentAge"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your current age"
            />
          </div>

          {/* Retirement Age Input */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="retirementAge">
              Retirement Age:
            </label>
            <input
              type="number"
              id="retirementAge"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your desired retirement age"
            />
          </div>

          {/* Monthly Investment Input */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="monthlyInvestment">
              Monthly Investment (INR):
            </label>
            <input
              type="number"
              id="monthlyInvestment"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter monthly investment"
            />
          </div>

          {/* Expected Annual Return Rate Input */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="annualReturnRate">
              Expected Annual Return Rate (%):
            </label>
            <input
              type="number"
              id="annualReturnRate"
              value={annualReturnRate}
              onChange={(e) => setAnnualReturnRate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter annual return rate"
            />
          </div>

          {/* Current Savings Input */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="currentSavings">
              Current Savings (INR):
            </label>
            <input
              type="number"
              id="currentSavings"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter current savings"
            />
          </div>

          {/* Expected Inflation Rate Input */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="expectedInflationRate">
              Expected Inflation Rate (%):
            </label>
            <input
              type="number"
              id="expectedInflationRate"
              value={expectedInflationRate}
              onChange={(e) => setExpectedInflationRate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter expected inflation rate"
            />
          </div>

          <button
            onClick={calculateRetirement}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Calculate
          </button>

          {/* Results Section */}
          {result && (
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-800">Calculation Results:</h3>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-gray-600">Future Value (Maturity Value): <span className="font-bold">₹{result.futureValue}</span></p>
                <p className="text-gray-600">Future Value Adjusted for Inflation: <span className="font-bold">₹{result.futureValueAdjusted}</span></p>
                <p className="text-gray-600">Total Investment: <span className="font-bold">₹{result.totalInvestment}</span></p>
                <p className="text-gray-600">Total Returns: <span className="font-bold">₹{result.totalReturns}</span></p>
              </div>
            </div>
          )}
        </div>

        {/* Graph Section */}
        {result && (
          <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
            {/* Bar Chart Section */}
            <h3 className="text-xl font-bold text-gray-800 mb-4">Projected Growth Over the Years:</h3>
            <div className="h-64 mb-4">
              <Bar
                data={{
                  labels: Array.from({ length: retirementAge - currentAge }, (_, i) => `Year ${i + 1}`),
                  datasets: [
                    {
                      label: 'Projected Growth',
                      data: result.yearlyReturns,
                      backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>

            {/* Doughnut Chart Section */}
            <h3 className="text-xl font-bold text-gray-800 mb-4">Investment vs Returns:</h3>
            <div className="h-64 mb-4">
              <Doughnut
                data={{
                  labels: ['Investment', 'Returns'],
                  datasets: [
                    {
                      data: [result.investmentPercentage, result.returnsPercentage],
                      backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetirementCalculator;
