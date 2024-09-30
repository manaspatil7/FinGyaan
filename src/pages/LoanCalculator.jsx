import React, { useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTenure, setLoanTenure] = useState(0);
  const [result, setResult] = useState(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const monthlyRate = annualRate / 12;
    const tenureInMonths = parseInt(loanTenure) * 12;

    // EMI Formula: [P x r x (1+r)^n]/[(1+r)^n-1]
    const EMI = principal * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths) / (Math.pow(1 + monthlyRate, tenureInMonths) - 1);
    const totalPayment = EMI * tenureInMonths;
    const totalInterest = totalPayment - principal;

    // Data for Line Chart (Repayment Over Time)
    const balanceOverTime = [];
    let remainingBalance = principal;
    for (let i = 1; i <= tenureInMonths; i++) {
      remainingBalance = remainingBalance * (1 + monthlyRate) - EMI;
      balanceOverTime.push(Math.max(remainingBalance, 0).toFixed(2)); // Prevent negative balance
    }

    // Set results
    setResult({
      EMI: EMI.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      balanceOverTime,
    });
    setIsCalculated(true);
  };

  // Handle loan amount change for both input box and slider
  const handleLoanAmountChange = (value) => {
    setLoanAmount(value);
  };

  // Handle interest rate change for both input box and slider
  const handleInterestRateChange = (value) => {
    setInterestRate(value);
  };

  // Handle loan tenure change for both input box and slider
  const handleLoanTenureChange = (value) => {
    setLoanTenure(value);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white">
      {/* Information Section */}
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Loan Calculator</h1>
      <p className="text-gray-600 mb-4">
        Calculate your loan's monthly EMI, total repayment, and interest paid over the tenure of the loan. Enter the loan amount, interest rate, and the loan tenure to see your results.
      </p>

      {/* Loan Calculator Section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Input Section */}
        <div
          className={`bg-white p-6 rounded-lg shadow-lg flex-1 max-w-md transition-all duration-300 ${
            isCalculated ? 'md:max-w-md md:ml-auto' : 'md:max-w-md md:mx-auto'
          }`}
          style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
        >
          <h3 className="text-xl font-semibold mb-4">Enter Loan Details</h3>

          {/* Loan Amount Input */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="loanAmount">Loan Amount (INR):</label>
            <input
              type="number"
              id="loanAmount"
              min="0"
              value={loanAmount}
              onChange={(e) => handleLoanAmountChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              placeholder="Enter loan amount"
            />
            <input
              type="range"
              id="loanAmountSlider"
              min="0"
              max={loanAmount > 10000000 ? loanAmount : 10000000} // Dynamic upper limit for loan amount
              step="10000"
              value={loanAmount}
              onChange={(e) => handleLoanAmountChange(e.target.value)}
              className="w-full"
            />
            <span className="text-gray-600">Current Value: ₹{loanAmount}</span>
          </div>

          {/* Interest Rate Input */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="interestRate">Annual Interest Rate (%):</label>
            <input
              type="number"
              id="interestRate"
              min="0"
              max="20"
              step="0.1"
              value={interestRate}
              onChange={(e) => handleInterestRateChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
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

          {/* Loan Tenure Input */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="loanTenure">Loan Tenure (Years):</label>
            <input
              type="number"
              id="loanTenure"
              min="1"
              max="30" // Limiting tenure to 30 years
              value={loanTenure}
              onChange={(e) => handleLoanTenureChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              placeholder="Enter loan tenure"
            />
            <input
              type="range"
              id="loanTenureSlider"
              min="1"
              max="30"
              value={loanTenure}
              onChange={(e) => handleLoanTenureChange(e.target.value)}
              className="w-full"
            />
            <span className="text-gray-600">Current Duration: {loanTenure} years</span>
          </div>

          <button
            onClick={calculateEMI}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Calculate EMI
          </button>

          {/* Results Section */}
          {result && (
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-800">Calculation Results:</h3>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-gray-600">Monthly EMI: <span className="font-bold">₹{result.EMI}</span></p>
                <p className="text-gray-600">Total Repayment: <span className="font-bold">₹{result.totalPayment}</span></p>
                <p className="text-gray-600">Total Interest Paid: <span className="font-bold">₹{result.totalInterest}</span></p>
              </div>
            </div>
          )}
        </div>

        {/* Graph Section */}
        {result && (
          <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Repayment Over Time:</h3>
            <div className="h-64 mb-4">
              <Line
                data={{
                  labels: Array.from({ length: loanTenure * 12 }, (_, i) => `Month ${i + 1}`),
                  datasets: [
                    {
                      label: 'Remaining Balance (INR)',
                      data: result.balanceOverTime,
                      backgroundColor: 'rgba(54, 162, 235, 0.2)',
                      borderColor: 'rgba(54, 162, 235, 1)',
                      borderWidth: 2,
                      tension: 0.4, // Smooth the line chart
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
                        text: 'Remaining Balance (INR)',
                      },
                    },
                  },
                }}
                height={200}
              />
            </div>

            {/* Doughnut Chart Section */}
            <h3 className="text-xl font-bold text-gray-800 mb-4">Loan Repayment Breakdown:</h3>
            <div className="h-64">
              <Doughnut
                data={{
                  labels: ['Principal', 'Interest'],
                  datasets: [
                    {
                      label: 'Principal vs Interest',
                      data: [loanAmount, result.totalInterest],
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

export default LoanCalculator;
