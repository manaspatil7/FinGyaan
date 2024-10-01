import React from 'react';

const Games = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 p-6">
      <h1 className="text-4xl font-bold text-white mb-12 text-center">Choose Your Game</h1>
      
      <div className="flex flex-col md:flex-row justify-around w-full max-w-4xl space-y-6 md:space-y-0 md:space-x-6">
        
        {/* Game 1: What is Credit? */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <img src="https://www.consolidatedcredit.org/wp-content/uploads/2017/04/gogc-thumbnail.jpg" alt="What is Credit?" className="w-full h-48 object-cover" />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-purple-700">What is Credit?</h2>
            <p className="text-gray-600 mt-2">Understand how credit works and master your finances with this interactive game.</p>
            <a 
              href="https://mikewesthad.github.io/financial-literacy-playlist-games/what-is-credit/" 
              className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
            >
              Play Now
            </a>
          </div>
        </div>
        
        {/* Game 2: Money Magic */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <img src="https://d3f7q2msm2165u.cloudfront.net/aaa-content/user/files/web/arcade-games/moneymagic_2xcover.jpg" alt="Money Magic" className="w-full h-48 object-cover" />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-700">Money Magic</h2>
            <p className="text-gray-600 mt-2">Test your budgeting skills in this magical world of finance and money management.</p>
            <a 
              href="https://playmoneymagic.com/" 
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Play Now
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Games;
