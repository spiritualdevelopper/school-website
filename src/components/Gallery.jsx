import React from 'react';
import { motion } from 'framer-motion';

const images = [
  'https://source.unsplash.com/400x300/?school,classroom',
  'https://source.unsplash.com/400x300/?students,education',
  'https://source.unsplash.com/400x300/?library,books',
  'https://source.unsplash.com/400x300/?science,laboratory',
  'https://source.unsplash.com/400x300/?sports,school',
  'https://source.unsplash.com/400x300/?computer,class',
];

const Gallery = () => {
  return (
    <motion.section
      id="gallery"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="py-16 px-4 md:px-16 bg-white text-gray-800"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 border-b-4 border-yellow-500 inline-block pb-2">
          School Gallery
        </h2>
        <p className="mb-12 text-gray-600">
          Glimpses of our infrastructure, events, and joyful moments.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((url, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <img
                src={url}
                alt={`Gallery ${index}`}
                className="w-full h-64 object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Gallery;
