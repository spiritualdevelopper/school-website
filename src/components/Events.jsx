import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setEvents(snapshot.docs.map(doc => doc.data()));
    };

    fetchEvents();
  }, []);

  return (
    <div className="py-10 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-6 text-green-600">Upcoming Events</h2>
      <ul className="space-y-4 max-w-xl mx-auto text-left">
        {events.map((event, idx) => (
          <li key={idx} className="p-4 bg-white rounded shadow">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-gray-500">Date: {event.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
