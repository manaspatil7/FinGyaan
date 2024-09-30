import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const coursesData = [
  {
    id: 1,
    title: 'Investment & Portfolio Management',
    author: 'John Doe',
    rating: 5,
    reviews: 120,
    category: 'Investment & Portfolio Management',
    thumbnail: 'https://c8.alamy.com/comp/2H26CBF/investment-portfolio-management-symbol-concept-words-investment-portfolio-management-businessman-hand-beautiful-white-background-business-inves-2H26CBF.jpg',
    videoLink: 'https://www.youtube.com/watch?v=rA4uKIy5gO0',
  },
  {
    id: 2,
    title: 'Personal Finance for Beginners',
    author: 'Jane Smith',
    rating: 4.7,
    reviews: 210,
    category: 'Personal Finance',
    thumbnail: 'https://i.ytimg.com/vi/_WGFFuEIAs0/maxresdefault.jpg',
    videoLink: 'https://www.youtube.com/watch?v=rA4uKIy5gO0',
  },
  {
    id: 3,
    title: 'Corporate Finance Essentials',
    author: 'Michael Lee',
    rating: 4.3,
    reviews: 98,
    category: 'Corporate Finance',
    thumbnail: 'https://i.ytimg.com/vi/Vl_1HwrClGA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLARAVwv60UkHRvsp4b9iZorxWpr_w',
    videoLink: 'https://www.youtube.com/watch?v=ZbdLDPBScUc',
  },
  {
    id: 4,
    title: 'Financial Markets and Instruments',
    author: 'Sarah Wilson',
    rating: 4.2,
    reviews: 150,
    category: 'Financial Markets & Instruments',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR7SKTTCyKf11JOurq-CFdnhcYgqpaSpJqNw&s',
    videoLink: 'https://www.youtube.com/watch?v=OLH0HpGn7i8',
  },
  {
    id: 5,
    title: 'Wealth Management Fundamentals',
    author: 'Lisa Brown',
    rating: 4.8,
    reviews: 275,
    category: 'Wealth Management',
    thumbnail: 'https://www.shutterstock.com/shutterstock/videos/3571604959/thumb/7.jpg?ip=x480',
    videoLink: 'https://www.youtube.com/watch?v=l24V5aK0Dcc',
  },
  {
    id: 6,
    title: 'Introduction to Taxation',
    author: 'David Jones',
    rating: 4.6,
    reviews: 180,
    category: 'Taxation',
    thumbnail: 'https://cdn.slidesharecdn.com/ss_thumbnails/4-210428103939-thumbnail.jpg?width=640&height=640&fit=bounds',
    videoLink: 'https://www.youtube.com/watch?v=l24V5aK0Dcc',
  },
  {
    id: 7,
    title: 'Financial Risk Management Strategies',
    author: 'Emily Taylor',
    rating: 4.4,
    reviews: 130,
    category: 'Financial Risk Management',
    thumbnail: 'https://i.ytimg.com/vi/oRq-ry_n-wQ/maxresdefault.jpg',
    videoLink: 'https://www.youtube.com/watch?v=DGj6kYxlg_c',
  },
  {
    id: 8,
    title: 'Banking & Financial Institutions Overview',
    author: 'Christopher Moore',
    rating: 4.9,
    reviews: 320,
    category: 'Banking & Financial Institutions',
    thumbnail: 'https://embed-ssl.wistia.com/deliveries/c07a2d4fa0e61ed51f377f13def6d02a.webp?image_crop_resized=1280x720',
    videoLink: 'https://www.youtube.com/watch?v=DGj6kYxlg_c',
  },
  {
    id: 9,
    title: 'Entrepreneurship & Small Business Finance',
    author: 'Nancy White',
    rating: 4.5,
    reviews: 145,
    category: 'Entrepreneurship & Small Business Finance',
    thumbnail: 'https://i0.wp.com/thetimesvalue.com/wp-content/uploads/2023/10/Entrepreneurship-and-Small-Business-Finance.jpg',
    videoLink: 'https://www.youtube.com/watch?v=rA4uKIy5gO0',
  },
  {
    id: 10,
    title: 'Retirement Planning Masterclass',
    author: 'Mark Green',
    rating: 4.7,
    reviews: 210,
    category: 'Retirement Planning',
    thumbnail: 'https://i.ytimg.com/vi/7aZuznhQmGM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBrCY_mwRP-hC6KiC1htT2quRraOw',
    videoLink: 'https://www.youtube.com/watch?v=DGj6kYxlg_c',
  },
  {
    id: 11,
    title: 'Real Estate Finance',
    author: 'Paul Johnson',
    rating: 4.6,
    reviews: 175,
    category: 'Real Estate Finance',
    thumbnail: 'https://img.freepik.com/free-vector/flat-design-geometric-real-estate-youtube-thumbnail_23-2149208712.jpg',
    videoLink: 'https://www.youtube.com/watch?v=UPA6U9aFrTk',
  },
  {
    id: 12,
    title: 'Fintech & Innovation',
    author: 'Sophia Nguyen',
    rating: 4.8,
    reviews: 190,
    category: 'Fintech & Innovation',
    thumbnail: 'https://i.ytimg.com/vi/Z3bWeICaUyw/maxresdefault.jpg',
    videoLink: 'https://www.youtube.com/watch?v=OLH0HpGn7i8',
  },
];

const categories = [
  'All',
  'Investment & Portfolio Management',
  'Personal Finance',
  'Corporate Finance',
  'Financial Markets & Instruments',
  'Accounting & Financial Reporting',
  'Banking & Financial Institutions',
  'Taxation',
  'Financial Risk Management',
  'Wealth Management',
  'Retirement Planning',
  'Entrepreneurship & Small Business Finance',
  'Real Estate Finance',
  'Fintech & Innovation',
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const filteredCourses = coursesData.filter(
    (course) =>
      (selectedCategory === 'All' || course.category === selectedCategory) &&
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex">
        {Array(fullStars).fill(<FaStar className="text-yellow-400" />)}
        {halfStar && <FaStarHalfAlt className="text-yellow-400" />}
        {Array(emptyStars).fill(<FaRegStar className="text-yellow-400" />)}
      </div>
    );
  };

  const handleViewCourse = (course) => {
    navigate('/view-course', { state: { 
      title: course.title, 
      author: course.author, 
      rating: course.rating, 
      reviews: course.reviews, 
      category: course.category, 
      videoLink: course.videoLink 
    }});
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Finance Courses</h1>

      {/* Search and Category Filter */}
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <input
          type="text"
          placeholder="Search for courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 md:mb-0"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Recommended Courses */}
      <h2 className="text-2xl font-bold mb-4">Recommended Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.slice(0, 3).map((course) => (
          <div key={course.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-500">By {course.author}</p>
              <div className="flex items-center space-x-2 mt-2">
                {renderStars(course.rating)}
                <span className="text-gray-500 text-sm">({course.reviews} reviews)</span>
              </div>
              <button
                onClick={() => handleViewCourse(course)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                View Course
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* All Courses */}
      <h2 className="text-2xl font-bold mt-8 mb-4">All Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-500">By {course.author}</p>
              <div className="flex items-center space-x-2 mt-2">
                {renderStars(course.rating)}
                <span className="text-gray-500 text-sm">({course.reviews} reviews)</span>
              </div>
              <button
                onClick={() => handleViewCourse(course)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                View Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
