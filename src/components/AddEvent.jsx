import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { v4 as uuidv4 } from 'uuid';

const AddEvent = ({ onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return alert('All fields are required!');

    const newEvent = {
      id: uuidv4(),
      title,
      date: date.toDateString(),
      description,
    };

    onAddEvent(newEvent);
    setTitle('');
    setDescription('');
    setDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Event</h2>
      <div className="mb-4">
        <label className="block font-medium mb-1">Event Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
          placeholder="Enter event title"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">Date</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">Description</label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
          placeholder="Event details..."
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 w-full"
      >
        Add Event
      </button>
    </form>
  );
};

export default AddEvent;
