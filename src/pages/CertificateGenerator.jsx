import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { auth, db } from '../firebase/firebase'; // Import your auth and db configuration
import { doc, getDoc } from 'firebase/firestore';
import jsPDF from 'jspdf';
import img from '../assets/cert.png'; // Ensure this path is correct

const CertificateGenerator = () => {
  const location = useLocation();
  const { title } = location.state || {}; // Get course title from location state
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid; // Get the logged-in user's UID
        try {
          const docRef = doc(db, "users", userId); // Fetch the user's document
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        console.log("No user is logged in.");
      }
    };

    fetchUserData();
  }, []);

  // Function to handle certificate generation and download
  const handleDownload = () => {
    if (!userData || !title) return; // Prevent downloading if userData or title is not available
    const doc = new jsPDF();

    // Add background image
    doc.addImage(img, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

    // Add course title and user's name
    doc.setFontSize(36);
    doc.setFont('Arial', 'normal');
    doc.text(`Certificate of Completion`, 105, 100, { align: 'center' }); // Title of the certificate
    doc.setFontSize(28);
    doc.text(userData.name, 105, 140, { align: 'center' }); // User's name
    doc.setFontSize(20);
    doc.text(`Completed the course: ${title}`, 105, 160, { align: 'center' }); // Course title

    // Save the PDF
    doc.save(`${userData.name}-Certificate.pdf`);
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div className="container mx-auto p-6 flex flex-col items-center bg-gradient-to-br from-blue-300 to-blue-600 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Course Completion Certificate</h1>
        {userData ? (
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Certificate Details</h2>
              <p className="text-lg text-gray-800 mb-2"><strong>Name:</strong> {userData.name}</p>
              <p className="text-lg text-gray-800 mb-4"><strong>Course:</strong> {title}</p> {/* Display course title */}
            </div>
            <button
              onClick={handleDownload}
              className="bg-green-500 text-white rounded-lg py-3 px-6 text-lg font-semibold hover:bg-green-600 transition duration-300"
            >
              Download Certificate
            </button>
          </div>
        ) : (
          <p className="text-lg text-gray-600">No user data available.</p>
        )}
      </div>
    </div>
  );
};

export default CertificateGenerator;
