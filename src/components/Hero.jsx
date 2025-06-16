import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-green-400 text-white py-20 px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to MPPS Velmagudem</h1>
      <p className="text-xl md:text-2xl mb-6">A place of learning, discipline, and growth.</p>
      <a
        href="#about"
        className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition duration-300"
      >
        Learn More
      </a>
    </section>
  );
};

export default Hero;
