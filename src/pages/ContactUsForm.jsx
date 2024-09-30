import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUsForm = () => {
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! Thank you for contacting us.'); // Display a success toast
    // You can add your form submission logic here, such as sending the data to an API
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center py-16 px-3">
      <div className="w-full max-w-lg bg-blue-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-green-600">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Send Message
          </button>
        </form>
      </div>
      <ToastContainer /> {/* Include the ToastContainer to display notifications */}
    </div>
  );
};

export default ContactUsForm;
