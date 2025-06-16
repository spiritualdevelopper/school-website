import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Teachers from './components/Teachers';
import Gallery from './components/Gallery';
import Events from './components/Events';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import 'react-datepicker/dist/react-datepicker.css';

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-20"> {/* offset for sticky navbar */}
        <section id="hero">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="features">
          <Features />
        </section>

        <section id="teachers">
          <Teachers />
        </section>

        <section id="gallery">
          <Gallery />
        </section>

        <section id="events">
          <Events />
        </section>

        <section id="contact">
          <Contact />
        </section>

        <Footer />
      </div>
    </>
  );
}

export default App;
