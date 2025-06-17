import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const snapshot = await getDocs(collection(db, 'teachers'));
      setTeachers(snapshot.docs.map(doc => doc.data()));
    };
    fetch();
  }, []);

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Our Teachers</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teachers.map((teacher, index) => (
          <div key={index} className="bg-white p-4 shadow rounded text-center">
            <img
              src={teacher.imageUrl} // ✅ changed from photoURL to imageUrl
              alt={teacher.name}
              className="h-40 w-40 object-cover mx-auto rounded-full mb-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150?text=No+Image';
              }}
            />
            <h2 className="text-xl font-semibold">{teacher.name}</h2>
            <p className="text-gray-600">{teacher.designation}</p>
            {teacher.description && <p className="text-sm text-gray-500 mt-2">{teacher.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Teachers;
