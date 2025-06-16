import React from 'react';
import { motion } from 'framer-motion';

const teachers = [
  {
    name: 'Smt. Lakshmi Devi',
    subject: 'Mathematics',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Sri. Ramesh Goud',
    subject: 'Science',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Smt. Anitha Kumari',
    subject: 'Telugu',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Sri. Naresh Kumar',
    subject: 'English',
    image: 'https://via.placeholder.com/150',
  },
];

const Teachers = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="bg-gray-100 py-16 px-4 md:px-16 text-gray-800"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 border-b-4 border-blue-500 inline-block pb-2">
          Our Dedicated Teachers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          {teachers.map((teacher, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-24 h-24 rounded-full mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold">{teacher.name}</h3>
              <p className="text-blue-600">{teacher.subject}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Teachers;
