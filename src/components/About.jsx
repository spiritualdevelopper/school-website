import React from 'react';
import { motion } from 'framer-motion'; // ✅ Import motion

const About = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}         // ✅ Start invisible & slightly down
      whileInView={{ opacity: 1, y: 0 }}      // ✅ Animate to visible & in position
      transition={{ duration: 1 }}            // ✅ Smooth animation
      viewport={{ once: true }}               // ✅ Animate only first time in view
      className="bg-white py-16 px-4 md:px-16 text-gray-800"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 border-b-4 border-blue-500 inline-block pb-2">
          About MPPS Velmagudem
        </h2>
        <p className="text-lg leading-relaxed mt-4">
          MPPS Velmagudem is a government-funded school dedicated to empowering rural students
          through quality education. Our mission is to provide a nurturing environment where
          students thrive academically and emotionally.
        </p>
        <p className="text-lg leading-relaxed mt-6">
          Established with a vision of inclusive growth, the school serves as a beacon of
          opportunity in the region. We believe every child deserves the best education,
          regardless of background.
        </p>
      </div>
    </motion.section>
  );
};

export default About;
