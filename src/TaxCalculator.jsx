import React, { useState } from 'react';
import { PolarArea, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const TaxCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState('');
  const [investment, setInvestment] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateTax = () => {
    const income = parseFloat(annualIncome);
    const investmentAmount = parseFloat(investment);
    const ageValue = parseInt(age);

    let taxRate;
    if (ageValue < 60) {
      taxRate = income > 500000 ? 0.2 : income > 250000 ? 0.1 : 0;
    } else if (ageValue >= 60 && ageValue < 80) {
      taxRate = income > 300000 ? 0.1 : 0;
    } else {
      taxRate = income > 500000 ? 0.1 : 0;
    }

    const taxableIncome = Math.max(0, income - investmentAmount);
    const taxAmount = taxableIncome * taxRate;

    // Visual data for bar chart (Tax Breakdown)
    const incomeData = [income, taxableIncome, taxAmount];

    // Visual data for polar chart (Investments vs Tax)
    const investmentVsTaxData = [investmentAmount, taxAmount, taxableIncome];

    setResult({
      taxAmount: taxAmount.toFixed(2),
      taxableIncome: taxableIncome.toFixed(2),
      investmentVsTaxData,
      incomeData,
    });

    setIsCalculated(true);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Information Section */}
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Income Tax Calculator</h1>
      <p className="text-gray-600 mb-4">
        Calculate your annual income tax based on your income, investments, and age. The calculator factors in basic exemptions based on age categories and provides a breakdown of the tax amount.
      </p>

      {/* Tax Calculator Section */}
      <div className={`flex flex-col md:flex-row gap-6 ${isCalculated ? 'md:justify-start' : 'md:justify-center'}`}>
        {/* Input Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex-1 max-w-md transition-all duration-300">
          <h3 className="text-xl font-semibold mb-4">Enter Your Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="annualIncome">Annual Income (INR):</label>
            <input
              type="number"
              id="annualIncome"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your annual income"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="investment">Investments (INR):</label>
            <input
              type="number"
              id="investment"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your investments"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your age"
            />
          </div>
          <button
            onClick={calculateTax}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Calculate Tax
          </button>

          {/* Results Section */}
          {result && (
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-800">Calculation Results:</h3>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-gray-600">Taxable Income: <span className="font-bold">₹{result.taxableIncome}</span></p>
                <p className="text-gray-600">Tax Payable: <span className="font-bold">₹{result.taxAmount}</span></p>
              </div>
            </div>
          )}
        </div>

        {/* Graph Section */}
        {result && (
          <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Income Breakdown:</h3>
            <div className="h-64 mb-4">
              <Bar
                data={{
                  labels: ['Annual Income', 'Taxable Income', 'Tax Payable'],
                  datasets: [
                    {
                      label: 'Income Breakdown (INR)',
                      data: result.incomeData,
                      backgroundColor: 'rgba(255, 206, 86, 0.6)',
                      borderColor: 'rgba(255, 206, 86, 1)',
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
              />
            </div>

            {/* Polar Area Chart Section */}
            <h3 className="text-xl font-bold text-gray-800 mb-4">Investments vs Taxable Income:</h3>
            <div className="h-64">
              <PolarArea
                data={{
                  labels: ['Investments', 'Tax Payable', 'Taxable Income'],
                  datasets: [
                    {
                      label: 'Investment vs Tax',
                      data: result.investmentVsTaxData,
                      backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)'],
                      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxCalculator;
