import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isAdmin = user?.email === 'venkatsou18@gmail.com';

  const closeMenu = () => setMenuOpen(false);

  // Use scroll links only if on homepage
  const isHome = location.pathname === '/';

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-blue-600">MPPS Velmagudem</div>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          {isHome ? (
            <>
              <li>
                <ScrollLink to="hero" smooth duration={500} className="cursor-pointer hover:text-blue-500">
                  Home
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="about" smooth duration={500} className="cursor-pointer hover:text-blue-500">
                  About
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="features" smooth duration={500} className="cursor-pointer hover:text-blue-500">
                  Features
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="contact" smooth duration={500} className="cursor-pointer hover:text-blue-500">
                  Contact
                </ScrollLink>
              </li>
            </>
          ) : (
            <>
              {/* Use router links to home if not on homepage */}
              <li>
                <RouterLink to="/" className="hover:text-blue-500">
                  Home
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/#about" className="hover:text-blue-500">
                  About
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/#features" className="hover:text-blue-500">
                  Features
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/#contact" className="hover:text-blue-500">
                  Contact
                </RouterLink>
              </li>
            </>
          )}

          {user ? (
            <>
              {isAdmin && (
                <li>
                  <RouterLink to="/admin" className="hover:text-blue-500 font-semibold">
                    Dashboard
                  </RouterLink>
                </li>
              )}
              <li>
                <RouterLink to="/profile" className="hover:text-blue-500 font-semibold">
                  Profile
                </RouterLink>
              </li>
              <li>
                <button onClick={() => signOut(auth)} className="text-red-600 hover:underline">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <RouterLink to="/login" className="text-blue-600 hover:underline">
                  Login
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/signup" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  Sign Up
                </RouterLink>
              </li>
            </>
          )}
        </ul>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-white shadow-md px-6 py-4 space-y-4 text-gray-700 font-medium">
          {isHome ? (
            <>
              <li>
                <ScrollLink
                  to="hero"
                  smooth
                  duration={500}
                  className="block cursor-pointer hover:text-blue-500"
                  onClick={closeMenu}
                >
                  Home
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="about"
                  smooth
                  duration={500}
                  className="block cursor-pointer hover:text-blue-500"
                  onClick={closeMenu}
                >
                  About
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="features"
                  smooth
                  duration={500}
                  className="block cursor-pointer hover:text-blue-500"
                  onClick={closeMenu}
                >
                  Features
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="contact"
                  smooth
                  duration={500}
                  className="block cursor-pointer hover:text-blue-500"
                  onClick={closeMenu}
                >
                  Contact
                </ScrollLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <RouterLink to="/" className="block hover:text-blue-500" onClick={closeMenu}>
                  Home
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/#about" className="block hover:text-blue-500" onClick={closeMenu}>
                  About
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/#features" className="block hover:text-blue-500" onClick={closeMenu}>
                  Features
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/#contact" className="block hover:text-blue-500" onClick={closeMenu}>
                  Contact
                </RouterLink>
              </li>
            </>
          )}

          {user ? (
            <>
              {isAdmin && (
                <li>
                  <RouterLink to="/admin" className="block hover:text-blue-500 font-semibold" onClick={closeMenu}>
                    Dashboard
                  </RouterLink>
                </li>
              )}
              <li>
                <RouterLink to="/profile" className="block hover:text-blue-500 font-semibold" onClick={closeMenu}>
                  Profile
                </RouterLink>
              </li>
              <li>
                <button
                  onClick={() => {
                    signOut(auth);
                    closeMenu();
                  }}
                  className="block text-red-600 hover:underline"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <RouterLink to="/login" className="block text-blue-600 hover:underline" onClick={closeMenu}>
                  Login
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/signup"
                  className="block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  onClick={closeMenu}
                >
                  Sign Up
                </RouterLink>
              </li>
            </>
          )}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
