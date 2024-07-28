import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <a href="/" className="font-bold text-lg">3legant.</a>
          <p className="text-sm mt-2">Gift & Decoration Store</p>
        </div>
        <div className="flex space-x-6">
          <a href="/" className="hover:underline">Home</a>
          <a href="/" className="hover:underline">Shop</a>
          <a href="/" className="hover:underline">Product</a>
          <a href="/" className="hover:underline">Blog</a>
          <a href="/" className="hover:underline">Contact Us</a>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm">Copyright © 2023 3legant. All rights reserved</p>
          <div className="flex space-x-4 mt-2">
            <a href="/" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
