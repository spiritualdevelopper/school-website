import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { format } from 'date-fns';

const Notices = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      const q = query(collection(db, 'notices'), orderBy('postedAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotices(data);
    };

    fetchNotices();
  }, []);

  return (
    <section className="py-8 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-red-700 mb-6">🚨 Important Notices</h2>

      <div
        className={`grid gap-5 justify-center ${
          notices.length === 1
            ? 'grid-cols-1'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="bg-red-100 border-l-4 border-red-600 text-red-900 p-4 rounded-md shadow w-full max-w-sm"
          >
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg font-semibold">{notice.title || 'Untitled'}</h3>
              <span className="text-xs text-red-700">
                {notice.postedAt?.toDate
                  ? format(notice.postedAt.toDate(), 'PPP p')
                  : 'Unknown date'}
              </span>
            </div>
            <p className="text-sm">{notice.description || 'No description provided.'}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Notices;
