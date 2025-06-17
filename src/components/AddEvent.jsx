import React, { useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const AddEvent = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleAddEvent = async () => {
    if (!title || !date) return alert("Fill all fields");

    try {
      await addDoc(collection(db, 'events'), {
        title,
        date,
        createdAt: serverTimestamp()
      });
      alert("Event added!");
      setTitle('');
      setDate('');
    } catch (err) {
      alert("Failed: " + err.message);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add Event</h2>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border mb-3 rounded"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border mb-3 rounded"
      />
      <button
        onClick={handleAddEvent}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Event
      </button>
    </div>
  );
};

export default AddEvent;
