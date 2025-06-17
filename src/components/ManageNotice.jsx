import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const ManageNotice = () => {
  const [notices, setNotices] = useState([]);

  const fetchNotices = async () => {
    const snapshot = await getDocs(collection(db, 'notices'));
    setNotices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      await deleteDoc(doc(db, 'notices', id));
      fetchNotices();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Notices</h2>
      {notices.map(notice => (
        <div key={notice.id} className="border p-4 rounded mb-4">
          <p className="font-semibold">{notice.title}</p>
          <p>{notice.description}</p>
          <button
            onClick={() => handleDelete(notice.id)}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageNotice;
