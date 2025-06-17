import React from 'react';
import { FaFacebook, FaYoutube } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-6 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Address */}
        <div data-aos="fade-up">
          <h2 className="text-xl font-semibold mb-2">📍 Address</h2>
          <p>MPPS Velmagudem,</p>
          <p>Velmagudem Village,</p>
          <p>Nalgonda District, Telangana – 508377</p>
        </div>

        {/* Socials */}
        <div data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-xl font-semibold mb-2">🔗 Social Media</h2>
          <div className="flex gap-4 mt-2 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook className="hover:text-blue-500" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube className="hover:text-red-500" />
            </a>
          </div>
        </div>

        {/* Map */}
        <div data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-xl font-semibold mb-2">🗺️ Location</h2>
          <iframe
            title="School Map"
            src="https://www.google.com/maps/embed?pb=..."
            width="100%"
            height="150"
            className="rounded-lg border-2 border-white"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="text-center mt-6 text-sm text-gray-400">
        © {new Date().getFullYear()} MPPS Velmagudem. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
