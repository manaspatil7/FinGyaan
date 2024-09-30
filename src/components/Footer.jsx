import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Logo and About */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-white mb-2">BrandName</h3>
            <p>
              Empowering individuals with financial literacy to make smarter financial decisions.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-white">Home</a></li>
              <li><a href="#courses" className="hover:text-white">Courses</a></li>
              <li><a href="#portfolio" className="hover:text-white">Portfolio</a></li>
              <li><a href="newspage" className="hover:text-white">News</a></li>
              <li><a href="#events" className="hover:text-white">Events</a></li>
              <li><a href="#contact" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Contact Us</h3>
            <p className="mb-1">123 Finance Street, Mumbai, Maharashtra 400001 India</p>
            <p className="mb-1">Email: info@financeplatform.com</p>
            <p>Phone: +91 7710063206</p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.35v21.3C0 23.4.6 24 1.325 24h11.475V14.7h-3.15v-3.6h3.15V8.4c0-3.15 1.8-4.95 4.875-4.95 1.4 0 2.85.225 2.85.225v3.15h-1.725c-1.65 0-2.175.975-2.175 2.1v2.325h3.675l-.6 3.6h-3.075V24h6.075c.75 0 1.35-.6 1.35-1.35v-21.3C24 .6 23.4 0 22.675 0z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10.015 10.015 0 01-2.825.775 4.925 4.925 0 002.163-2.724 10.091 10.091 0 01-3.127 1.184 4.917 4.917 0 00-8.384 4.482A13.927 13.927 0 011.67 3.149a4.919 4.919 0 001.523 6.564A4.872 4.872 0 01.964 9.29v.061a4.916 4.916 0 003.95 4.827 4.908 4.908 0 01-2.212.084 4.922 4.922 0 004.604 3.417A9.868 9.868 0 010 21.543 13.952 13.952 0 007.548 24c9.142 0 14.307-7.721 14.307-14.426 0-.22 0-.443-.015-.663A10.115 10.115 0 0024 4.59l-.047-.02z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.998 19.998H16.81v-5.377c0-1.283-.021-2.93-1.788-2.93-1.792 0-2.066 1.398-2.066 2.843v5.464h-3.188V9.73h3.062v1.393h.045c.427-.81 1.468-1.664 3.021-1.664 3.23 0 3.828 2.122 3.828 4.885v5.654zM5.332 8.336a1.85 1.85 0 11.001-3.701 1.85 1.85 0 01-.001 3.701zm-1.584 11.662H6.915V9.73H3.748v10.268zM22.223 0H1.77C.79 0 0 .79 0 1.77v20.457C0 23.21.79 24 1.77 24h20.453C23.21 24 24 23.21 24 22.227V1.77C24 .79 23.21 0 22.223 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} BrandName. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
