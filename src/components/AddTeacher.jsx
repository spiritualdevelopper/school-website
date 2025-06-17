import React, { useState } from 'react';
import { db } from '../firebase'; // make sure this path is correct
import { collection, addDoc } from 'firebase/firestore';
import uploadToCloudinary from '../utils/uploadToCloudinary'; // default import (no curly braces)

const AddTeacher = () => {
  const [teacher, setTeacher] = useState({
    name: '',
    designation: '',
    imageFile: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imageFile" && files.length > 0) {
      setTeacher((prev) => ({
        ...prev,
        imageFile: files[0],
      }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setTeacher((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teacher.imageFile) {
      setStatus("Please select an image.");
      return;
    }

    setLoading(true);
    setStatus("Uploading image...");

    try {
      const imageUrl = await uploadToCloudinary(teacher.imageFile);

      await addDoc(collection(db, 'teachers'), {
        name: teacher.name,
        designation: teacher.designation,
        imageUrl,
        createdAt: new Date(),
      });

      setStatus("✅ Teacher profile added successfully!");
      setTeacher({ name: '', designation: '', imageFile: null });
      setPreview(null);
    } catch (error) {
      console.error(error);
      setStatus("❌ Failed to upload. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow-lg rounded bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">Add Teacher</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={teacher.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="designation"
          value={teacher.designation}
          onChange={handleChange}
          placeholder="Designation"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="file"
          name="imageFile"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
          required
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="h-32 w-32 object-cover rounded mx-auto border"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Uploading...' : 'Add Teacher'}
        </button>
      </form>

      {status && (
        <p className="mt-4 text-center text-sm text-gray-700">{status}</p>
      )}
    </div>
  );
};

export default AddTeacher;
