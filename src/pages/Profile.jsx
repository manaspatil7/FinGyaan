import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase/firebase'; // Firebase setup
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { TextField, Button, IconButton, Box, Avatar, Typography } from '@mui/material';
import { FaUserCircle } from 'react-icons/fa';
import { CloudUploadOutlined } from '@mui/icons-material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // For image upload
import { motion } from 'framer-motion'; // For animations

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    interests: '',
    goals: '',
    investmentAmount: '',
    income: '',
    otherDetails: '',
    photoURL: '',
  });

  const [editMode, setEditMode] = useState(false);
  const [newProfilePhoto, setNewProfilePhoto] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setProfileData(userDocSnap.data());
        } else {
          setProfileData({
            name: currentUser.displayName || '',
            email: currentUser.email || '',
            interests: '',
            goals: '',
            investmentAmount: '',
            income: '',
            otherDetails: '',
            photoURL: currentUser.photoURL || '',
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async () => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, profileData);
      setEditMode(false);
    }
  };

  const handleProfilePhotoUpload = async () => {
    if (newProfilePhoto && user) {
      const storageRef = ref(storage, `profilePhotos/${user.uid}`);
      await uploadBytes(storageRef, newProfilePhoto);
      const photoURL = await getDownloadURL(storageRef);
      setProfileData({ ...profileData, photoURL });

      // Save photoURL to Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { ...profileData, photoURL });
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      window.location.href = '/login';
    });
  };

  // Component to render interests as rounded rectangles
  const renderInterests = () => {
    if (!profileData.interests) return null;

    // Check if interests is an array or a string
    const interestsArray = Array.isArray(profileData.interests)
      ? profileData.interests
      : profileData.interests.split(',').map((interest) => interest.trim());

    return (
      <motion.div
        className="flex flex-wrap gap-2 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {interestsArray.map((interest, index) => (
          <motion.div
            key={index}
            className="py-1 px-3 rounded-full shadow-md"
            style={{
              backgroundColor: getRandomColor(),
              color: '#fff',
              fontWeight: 'bold',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {interest}
          </motion.div>
        ))}
      </motion.div>
    );
  };

  // Function to generate random colors for interests
  const getRandomColor = () => {
    const colors = [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#FF9A9E',
      '#45AAB8',
      '#92FE9D',
      '#FDCB6E',
      '#74EBD5',
      '#FF5F6D',
      '#FFC371',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-green-200 via-blue-300 to-purple-200 py-10 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="py-6 px-6 max-w-xl mx-auto rounded-lg shadow-lg bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg">
        <motion.div
          className="relative px-8 py-10 w-full max-w-3xl shadow-2xl sm:rounded-lg sm:px-12 bg-gradient-to-br from-indigo-900 to-gray-600 text-white"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-xl mx-5">
            <div className="flex justify-center items-center mb-4">
              {profileData.photoURL ? (
                <Avatar
                  src={profileData.photoURL}
                  alt="Profile"
                  sx={{ width: 120, height: 120 }}
                  className="shadow-lg border-4 border-white"
                />
              ) : (
                <FaUserCircle className="w-24 h-24 text-gray-500" />
              )}
            </div>
            <Typography variant="h4" className="text-center font-semibold mb-6 text-shadow-lg">
              Profile
            </Typography>

            {editMode ? (
              <form className="space-y-6">
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  disabled
                  sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                />
                <TextField
                  fullWidth
                  label="Interests"
                  name="interests"
                  value={profileData.interests}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                />
                <TextField
                  fullWidth
                  label="Goals"
                  name="goals"
                  value={profileData.goals}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                />
                <TextField
                  fullWidth
                  label="Investment Amount"
                  name="investmentAmount"
                  value={profileData.investmentAmount}
                  onChange={handleInputChange}
                  variant="outlined"
                  type="number"
                  sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                />
                <TextField
                  fullWidth
                  label="Income"
                  name="income"
                  value={profileData.income}
                  onChange={handleInputChange}
                  variant="outlined"
                  type="number"
                  sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                />
                <TextField
                  fullWidth
                  label="Other Details"
                  name="otherDetails"
                  value={profileData.otherDetails}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                />

                <Box className="flex items-center justify-center mt-4">
                  <input
                    accept="image/*"
                    id="profile-photo-upload"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => setNewProfilePhoto(e.target.files[0])}
                  />
                  <label htmlFor="profile-photo-upload">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <CloudUploadOutlined className="text-white" />
                    </IconButton>
                    <span>Upload Profile Photo</span>
                  </label>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ backgroundColor: '#00796b', borderRadius: '10px' }}
                  onClick={() => {
                    handleSubmit();
                    handleProfilePhotoUpload();
                  }}
                >
                  Save Profile
                </Button>
              </form>
            ) : (
              <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <div>
                  <Typography variant="h6" className="text-shadow-sm">
                    Name:
                  </Typography>
                  <Typography variant="body1" className="font-medium">
                    {profileData.name || 'N/A'}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" className="text-shadow-sm">
                    Email:
                  </Typography>
                  <Typography variant="body1" className="font-medium">
                    {profileData.email}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" className="text-shadow-sm">
                    Interests:
                  </Typography>
                  {renderInterests()}
                </div>
                <div>
                  <Typography variant="h6" className="text-shadow-sm">
                    Goals:
                  </Typography>
                  <Typography variant="body1" className="font-medium">
                    {profileData.goals || 'N/A'}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" className="text-shadow-sm">
                    Investment Amount:
                  </Typography>
                  <Typography variant="body1" className="font-medium">
                    {profileData.investmentAmount || 'N/A'}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" className="text-shadow-sm">
                    Income:
                  </Typography>
                  <Typography variant="body1" className="font-medium">
                    {profileData.income || 'N/A'}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" className="text-shadow-sm">
                    Other Details:
                  </Typography>
                  <Typography variant="body1" className="font-medium">
                    {profileData.otherDetails || 'N/A'}
                  </Typography>
                </div>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ backgroundColor: '#3f51b5', borderRadius: '10px' }}
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
        <Box mt={4}>
          <Button fullWidth variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </div>
    </motion.div>
  );
};

export default Profile;














// import React, { useState, useEffect } from 'react';
// import { auth, db, storage } from '../firebase/firebase'; // Firebase setup
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { TextField, Button, IconButton, Box, Avatar, Typography } from '@mui/material';
// import { FaUserCircle } from 'react-icons/fa';
// import { CloudUploadOutlined } from '@mui/icons-material';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // For image upload

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [profileData, setProfileData] = useState({
//     name: '',
//     email: '',
//     interests: '',
//     goals: '',
//     investmentAmount: '',
//     income: '',
//     otherDetails: '',
//     photoURL: '',
//   });

//   const [editMode, setEditMode] = useState(false);
//   const [newProfilePhoto, setNewProfilePhoto] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         const userDocRef = doc(db, 'users', currentUser.uid);
//         const userDocSnap = await getDoc(userDocRef);

//         if (userDocSnap.exists()) {
//           setProfileData(userDocSnap.data());
//         } else {
//           setProfileData({
//             name: currentUser.displayName || '',
//             email: currentUser.email || '',
//             interests: '',
//             goals: '',
//             investmentAmount: '',
//             income: '',
//             otherDetails: '',
//             photoURL: currentUser.photoURL || '',
//           });
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData({ ...profileData, [name]: value });
//   };

//   const handleSubmit = async () => {
//     if (user) {
//       const userDocRef = doc(db, 'users', user.uid);
//       await setDoc(userDocRef, profileData);
//       setEditMode(false);
//     }
//   };

//   const handleProfilePhotoUpload = async () => {
//     if (newProfilePhoto && user) {
//       const storageRef = ref(storage, `profilePhotos/${user.uid}`);
//       await uploadBytes(storageRef, newProfilePhoto);
//       const photoURL = await getDownloadURL(storageRef);
//       setProfileData({ ...profileData, photoURL });

//       // Save photoURL to Firestore
//       const userDocRef = doc(db, 'users', user.uid);
//       await setDoc(userDocRef, { ...profileData, photoURL });
//     }
//   };

//   const handleLogout = () => {
//     signOut(auth).then(() => {
//       window.location.href = '/login';
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-6 flex items-center justify-center">
//       <div className="py-3 px-3 max-w-xl mx-auto"> {/* Centering the card with mx-auto */}
//         <div className="relative px-8 py-10 w-full max-w-3xl bg-white shadow-lg sm:rounded-lg sm:px-12"> {/* Increased max-width */}
//           <div className="max-w-xl mx-5"> {/* Keeping this for internal container width */}
//             <div className="flex justify-center items-center mb-4 mx-24">
//               {profileData.photoURL ? (
//                 <Avatar
//                   src={profileData.photoURL}
//                   alt="Profile"
//                   sx={{ width: 120, height: 120 }}
//                   className="shadow-md"
//                 />
//               ) : (
//                 <FaUserCircle className="w-24 h-24 text-gray-500" />
//               )}
//             </div>
//             <Typography variant="h4" className="text-center font-semibold text-gray-800 mb-6">
//               Profile
//             </Typography>

//             {editMode ? (
//               <form className="space-y-6">
//                 <TextField
//                   fullWidth
//                   label="Name"
//                   name="name"
//                   value={profileData.name}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//                 <TextField
//                   fullWidth
//                   label="Email"
//                   name="email"
//                   value={profileData.email}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   disabled
//                 />
//                 <TextField
//                   fullWidth
//                   label="Interests"
//                   name="interests"
//                   value={profileData.interests}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//                 <TextField
//                   fullWidth
//                   label="Goals"
//                   name="goals"
//                   value={profileData.goals}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />
//                 <TextField
//                   fullWidth
//                   label="Investment Amount"
//                   name="investmentAmount"
//                   value={profileData.investmentAmount}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   type="number"
//                 />
//                 <TextField
//                   fullWidth
//                   label="Income"
//                   name="income"
//                   value={profileData.income}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                   type="number"
//                 />
//                 <TextField
//                   fullWidth
//                   label="Other Details"
//                   name="otherDetails"
//                   value={profileData.otherDetails}
//                   onChange={handleInputChange}
//                   variant="outlined"
//                 />

//                 {/* Profile Photo Upload */}
//                 <Box className="flex items-center justify-center mt-4">
//                   <input
//                     accept="image/*"
//                     id="profile-photo-upload"
//                     type="file"
//                     style={{ display: 'none' }}
//                     onChange={(e) => setNewProfilePhoto(e.target.files[0])}
//                   />
//                   <label htmlFor="profile-photo-upload">
//                     <IconButton color="primary" aria-label="upload picture" component="span">
//                       <CloudUploadOutlined />
//                     </IconButton>
//                     <span>Upload Profile Photo</span>
//                   </label>
//                 </Box>

//                 <Button
//                   fullWidth
//                   variant="contained"
//                   color="primary"
//                   onClick={() => {
//                     handleSubmit();
//                     handleProfilePhotoUpload();
//                   }}
//                 >
//                   Save Profile
//                 </Button>
//               </form>
//             ) : (
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span className="font-semibold">Name:</span>
//                   <span>{profileData.name || 'N/A'}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="font-semibold">Email:</span>
//                   <span>{profileData.email || 'N/A'}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="font-semibold">Interests:</span>
//                   <span>{profileData.interests || 'N/A'}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="font-semibold">Goals:</span>
//                   <span>{profileData.goals || 'N/A'}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="font-semibold">Investment Amount:</span>
//                   <span>{profileData.investmentAmount || 'N/A'}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="font-semibold">Income:</span>
//                   <span>{profileData.income || 'N/A'}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="font-semibold">Other Details:</span>
//                   <span>{profileData.otherDetails || 'N/A'}</span>
//                 </div>

//                 {/* Edit and Logout Buttons */}
//                 <div className="mt-4 space-y-3">
//                   <Button
//                     fullWidth
//                     variant="contained"
//                     color="secondary"
//                     onClick={() => setEditMode(true)}
//                   >
//                     Edit Profile
//                   </Button>
//                   <Button
//                     fullWidth
//                     variant="outlined"
//                     color="error"
//                     onClick={handleLogout}
//                   >
//                     Log Out
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
