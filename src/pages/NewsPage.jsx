import React, { useState, useEffect } from 'react';
import axios from 'axios';

const categories = ['All', 'Stock Market', 'Cryptocurrency', 'Budgeting', 'Investing', 'Retirement'];

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('All');

  // API Key from NewsAPI
  const apiKey = '2e316348b1e84def88717f1c62869e69'; // Your provided API key

  useEffect(() => {
    fetchNews(category);
  }, [category]);

  const fetchNews = async (category) => {
    const query = category === 'All' ? 'finance' : category;
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
      );
      const filteredNews = response.data.articles.filter(article => article.urlToImage); // Filter out news without images
      setNews(filteredNews);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

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
        {news.map((article, index) => (
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
