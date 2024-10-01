import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewCourse = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const { title, author, rating, reviews, category, videoLink, quizLink, summary } = location.state || {};

  const [checkpoints, setCheckpoints] = useState([
    { id: 1, text: 'Introduction', completed: false },
    { id: 2, text: 'Chapter 1: Basics', completed: false },
    { id: 3, text: 'Chapter 2: Intermediate', completed: false },
    { id: 4, text: 'Chapter 3: Advanced', completed: false },
    { id: 5, text: 'Conclusion', completed: false },
  ]);

  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const allCompleted = checkpoints.every(checkpoint => checkpoint.completed);

  // Automatically tick a checkpoint every 2 minutes
  useEffect(() => {
    const tickCheckpoint = () => {
      const nextCheckpointIndex = checkpoints.findIndex(c => !c.completed);
      if (nextCheckpointIndex !== -1) {
        setCheckpoints(prevCheckpoints =>
          prevCheckpoints.map((checkpoint, index) =>
            index === nextCheckpointIndex ? { ...checkpoint, completed: true } : checkpoint
          )
        );
      }
    };

    const interval = setInterval(() => {
      tickCheckpoint();
    }, 120000); // 2 minutes

    if (checkpoints.every(c => c.completed)) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [checkpoints]);

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

  const handleCloseQuiz = () => {
    setShowQuiz(false);
    setQuizCompleted(true); // Mark the quiz as completed when the modal is closed
  };

  const handleDownloadCertificate = () => {
    // Navigate to CertificateGenerator with course title
    navigate('/certificate', { state: { title } });
  };

  return (
    <div className="flex flex-col md:flex-row p-6 space-y-6 md:space-y-0 md:space-x-6 bg-white">
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
            <h2 className="text-3xl font-bold text-purple-700">{title}</h2>
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

      <div className="w-full md:w-1/3 bg-purple-50 p-6 rounded-lg shadow-md flex flex-col">
        <h3 className="text-xl font-semibold text-purple-700 mb-4">Course Checkpoints</h3>
        <ul className="space-y-3">
          {checkpoints.map((checkpoint) => (
            <li key={checkpoint.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={checkpoint.completed}
                onChange={() => toggleCheckpoint(checkpoint.id)}
                className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className={`${checkpoint.completed ? 'line-through text-gray-500' : ''} text-lg`}>
                {checkpoint.text}
              </span>
            </li>
          ))}
        </ul>

        {/* Summary Section */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-purple-700 mb-2">Video Summary</h3>
          <ul className="list-disc list-inside text-gray-700">
            {summary ? (
              summary.map((point, index) => (
                <li key={index} className="text-lg">{point}</li>
              ))
            ) : (
              <p className="text-gray-500">No summary available for this course.</p>
            )}
          </ul>
        </div>

        {/* Take Quiz Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowQuiz(true)}
            className={`inline-block ${allCompleted ? 'bg-purple-600' : 'bg-gray-400 cursor-not-allowed'} text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300`}
            disabled={!allCompleted} // Disable if not all checkpoints are completed
          >
            Take Quiz
          </button>
        </div>

        {/* Download Certificate Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDownloadCertificate} // Navigate to CertificateGenerator with title
            className={`bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 ${quizCompleted ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}`}
            disabled={!quizCompleted} // Disable if quiz hasn't been completed
          >
            Download Certificate
          </button>
        </div>
      </div>

      {showQuiz && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
            <button
              onClick={handleCloseQuiz} // Close quiz and enable download certificate button
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
              aria-label="Close"
            >
              &times;
            </button>
            <iframe
              title="Course Quiz"
              frameBorder="0"
              className="w-full h-[400px] rounded-lg"
              src={quizLink} // Embed the quiz link
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCourse;





// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// const ViewCourse = () => {
//   const location = useLocation();
//   const { title, author, rating, reviews, category, videoLink, quizLink, summary } = location.state || {};

//   const [checkpoints, setCheckpoints] = useState([
//     { id: 1, text: 'Introduction', completed: false },
//     { id: 2, text: 'Chapter 1: Basics', completed: false },
//     { id: 3, text: 'Chapter 2: Intermediate', completed: false },
//     { id: 4, text: 'Chapter 3: Advanced', completed: false },
//     { id: 5, text: 'Conclusion', completed: false },
//   ]);

//   const [quizCompleted, setQuizCompleted] = useState(false); // Track if the quiz is completed
//   const [showQuiz, setShowQuiz] = useState(false);
//   const allCompleted = checkpoints.every(checkpoint => checkpoint.completed);

//   // Automatically tick a checkpoint every 2 minutes
//   useEffect(() => {
//     const tickCheckpoint = () => {
//       const nextCheckpointIndex = checkpoints.findIndex(c => !c.completed);
//       if (nextCheckpointIndex !== -1) {
//         setCheckpoints(prevCheckpoints =>
//           prevCheckpoints.map((checkpoint, index) =>
//             index === nextCheckpointIndex ? { ...checkpoint, completed: true } : checkpoint
//           )
//         );
//       }
//     };

//     const interval = setInterval(() => {
//       tickCheckpoint();
//     }, 120000); // 2 minutes

//     if (checkpoints.every(c => c.completed)) {
//       clearInterval(interval);
//     }

//     return () => clearInterval(interval);
//   }, [checkpoints]);

//   const toggleCheckpoint = (id) => {
//     setCheckpoints(
//       checkpoints.map((checkpoint) =>
//         checkpoint.id === id ? { ...checkpoint, completed: !checkpoint.completed } : checkpoint
//       )
//     );
//   };

//   const getEmbedUrl = (link) => {
//     if (link && link.includes('watch?v=')) {
//       return link.replace('watch?v=', 'embed/');
//     }
//     return link;
//   };

//   const handleCloseQuiz = () => {
//     setShowQuiz(false);
//     setQuizCompleted(true); // Mark the quiz as completed when the modal is closed
//   };

//   return (
//     <div className="flex flex-col md:flex-row p-6 space-y-6 md:space-y-0 md:space-x-6 bg-white">
//       <div className="w-full md:w-2/3">
//         <div className="aspect-w-16 aspect-h-9">
//           {videoLink ? (
//             <iframe
//               width="100%"
//               height="500rem"
//               src={getEmbedUrl(videoLink)}
//               title={title || 'Course Video'}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           ) : (
//             <div className="text-center text-gray-500">Video not available</div>
//           )}
//         </div>

//         {title && (
//           <div className="mt-4">
//             <h2 className="text-3xl font-bold text-purple-700">{title}</h2>
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

//       <div className="w-full md:w-1/3 bg-purple-50 p-6 rounded-lg shadow-md flex flex-col">
//         <h3 className="text-xl font-semibold text-purple-700 mb-4">Course Checkpoints</h3>
//         <ul className="space-y-3">
//           {checkpoints.map((checkpoint) => (
//             <li key={checkpoint.id} className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 checked={checkpoint.completed}
//                 onChange={() => toggleCheckpoint(checkpoint.id)}
//                 className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
//               />
//               <span className={`${checkpoint.completed ? 'line-through text-gray-500' : ''} text-lg`}>
//                 {checkpoint.text}
//               </span>
//             </li>
//           ))}
//         </ul>

//         {/* Summary Section */}
//         <div className="mt-6">
//           <h3 className="text-2xl font-semibold text-purple-700 mb-2">Video Summary</h3>
//           <ul className="list-disc list-inside text-gray-700">
//             {summary ? (
//               summary.map((point, index) => (
//                 <li key={index} className="text-lg">{point}</li>
//               ))
//             ) : (
//               <p className="text-gray-500">No summary available for this course.</p>
//             )}
//           </ul>
//         </div>

//         {/* Take Quiz Button */}
//         <div className="mt-6 flex justify-center">
//           <button
//             onClick={() => setShowQuiz(true)}
//             className={`inline-block ${allCompleted ? 'bg-purple-600' : 'bg-gray-400 cursor-not-allowed'} text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300`}
//             disabled={!allCompleted} // Disable if not all checkpoints are completed
//           >
//             Take Quiz
//           </button>
//         </div>

//         {/* Download Certificate Button */}
//         <div className="mt-6 flex justify-center">
//           <a
//             href="/path-to-your-certificate.pdf" // Update this with the actual path to your certificate
//             className={`bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 ${quizCompleted ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}`}
//             download
//             onClick={(e) => !quizCompleted && e.preventDefault()} // Prevent the action if the quiz hasn't been completed
//           >
//             Download Certificate
//           </a>
//         </div>
//       </div>

//       {showQuiz && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="relative w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
//             <button
//               onClick={handleCloseQuiz} // Close quiz and enable download certificate button
//               className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
//               aria-label="Close"
//             >
//               &times;
//             </button>
//             <iframe
//               title="Course Quiz"
//               frameBorder="0"
//               className="w-full h-[400px] rounded-lg"
//               src={quizLink} // Embed the quiz link
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewCourse;


