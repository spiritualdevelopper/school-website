import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const ManageEvent = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const snapshot = await getDocs(collection(db, 'events'));
    setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await deleteDoc(doc(db, 'events', id));
      fetchEvents(); // Refresh
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Events</h2>
      {events.map(event => (
        <div key={event.id} className="border p-4 rounded mb-4">
          <p className="font-semibold">{event.title}</p>
          <p>{event.date}</p>
          <button
            onClick={() => handleDelete(event.id)}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageEvent;
