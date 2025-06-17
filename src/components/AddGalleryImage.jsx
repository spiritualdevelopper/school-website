import React, { useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dyq7n2zzm/image/upload";
const UPLOAD_PRESET = "karthik";

const AddGalleryImage = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!image) return alert("Please choose an image");

    setUploading(true);
    try {
      // Prepare form data for Cloudinary upload
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', UPLOAD_PRESET);

      // Upload image to Cloudinary
      const res = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Cloudinary upload failed: ${res.statusText}`);
      }

      const data = await res.json();
      const imageUrl = data.secure_url;
      if (!imageUrl) throw new Error('No image URL returned from Cloudinary');

      // Save image URL to Firestore
      await addDoc(collection(db, 'gallery'), {
        imageUrl,
        createdAt: serverTimestamp(),
      });

      alert("Image uploaded successfully");
      setImage(null);
    } catch (err) {
      alert("Upload failed: " + err.message);
    }
    setUploading(false);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Upload Gallery Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        disabled={uploading}
      />
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default AddGalleryImage;
