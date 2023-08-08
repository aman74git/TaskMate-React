import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLogout } from '../hooks';

const Navbar = ({ isLoggedIn }) => {
  const logout = useLogout();

  const onLogout = async () => {
    try {
      await logout('current');
      console.log('logged out');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className='navbar navbar-expand bg-dark navbar-dark'>
      <div className='container'>
        <a className='navbar-brand' href='#'>
          TaskMate
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          {isLoggedIn ? (
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <NavLink className='nav-link' aria-current='page' to='/home'>
                  Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  aria-current='page'
                  onClick={onLogout}
                  role='button'
                >
                  Logout
                </a>
              </li>
            </ul>
          ) : (
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/login'>
                  Login
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/signup'>
                  SignUp
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
