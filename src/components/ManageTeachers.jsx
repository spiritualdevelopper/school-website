import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import uploadToCloudinary from '../utils/uploadToCloudinary';


const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    designation: '',
    imageFile: null,
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    const snapshot = await getDocs(collection(db, 'teachers'));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTeachers(data);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this teacher?");
    if (!confirm) return;

    await deleteDoc(doc(db, 'teachers', id));
    fetchTeachers();
  };

  const handleEditClick = (teacher) => {
    setEditingTeacher(teacher);
    setEditData({
      name: teacher.name || '',
      designation: teacher.designation || '',
      imageFile: null,
    });
  };

  const handleUpdate = async () => {
    const updatedData = {
      name: editData.name,
      designation: editData.designation,
    };

    if (editData.imageFile) {
      const imageUrl = await uploadToCloudinary(editData.imageFile);
      updatedData.imageUrl = imageUrl;
    }

    await updateDoc(doc(db, 'teachers', editingTeacher.id), updatedData);
    setEditingTeacher(null);
    fetchTeachers();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Teachers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="p-4 border rounded shadow-md text-center bg-white">
            {teacher.imageUrl ? (
              <img
                src={teacher.imageUrl}
                alt={teacher.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-2"
              />
            ) : (
              <div className="w-24 h-24 mx-auto rounded-full bg-gray-300 mb-2" />
            )}
            <h3 className="text-lg font-bold">{teacher.name}</h3>
            <p className="text-gray-600">{teacher.designation}</p>

            <div className="flex justify-center gap-4 mt-4">
              <button
                className="text-blue-600 font-medium hover:underline"
                onClick={() => handleEditClick(teacher)}
              >
                Edit
              </button>
              <button
                className="text-red-600 font-medium hover:underline"
                onClick={() => handleDelete(teacher.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4">Edit Teacher</h3>

            <input
              type="text"
              placeholder="Name"
              value={editData.name}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full border px-3 py-2 mb-3 rounded"
            />

            <input
              type="text"
              placeholder="Designation"
              value={editData.designation}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  designation: e.target.value,
                }))
              }
              className="w-full border px-3 py-2 mb-3 rounded"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  imageFile: e.target.files[0],
                }))
              }
              className="w-full mb-3"
            />

            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-400 text-white px-3 py-1 rounded"
                onClick={() => setEditingTeacher(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-3 py-1 rounded"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTeachers;
