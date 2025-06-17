import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

const Notices = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setNotices(snapshot.docs.map(doc => doc.data().message));
    };

    fetchNotices();
  }, []);

  return (
    <div className="py-10 bg-white text-center">
      <h2 className="text-3xl font-bold mb-6 text-purple-600">Notices</h2>
      <div className="max-w-2xl mx-auto text-left">
        {notices.map((msg, idx) => (
          <div key={idx} className="bg-gray-100 p-4 rounded mb-3 shadow">
            📢 {msg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notices;
