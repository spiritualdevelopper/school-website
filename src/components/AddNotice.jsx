import React, { useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const AddNotice = () => {
  const [notice, setNotice] = useState('');

  const handlePost = async () => {
    if (!notice.trim()) return;

    try {
      await addDoc(collection(db, 'notices'), {
        message: notice,
        createdAt: serverTimestamp()
      });
      alert("Notice posted!");
      setNotice('');
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Post Notice</h2>
      <textarea
        rows="4"
        className="w-full border p-2 mb-4 rounded"
        placeholder="Type your notice..."
        value={notice}
        onChange={(e) => setNotice(e.target.value)}
      />
      <button
        onClick={handlePost}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Post Notice
      </button>
    </div>
  );
};

export default AddNotice;
