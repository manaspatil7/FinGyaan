import React from 'react'

const Tools = () => {
  return (
    <div>Tools</div>
  )
}

export default Tools






// import React from 'react';
// // import { useHistory } from 'react-router-dom';

// const toolsData = [
//   {
//     id: 1,
//     name: 'FD Calculator',
//     icon: '💰',
//     path: '/fd-calculator',
//   },
//   {
//     id: 2,
//     name: 'SSY Calculator',
//     icon: '🏦',
//     path: '/ssy-calculator',
//   },
//   {
//     id: 3,
//     name: 'Loan Calculator',
//     icon: '📈',
//     path: '/loan-calculator',
//   },
//   {
//     id: 4,
//     name: 'Budget Planner',
//     icon: '📝',
//     path: '/budget-planner',
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
//   {
//     id: 7,
//     name: 'Investment Tracker',
//     icon: '📊',
//     path: '/investment-tracker',
//   },
//   {
//     id: 8,
//     name: 'Net Worth Calculator',
//     icon: '💵',
//     path: '/net-worth-calculator',
//   },
// ];

// const ToolsPage = () => {
//   const history = useHistory();

//   const handleToolClick = (path) => {
//     history.push(path);
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
//             <div className="flex items-center justify-center h-24 bg-blue-500 text-white text-4xl">
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
