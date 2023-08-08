import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = ({ isLoggedIn }) => {
  return (
    <main className='vh-100 d-flex flex-column'>
      <Navbar isLoggedIn={isLoggedIn} />
      <section className='container flex-grow-1 d-flex flex-column justify-content-center overflow-scroll'>
        <Outlet />
      </section>
      <Footer />
    </main>
  );
};

export default Layout;
