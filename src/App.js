import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Teachers from './components/Teachers';
import Gallery from './components/Gallery';
import Notices from './components/Notices';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import Signup from './pages/Signup';
import Login from './pages/Login1';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import Profile from './components/Profile';
import MidDayMeals from './components/MidDayMeals';

import 'react-datepicker/dist/react-datepicker.css';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

async function createUserProfile(user) {
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      name: user.displayName || 'Anonymous',
      email: user.email,
      role: 'student',
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
        <section id="teachers"><Teachers /></section>
        <section id="notices"><Notices /></section>
        <section id="gallery"><Gallery /></section>
        <section id="features"><Features /></section>
        <section id="contact"><Contact /></section>

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
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/midday-meals"
          element={
            <div className="container mx-auto p-4 pt-24">
              <MidDayMeals />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
