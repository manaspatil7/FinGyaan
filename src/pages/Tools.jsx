import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi'; // Import arrow icon from react-icons

const toolsData = [
  {
    id: 1,
    name: 'FD Calculator',
    icon: '💰',
    description: 'Calculate returns on fixed deposits.',
    path: '/fdcalculator',
  },
  {
    id: 2,
    name: 'SIP Calculator',
    icon: '🏦',
    description: 'Plan your SIP investments effectively.',
    path: '/sip-calculator',
  },
  {
    id: 3,
    name: 'Loan Calculator',
    icon: '📈',
    description: 'Evaluate your loan repayment details.',
    path: '/loan-calculator',
  },
  {
    id: 4,
    name: 'MF Calculator',
    icon: '📝',
    description: 'Calculate mutual fund returns.',
    path: '/mfcalculator',
  },
  {
    id: 5,
    name: 'Retirement Calculator',
    icon: '🕰️',
    description: 'Plan your retirement savings efficiently.',
    path: '/retirement-calculator',
  },
  {
    id: 6,
    name: 'Tax Calculator',
    icon: '💼',
    description: 'Estimate your income tax liability.',
    path: '/tax-calculator',
  },
];

const ToolsPage = () => {
  const navigate = useNavigate();

  const handleToolClick = (path) => {
    navigate(path);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Financial Planning Tools
      </h1>
      <p className="text-center mb-8 text-gray-600">
        Financial tools to help you manage finances ranging from FD calculator to SSY.
      </p>

      {/* Tools Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolsData.map((tool) => (
          <div
            key={tool.id}
            onClick={() => handleToolClick(tool.path)}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
          >
            <div className="flex items-center justify-center h-24 bg-blue-500 text-white text-4xl">
              {tool.icon}
            </div>
            <div className="p-4 text-center">
              <h2 className="text-xl font-bold text-gray-900">{tool.name}</h2>
              <p className="text-gray-600 mt-2">{tool.description}</p>
            </div>

            {/* Arrow Icon at Top Right */}
            <div className="absolute top-4 right-4">
              <HiArrowRight className="text-blue-500 text-2xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const toolsData = [
//   {
//     id: 1,
//     name: 'FD Calculator',
//     icon: '💰',
//     path: '/fdcalculator',
//   },
//   {
//     id: 2,
//     name: 'SIP Calculator',
//     icon: '🏦',
//     path: '/sip-calculator',
//   },
//   {
//     id: 3,
//     name: 'Loan Calculator',
//     icon: '📈',
//     path: '/loan-calculator',
//   },
//   {
//     id: 4,
//     name: 'MF Calculator',
//     icon: '📝',
//     path: '/mfcalculator',
//   },
//   {
//     id: 5,
//     name: 'Retirement Calculator',
//     icon: '🕰️',
//     path: '/retirement-calculator',
//   },
//   {
//     id: 6,
//     name: 'Tax Calculator',
//     icon: '💼',
//     path: '/tax-calculator',
//   },
// ];

// const ToolsPage = () => {
//   const navigate = useNavigate(); // Updated here to use useNavigate

//   const handleToolClick = (path) => {
//     navigate(path); // Updated here to use navigate
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
//         Financial Planning Tools
//       </h1>
//       <p className="text-center mb-8 text-gray-600">
//         Financial tools to help you manage finances ranging from FD calculator to SSY.
//       </p>

//       {/* Tools Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {toolsData.map((tool) => (
//           <div
//             key={tool.id}
//             onClick={() => handleToolClick(tool.path)}
//             className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
//           >
//             <div className="flex items-center justify-center h-24 bg-blue-500 QA text-white text-4xl">
//               {tool.icon}
//             </div>
//             <div className="p-4 text-center">
//               <h2 className="text-xl font-bold text-gray-900">{tool.name}</h2>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ToolsPage;
