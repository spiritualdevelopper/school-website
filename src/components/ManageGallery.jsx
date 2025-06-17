import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const ManageGallery = () => {
  const [images, setImages] = useState([]);

  const fetchGallery = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'gallery'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setImages(data);
    } catch (err) {
      console.error('Error fetching gallery:', err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this image from gallery?')) {
      try {
        await deleteDoc(doc(db, 'gallery', id));
        fetchGallery();
      } catch (err) {
        console.error('Error deleting image:', err);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map(img => (
          <div key={img.id} className="border rounded p-2 shadow">
            <img
              src={img.imageUrl} // 👈 Use correct field here
              alt="Gallery"
              className="w-full h-40 object-cover rounded"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150';
              }}
            />
            <button
              onClick={() => handleDelete(img.id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded w-full"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageGallery;
