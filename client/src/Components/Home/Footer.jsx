import React from 'react';

const Footer = () => {
  return (
    <footer className=" border-t-2 border-green-500 py-8">
      <div className=" text-center text-lg">
        <p>&copy; {new Date().getFullYear()} NestFinder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
