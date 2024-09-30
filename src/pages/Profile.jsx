import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase/firebase'; // Firebase setup
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { TextField, Button, IconButton, Box, Avatar, Typography } from '@mui/material';
import { FaUserCircle } from 'react-icons/fa';
import { CloudUploadOutlined } from '@mui/icons-material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // For image upload

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
  // Component to render interests as rounded rectangles
const renderInterests = () => {
    if (!profileData.interests) return null;
  
    // Check if interests is an array or a string
    const interestsArray = Array.isArray(profileData.interests)
      ? profileData.interests
      : profileData.interests.split(',').map((interest) => interest.trim());
  
    return (
      <div className="flex flex-wrap gap-2 mt-4">
        {interestsArray.map((interest, index) => (
          <div
            key={index}
            className="bg-blue-200 text-blue-800 font-semibold py-1 px-3 rounded-full shadow-md"
            style={{
              backgroundColor: getRandomColor(),
            }}
          >
            {interest}
          </div>
        ))}
      </div>
    );
  };
  
  // Function to generate random colors for interests
  const getRandomColor = () => {
    const colors = [
      '#FFDDC1',
      '#FFABAB',
      '#FFC3A0',
      '#FF677D',
      '#D4A5A5',
      '#392F5A',
      '#F7B7A3',
      '#FF9A9E',
      '#DCE35B',
      '#45AAB8',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex items-center justify-center">
      <div className="py-3 px-3 max-w-xl mx-auto"> {/* Centering the card with mx-auto */}
        <div className="relative px-8 py-10 w-full max-w-3xl bg-white shadow-lg sm:rounded-lg sm:px-12"> {/* Increased max-width */}
          <div className="max-w-xl mx-5"> {/* Keeping this for internal container width */}
            <div className="flex justify-center items-center mb-4 mx-24">
              {profileData.photoURL ? (
                <Avatar
                  src={profileData.photoURL}
                  alt="Profile"
                  sx={{ width: 120, height: 120 }}
                  className="shadow-md"
                />
              ) : (
                <FaUserCircle className="w-24 h-24 text-gray-500" />
              )}
            </div>
            <Typography variant="h4" className="text-center font-semibold text-gray-800 mb-6">
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
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  disabled
                />
                <TextField
                  fullWidth
                  label="Interests"
                  name="interests"
                  value={profileData.interests}
                  onChange={handleInputChange}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Goals"
                  name="goals"
                  value={profileData.goals}
                  onChange={handleInputChange}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Investment Amount"
                  name="investmentAmount"
                  value={profileData.investmentAmount}
                  onChange={handleInputChange}
                  variant="outlined"
                  type="number"
                />
                <TextField
                  fullWidth
                  label="Income"
                  name="income"
                  value={profileData.income}
                  onChange={handleInputChange}
                  variant="outlined"
                  type="number"
                />
                <TextField
                  fullWidth
                  label="Other Details"
                  name="otherDetails"
                  value={profileData.otherDetails}
                  onChange={handleInputChange}
                  variant="outlined"
                />

                {/* Profile Photo Upload */}
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
                      <CloudUploadOutlined />
                    </IconButton>
                    <span>Upload Profile Photo</span>
                  </label>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleSubmit();
                    handleProfilePhotoUpload();
                  }}
                >
                  Save Profile
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Name:</span>
                  <span>{profileData.name || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Email:</span>
                  <span>{profileData.email || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Interests: </span>
                  <span>{renderInterests() || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Goals:</span>
                  <span>{profileData.goals || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Investment Amount:</span>
                  <span>{profileData.investmentAmount || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Income:</span>
                  <span>{profileData.income || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Other Details:</span>
                  <span>{profileData.otherDetails || 'N/A'}</span>
                </div>
                <Button fullWidth variant="contained" color="primary" onClick={() => setEditMode(true)}>
                  Edit Profile
                </Button>
                <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
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
