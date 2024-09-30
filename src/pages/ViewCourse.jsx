import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ViewCourse = () => {
  const location = useLocation();
  const { title, author, rating, reviews, category, videoLink } = location.state || {};

  const [checkpoints, setCheckpoints] = useState([
    { id: 1, text: 'Introduction', completed: false },
    { id: 2, text: 'Chapter 1: Basics', completed: false },
    { id: 3, text: 'Chapter 2: Intermediate', completed: false },
    { id: 4, text: 'Chapter 3: Advanced', completed: false },
    { id: 5, text: 'Conclusion', completed: false },
  ]);

  const toggleCheckpoint = (id) => {
    setCheckpoints(
      checkpoints.map((checkpoint) =>
        checkpoint.id === id ? { ...checkpoint, completed: !checkpoint.completed } : checkpoint
      )
    );
  };

  const getEmbedUrl = (link) => {
    if (link && link.includes('watch?v=')) {
      return link.replace('watch?v=', 'embed/');
    }
    return link;
  };

  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="flex flex-col md:flex-row p-6 space-y-6 md:space-y-0 md:space-x-6">
      <div className="w-full md:w-2/3">
        <div className="aspect-w-16 aspect-h-9">
          {videoLink ? (
            <iframe
              width="100%"
              height="500rem"
              src={getEmbedUrl(videoLink)}
              title={title || 'Course Video'}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="text-center text-gray-500">Video not available</div>
          )}
        </div>

        {title && (
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
        )}
      </div>

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
              <span className={`${checkpoint.completed ? 'line-through text-gray-500' : ''} text-lg`}>
                {checkpoint.text}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <button
            onClick={() => setShowQuiz((prev) => !prev)}
            className="inline-block bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700"
          >
            {showQuiz ? 'Hide Quiz' : 'Take Quiz'}
          </button>
        </div>
      </div>

      {showQuiz && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative" style={{ width: '100%', maxWidth: '1200px', paddingBottom: '56.25%', height: 0 }}>
            <button
              onClick={() => setShowQuiz(false)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
              aria-label="Close"
            >
              &times;
            </button>
            <iframe
              title="Personal Finance for Beginners Quiz"
              frameBorder="0"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              src="https://view.genially.com/66fab32b874ffba72e66f567"
              type="text/html"
              allowscriptaccess="always"
              allowFullScreen="true"
              scrolling="yes"
              allownetworking="all"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCourse;


// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const ViewCourse = () => {
//   const location = useLocation();
//   const { title, author, rating, reviews, category, videoLink } = location.state || {};

//   // Debugging to see if videoLink is correctly passed
//   console.log('Video Link:', videoLink);

//   const [checkpoints, setCheckpoints] = useState([
//     { id: 1, text: 'Introduction', completed: false },
//     { id: 2, text: 'Chapter 1: Basics', completed: false },
//     { id: 3, text: 'Chapter 2: Intermediate', completed: false },
//     { id: 4, text: 'Chapter 3: Advanced', completed: false },
//     { id: 5, text: 'Conclusion', completed: false },
//   ]);

//   const toggleCheckpoint = (id) => {
//     setCheckpoints(
//       checkpoints.map((checkpoint) =>
//         checkpoint.id === id ? { ...checkpoint, completed: !checkpoint.completed } : checkpoint
//       )
//     );
//   };

//   // Helper function to format the video URL
//   const getEmbedUrl = (link) => {
//     if (link && link.includes('watch?v=')) {
//       return link.replace('watch?v=', 'embed/');
//     }
//     return link; // Return the original link if it's already in the correct format
//   };

//   // State to control quiz visibility
//   const [showQuiz, setShowQuiz] = useState(false);

//   return (
//     <div className="flex flex-col md:flex-row p-6 space-y-6 md:space-y-0 md:space-x-6">
//       {/* Left side: Video and course details */}
//       <div className="w-full md:w-2/3">
//         {/* Video iframe */}
//         <div className="aspect-w-16 aspect-h-9">
//           {videoLink ? (
//             <iframe
//               width="100%"
//               height="500rem"
//               src={getEmbedUrl(videoLink)} // Use the helper function to get the embed URL
//               title={title || 'Course Video'}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           ) : (
//             <div className="text-center text-gray-500">Video not available</div>
//           )}
//         </div>

//         {/* Course title and details */}
//         {title && (
//           <div className="mt-4">
//             <h2 className="text-3xl font-bold">{title}</h2>
//             <p className="text-gray-700">By {author}</p>
//             <p className="text-gray-500">Category: {category}</p>
//             <div className="flex items-center space-x-2 mt-2">
//               <span className="text-yellow-400">
//                 {'★'.repeat(Math.round(rating))} {'☆'.repeat(5 - Math.round(rating))}
//               </span>
//               <p className="text-gray-500">({reviews} reviews)</p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Right side: Checkpoints and Take Quiz Button */}
//       <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg">
//         <h3 className="text-xl font-semibold mb-4">Course Checkpoints</h3>
//         <ul className="space-y-3">
//           {checkpoints.map((checkpoint) => (
//             <li key={checkpoint.id} className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 checked={checkpoint.completed}
//                 onChange={() => toggleCheckpoint(checkpoint.id)}
//                 className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//               />
//               <span className={`${checkpoint.completed ? 'line-through text-gray-500' : ''} text-lg`}>
//                 {checkpoint.text}
//               </span>
//             </li>
//           ))}
//         </ul>

//         {/* Take Quiz Button */}
//         <div className="mt-6">
//           <button
//             onClick={() => setShowQuiz((prev) => !prev)} // Toggle quiz visibility
//             className="inline-block bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700"
//           >
//             {showQuiz ? 'Hide Quiz' : 'Take Quiz'}
//           </button>
//         </div>
//       </div>

//       {/* Quiz Iframe - Centered on Page */}
//       {showQuiz && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div style={{ width: '100%', maxWidth: '1200px', position: 'relative', paddingBottom: '56.25%', height: 0 }}>
//             <iframe
//               title="Personal Finance for Beginners Quiz"
//               frameBorder="0"
//               style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
//               src="https://view.genially.com/66fab32b874ffba72e66f567"
//               type="text/html"
//               allowscriptaccess="always"
//               allowFullScreen="true"
//               scrolling="yes"
//               allownetworking="all"
//             ></iframe>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewCourse;

