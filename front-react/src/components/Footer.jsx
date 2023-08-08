import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className='w-100 text-center bg-dark text-white p-3 align-self-end'>
      Created By Aman Kumar &copy;{year}
    </div>
  );
};

export default Footer;
