


import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Sample event data with images
const eventsData = [
  {
    id: 1,
    name: 'FinTech Summit 2024',
    description: 'A summit on the latest trends in financial technology.',
    date: '2024-02-07',
    time: '10:00 AM - 4:00 PM',
    location: 'Mumbai Convention Center, Mumbai, Maharashtra',
    image: 'https://cdn2.allevents.in/thumbs/thumb653dcb280cd93.jpg',
  },
  {
    id: 2,
    name: 'Investment Strategies Workshop',
    description: 'Learn investment strategies from industry experts.',
    date: '2024-04-05',
    time: '1:00 PM - 5:00 PM',
    location: 'Bengaluru Business School, Bengaluru, Karnataka',
    image: 'https://i0.wp.com/pathfinderstraining.com/wp-content/uploads/2022/07/1-1-5.webp?fit=1214%2C448&ssl=1',
  },
  {
    id: 3,
    name: 'Financial Literacy Seminar',
    description: 'A seminar to promote financial literacy among youth.',
    date: '2024-05-20',
    time: '9:00 AM - 12:00 PM',
    location: 'Delhi University, New Delhi',
    image: 'https://home.familyfirstny.com/wp-content/uploads/2023/05/Financial-Literacy-Seminar.jpg',
  },
  {
    id: 4,
    name: 'Crypto Investment Trends',
    description: 'Explore the latest trends in cryptocurrency investment.',
    date: '2024-06-10',
    time: '11:00 AM - 3:00 PM',
    location: 'Pune IT Park, Pune, Maharashtra',
    image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/video/202105/YT_(1)_(1).jpg?VersionId=OUDfVzhH9nG9SSoOkE.dV4L03uCTpTWN',
  },
  {
    id: 5,
    name: 'Wealth Management Conference',
    description: 'Discuss wealth management strategies with professionals.',
    date: '2024-07-18',
    time: '9:00 AM - 5:00 PM',
    location: 'Hyderabad International Convention Centre, Hyderabad',
    image: 'https://i.ytimg.com/vi/jS4t4-wq0rs/maxresdefault.jpg',
  },
  {
    id: 6,
    name: 'Budgeting for Beginners',
    description: 'A workshop aimed at helping individuals create budgets.',
    date: '2024-08-02',
    time: '10:00 AM - 1:00 PM',
    location: 'Chennai Trade Centre, Chennai',
    image: 'https://i.pinimg.com/736x/dd/3c/d9/dd3cd9f9f4a0a3f8d9a045e4652961ac.jpg',
  },
  {
    id: 7,
    name: 'Retirement Planning Forum',
    description: 'Learn how to plan effectively for retirement.',
    date: '2024-09-15',
    time: '2:00 PM - 6:00 PM',
    location: 'Ahmedabad Management Association, Ahmedabad',
    image: 'https://blog.researchandranking.com/wp-content/uploads/2022/09/Retirement-Plan-in-India.png',
  },
  {
    id: 8,
    name: 'Financial Independence Bootcamp',
    description: 'A bootcamp focused on achieving financial independence.',
    date: '2024-10-25',
    time: '10:00 AM - 4:00 PM',
    location: 'Goa International Airport, Goa',
    image: 'https://decodefinance.in/wp-content/uploads/2021/03/Achieving-Financial-Independence.png',
  },
  {
    id: 9,
    name: 'Stock Market Basics',
    description: 'Learn the fundamentals of stock market investing.',
    date: '2024-11-20',
    time: '1:00 PM - 5:00 PM',
    location: 'Kolkata Business Hub, Kolkata',
    image: 'https://i.ytimg.com/vi/rPXbspfcEZ0/maxresdefault.jpg',
  },
  {
    id: 10,
    name: 'Personal Finance Management',
    description: 'A workshop on managing personal finances effectively.',
    date: '2024-12-12',
    time: '9:00 AM - 3:00 PM',
    location: 'Jaipur Exhibition and Convention Centre, Jaipur',
    image: 'https://th.bing.com/th/id/OIP.MR8o2Fkof1gLjOQk3SJMLAAAAA?rs=1&pid=ImgDetMain',
  },
];

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Filter events based on the search term, location, month, and year
  const filteredEvents = eventsData.filter(event => {
    const matchesSearchTerm =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = selectedLocation
      ? event.location.toLowerCase().includes(selectedLocation.toLowerCase())
      : true;

    const eventDate = new Date(event.date);
    const matchesMonth = selectedMonth ? String(eventDate.getMonth() + 1).padStart(2, '0') === selectedMonth : true;
    const matchesYear = selectedYear ? eventDate.getFullYear().toString() === selectedYear : true;

    return matchesSearchTerm && matchesLocation && matchesMonth && matchesYear;
  });

  // Function to handle registration
  const handleRegister = (eventName) => {
    toast.success(`Successfully registered for ${eventName}!`);
  };

  return (
    <div className="p-6 md:p-12 rounded:xl lg:p-16 bg-gray-50 min-h-screen">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Upcoming Finance Events</h1>
      
      {/* Search and Filter Container */}
      <div className="flex flex-col md:flex-row md:justify-between mb-6">
        {/* Search Bar */}
        <div className="flex-1 mr-0 md:mr-2 mb-2 md:mb-0">
          <input
            type="text"
            placeholder="Search Events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
        </div>

        {/* Location Filter */}
        <div className="flex-1 mr-0 md:mr-2 mb-2 md:mb-0">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          >
            <option value="">All Locations</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Delhi">Delhi</option>
            <option value="Pune">Pune</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Goa">Goa</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Jaipur">Jaipur</option>
          </select>
        </div>

        {/* Month Selector */}
        <div className="flex-1 mr-0 md:mr-2 mb-2 md:mb-0">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          >
            <option value="">All Months</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        {/* Year Selector */}
        <div className="flex-1 mb-2 md:mb-0">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          >
            <option value="">All Years</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event.id} className="border border-gray-300 rounded-md shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:shadow-lg hover:scale-105">
              <img src={event.image} alt={event.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{event.name}</h2>
                <p className="text-gray-600">{event.description}</p>
                <p className="text-gray-600">{event.date} | {event.time}</p>
                <p className="text-gray-600">{event.location}</p>
                <button
                  onClick={() => handleRegister(event.name)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                  Register
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
