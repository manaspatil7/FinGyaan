import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ViewCourse = () => {
  const location = useLocation();
  const { title, author, rating, reviews, category, videoLink } = location.state; // Passed through prop/state

  // Checkpoints for the course
  const [checkpoints, setCheckpoints] = useState([
    { id: 1, text: 'Introduction', completed: false },
    { id: 2, text: 'Chapter 1: Basics', completed: false },
    { id: 3, text: 'Chapter 2: Intermediate', completed: false },
    { id: 4, text: 'Chapter 3: Advanced', completed: false },
    { id: 5, text: 'Conclusion', completed: false }
  ]);

  // Toggle the checkbox when a checkpoint is clicked
  const toggleCheckpoint = (id) => {
    setCheckpoints(
      checkpoints.map((checkpoint) =>
        checkpoint.id === id ? { ...checkpoint, completed: !checkpoint.completed } : checkpoint
      )
    );
  };

  return (
    <div className="flex flex-col md:flex-row p-6 space-y-6 md:space-y-0 md:space-x-6">
      {/* Left side: Video and course details */}
      <div className="w-full md:w-2/3">
        {/* Video iframe */}
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            width="100%"
            height="100%"
            src={videoLink.replace('watch?v=', 'embed/')}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Course title and details */}
        <div className="mt-4">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-gray-700">By {author}</p>
          <p className="text-gray-500">Category: {category}</p>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-yellow-400">
              {'★'.repeat(Math.round(rating))} {'☆'.repeat(5 - Math.round(rating))}
            </span>
            <p className="text-gray-500">({reviews} reviews)</p>
          </div>
        </div>
      </div>

      {/* Right side: Checkpoints and Take Quiz Button */}
      <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Course Checkpoints</h3>
        <ul className="space-y-3">
          {checkpoints.map((checkpoint) => (
            <li key={checkpoint.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={checkpoint.completed}
                onChange={() => toggleCheckpoint(checkpoint.id)}
                className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span
                className={`${
                  checkpoint.completed ? 'line-through text-gray-500' : ''
                } text-lg`}
              >
                {checkpoint.text}
              </span>
            </li>
          ))}
        </ul>

        {/* Take Quiz Button */}
        <div className="mt-6">
          <a
            href="/quiz"
            className="inline-block bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700"
          >
            Take Quiz
          </a>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
