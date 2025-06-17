// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Teachers from './components/Teachers';
import Gallery from './components/Gallery';
import Events from './components/Events';
import Notices from './components/Notices';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login1'; // Your login page
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import Profile from './components/Profile';

import 'react-datepicker/dist/react-datepicker.css';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';  // Make sure your firebase.js exports both auth and db
import { doc, getDoc, setDoc } from 'firebase/firestore';

async function createUserProfile(user) {
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      name: user.displayName || 'Anonymous',
      email: user.email,
      role: 'student',        // Default role, you can change or enhance this later
      profilePic: user.photoURL || null,
      createdAt: new Date()
    });
  }
}

function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await createUserProfile(currentUser);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <div className="pt-20">
        <section id="hero"><Hero /></section>
  <section id="about"><About /></section>
  <section id="features"><Features /></section>
  <section id="teachers"><Teachers /></section>
  <section id="gallery"><Gallery /></section>
  <section id="events"><Events /></section>    {/* Events before Contact */}
  <section id="contact"><Contact /></section>  {/* Contact after Events */}
  <section id="notices"><Notices /></section>

        {user && (
          <div className="text-center my-4">
            <button
              onClick={() => signOut(auth)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
}

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        {/* Admin dashboard protected route */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Optional: Add 404 route if needed */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
