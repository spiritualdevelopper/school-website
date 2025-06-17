import React, { useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const AddNotice = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handlePost = async () => {
    if (!title.trim() || !description.trim()) return;

    try {
      await addDoc(collection(db, 'notices'), {
        title: title.trim(),
        description: description.trim(),
        postedAt: serverTimestamp()
      });
      alert("Notice posted!");
      setTitle('');
      setDescription('');
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-purple-700">📝 Post New Notice</h2>
      
      <input
        type="text"
        className="w-full border px-3 py-2 mb-3 rounded"
        placeholder="Notice Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        rows="4"
        className="w-full border px-3 py-2 mb-4 rounded"
        placeholder="Notice Description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <button
        onClick={handlePost}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full"
      >
        Post Notice
      </button>
    </div>
  );
};

export default AddNotice;
