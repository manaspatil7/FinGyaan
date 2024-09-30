// src/components/LoginSignUp.jsx
import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSpring, animated } from 'react-spring';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginSignUp = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState(''); // Added name state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const db = getFirestore(); // Initialize Firestore
  const navigate = useNavigate(); // Initialize navigate

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await saveUserData(userCredential.user.uid, name, email); // Save user data
        toast.success('Sign-up successful!');
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        toast.success('Login successful!');
      }

      // Redirect to Gq.jsx page after successful auth
      navigate('/gq'); // Change this to the correct path for Gq.jsx

      // Clear fields after successful auth
      setName(''); // Clear name field
      setEmail('');
      setPassword('');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      await saveUserData(userCredential.user.uid, userCredential.user.displayName, userCredential.user.email); // Save user data
      toast.success('Google sign-in successful!');

      // Redirect to Gq.jsx page after successful Google sign-in
      navigate('/gq'); // Change this to the correct path for Gq.jsx
    } catch (error) {
      toast.error(error.message);
    }
  };

  const saveUserData = async (uid, name, email) => {
    try {
      await setDoc(doc(db, 'users', uid), {
        name,
        email,
      });
    } catch (error) {
      toast.error('Error saving user data: ' + error.message);
    }
  };

  // Animation properties
  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  return (
    <div className="flex items-center justify-center min-h-screen px-5 bg-gray-100">
      <animated.div
        style={fadeInProps}
        className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 w-full max-w-md h-auto transition-transform transform hover:scale-105"
      >
        <h2 className="text-2xl font-bold text-center mb-4">{isSignUp ? 'Sign Up' : 'Login'}</h2>
        {isSignUp && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block border border-gray-300 rounded w-full py-2 px-3 mb-3 transition duration-200 ease-in-out focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        )}
        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block border border-gray-300 rounded w-full py-2 px-3 mb-3 transition duration-200 ease-in-out focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block border border-gray-300 rounded w-full py-2 px-3 mb-3 transition duration-200 ease-in-out focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-200 ease-in-out"
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-4">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-500 underline"
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </button>
        </p>
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center bg-white border border-gray-300 rounded shadow px-4 py-2 transition duration-200 ease-in-out transform hover:scale-105"
          >
            <img
              src="https://image.similarpng.com/very-thumbnail/2020/06/Logo-google-icon-PNG.png"
              alt="Google logo"
              className="w-6 h-6 mr-2"
            />
            Sign in with Google
          </button>
        </div>
      </animated.div>
      <ToastContainer />
    </div>
  );
};

export default LoginSignUp;














// // src/components/LoginSignUp.jsx
// import React, { useState } from 'react';
// import { auth } from '../firebase/firebase';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const LoginSignUp = () => {
//   const [isSignUp, setIsSignUp] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleAuth = async (e) => {
//     e.preventDefault();
//     try {
//       if (isSignUp) {
//         await createUserWithEmailAndPassword(auth, email, password);
//         toast.success('Sign-up successful!');
//       } else {
//         await signInWithEmailAndPassword(auth, email, password);
//         toast.success('Login successful!');
//       }
//       // Clear fields after successful auth
//       setEmail('');
//       setPassword('');
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       await signInWithPopup(auth, provider);
//       toast.success('Google sign-in successful!');
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xs">
//         <h2 className="text-2xl font-bold text-center mb-4">{isSignUp ? 'Sign Up' : 'Login'}</h2>
//         <form onSubmit={handleAuth}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="block border border-gray-300 rounded w-full py-2 px-3 mb-3"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="block border border-gray-300 rounded w-full py-2 px-3 mb-3"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
//           >
//             {isSignUp ? 'Sign Up' : 'Login'}
//           </button>
//         </form>
//         <p className="text-center mt-4">
//           {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
//           <button
//             onClick={() => setIsSignUp(!isSignUp)}
//             className="text-blue-500 underline"
//           >
//             {isSignUp ? 'Login' : 'Sign Up'}
//           </button>
//         </p>
//         <div className="flex items-center justify-center mt-4">
//           <button
//             onClick={handleGoogleSignIn}
//             className="flex items-center justify-center bg-white border border-gray-300 rounded shadow px-4 py-2"
//           >
//             <svg
//               className="w-6 h-6 mr-2"
//               aria-hidden="true"
//               focusable="false"
//               data-prefix="fab"
//               data-icon="google"
//               role="img"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 488 512"
//             >
//               <path
//                 fill="currentColor"
//                 d="M488 261.8c0-15.5-1.4-30.3-4-44.5H250v89.8h135.7c-5.9 31.6-23.6 58.3-50.2 76l81.5 63.7c47.6-44 75-108.9 75-185.5z"
//               ></path>
//               <path
//                 fill="currentColor"
//                 d="M250 472c64.6 0 118.7-21.5 158.2-58.1l-81.5-63.7c-22.3 15-50.5 24-76.7 24-59.3 0-109.3-39.5-127.7-92.6H35.6C67.5 434.2 156.6 472 250 472z"
//               ></path>
//               <path
//                 fill="currentColor"
//                 d="M122.3 289.4c-7.4-21.7-11.6-45.5-11.6-70.4s4.2-48.7 11.6-70.4c-43.3-34.4-72.3-86.6-72.3-148.1C23.5 3 0 25.7 0 53.8c0 47.9 12.8 93.4 35.6 132.7 21.3 35.6 52.3 65.3 89.5 87.7l5.7-24.8z"
//               ></path>
//             </svg>
//             Sign in with Google
//           </button>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default LoginSignUp;
