// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const categories = ['All', 'Stock Market', 'Cryptocurrency', 'Budgeting', 'Investing', 'Retirement'];

// const NewsPage = () => {
//   const [news, setNews] = useState([]);
//   const [category, setCategory] = useState('All');

//   // API Key from NewsAPI
//   const apiKey = '2e316348b1e84def88717f1c62869e69'; // Your provided API key

//   useEffect(() => {
//     fetchNews(category);
//   }, [category]);

//   const fetchNews = async (category) => {
//     const query = category === 'All' ? 'finance' : category;
//     try {
//       const response = await axios.get(
//         `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
//       );
//       const filteredNews = response.data.articles.filter(article => article.urlToImage); // Filter out news without images
//       setNews(filteredNews);
//     } catch (error) {
//       console.error('Error fetching news:', error);
//     }
//   };

//   return (
//     <div className="p-4">
//       {/* Categories Section */}
//       <div className="flex flex-wrap justify-center mb-4 space-x-4">
//         {categories.map((cat, index) => (
//           <button
//             key={index}
//             onClick={() => setCategory(cat)}
//             className={`px-4 py-2 rounded-lg border-2 ${category === cat ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* News Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {news.map((article, index) => (
//           <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
//             <img
//               src={article.urlToImage}
//               alt={article.title}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-bold mb-2">{article.title}</h2>
//               <p className="text-sm text-gray-600 mb-4">{article.description}</p>
//               <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
//                 Read More
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NewsPage;



import React, { useState } from 'react';

const categories = ['All', 'Stock Market', 'Cryptocurrency', 'Budgeting', 'Investing', 'Retirement'];

// Static News Data
const staticNews = [
  {
    title: 'Stock Market Reaches New Heights',
    description: 'The stock market continues to climb, reaching record-breaking heights in Q4 2024.',
    urlToImage: 'https://static.tnn.in/thumb/msid-113568190,thumbsize-33076,width-1280,height-720,resizemode-75/113568190.jpg',
    url: 'https://example.com/stock-market-reaches-new-heights',
  },
  {
    title: 'Cryptocurrency Surge in 2025',
    description: 'Cryptocurrencies are making a comeback as Bitcoin and Ethereum gain momentum.',
    urlToImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkjLoCZ2S88YH5K_hfWnOWlLDMKkIN6WQxNA&s',
    url: 'https://example.com/cryptocurrency-surge-2025',
  },
  {
    title: 'The Basics of Budgeting for Beginners',
    description: 'A simple guide to understanding the basics of budgeting and managing your finances.',
    urlToImage: 'https://i.ytimg.com/vi/7lHNMGoACdQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB39aH3kefXDZBqFkFqEOzg0O-E8Q',
    url: 'https://example.com/budgeting-for-beginners',
  },
  {
    title: 'Investing in Real Estate for Long-Term Gains',
    description: 'How investing in real estate can provide you with long-term financial stability.',
    urlToImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTtaxbfM_xsik4LIJeon2RBsNb9AzF69gzXQ&s',
    url: 'https://example.com/investing-in-real-estate',
  },
  {
    title: 'Planning for Retirement: What You Need to Know',
    description: 'Retirement planning tips for individuals at different stages of their careers.',
    urlToImage: 'https://www.investopedia.com/thmb/ymmKuNZnY_tNjepQTMxJC8-rje4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/retirement-planning.asp-FINAL-ed21279a08874c54a3a0f4858866e0b6.png',
    url: 'https://example.com/planning-for-retirement',
  },
];

const NewsPage = () => {
  const [category, setCategory] = useState('All');

  // Filter static news based on selected category
  const filteredNews = category === 'All' ? staticNews : staticNews.filter(article => article.title.toLowerCase().includes(category.toLowerCase()));

  return (
    <div className="p-4">
      {/* Categories Section */}
      <div className="flex flex-wrap justify-center mb-4 space-x-4">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-lg border-2 ${category === cat ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((article, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{article.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
