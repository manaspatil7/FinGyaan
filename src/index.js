// index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Change this import
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './pages/Theme'; // Custom theme
import './index.css'; // Import your Tailwind CSS file


const root = ReactDOM.createRoot(document.getElementById('root')); // Create root

root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);










// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

