import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AddEvent from './AddEvent';

const Events = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Annual Day Celebration',
      date: 'March 10, 2025',
      description: 'Cultural programs and student performances.',
    },
  ]);

  const handleAddEvent = (event) => {
    setEvents([event, ...events]);
  };

  return (
    <motion.section
      id="events"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-100 py-12 px-4 md:px-12"
    >
      <AddEvent onAddEvent={handleAddEvent} />

      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Events & Achievements</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8 text-left">
          {events.map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-lg shadow-lg p-5"
            >
              <h3 className="text-lg font-bold text-blue-700">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.date}</p>
              <p className="mt-2">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Events;
