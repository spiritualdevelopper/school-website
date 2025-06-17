// src/pages/HomePage.js
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center bg-blue-600 text-white px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to MPPS Velmagudem</h1>
        <p className="text-xl max-w-xl">
          Excellence in education, innovation, and community support.
        </p>
      </section>

      <section id="about" className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-4xl font-semibold mb-6 text-blue-600">About Us</h2>
        <p className="max-w-3xl text-gray-700">
          MPPS Velmagudem is a government funded educational institution dedicated to providing quality education to the community with a focus on innovation, inclusivity, and academic excellence.
        </p>
      </section>

      <section id="features" className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-4xl font-semibold mb-6 text-blue-600">Features</h2>
        <ul className="max-w-3xl text-gray-700 list-disc list-inside space-y-3">
          <li>Experienced and passionate faculty</li>
          <li>Modern classrooms and facilities</li>
          <li>Focus on holistic development</li>
          <li>Community engagement and support</li>
        </ul>
      </section>

      <section id="contact" className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-4xl font-semibold mb-6 text-blue-600">Contact Us</h2>
        <p className="max-w-3xl text-gray-700 mb-4">
          For admissions, queries or feedback, reach us at:
        </p>
        <p className="text-gray-700 font-semibold">Email: info@mppsv.com</p>
        <p className="text-gray-700 font-semibold">Phone: +91 98765 43210</p>
      </section>
    </div>
  );
};

export default HomePage;
