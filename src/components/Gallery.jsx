import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setImages(snapshot.docs.map(doc => doc.data().imageUrl));
    };

    fetchGallery();
  }, []);

  return (
    <div className="py-10 bg-white text-center">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {images.map((url, index) => (
          <img key={index} src={url} alt="gallery" className="rounded-lg shadow" />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
