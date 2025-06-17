import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [uploading, setUploading] = useState(false);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    async function fetchProfile() {
      setLoading(true);
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setProfile(data);
        setName(data.name);
        setRole(data.role);
      }
      setLoading(false);
    }

    fetchProfile();
  }, [user]);

  async function handleSave() {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      name,
      role,
    });
    alert('Profile updated!');
  }

  async function handleImageUpload(e) {
    if (!user) return;
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `profile_pics/${user.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      // Update profile picture URL in Firestore
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { profilePic: url });

      // Update local state with cache-busting param
      setProfile((prev) => ({ ...prev, profilePic: url }));
      alert('Profile picture updated!');
    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Failed to upload image');
    }
    setUploading(false);
  }

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>Please log in to view profile.</p>;

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>

      <div className="mb-4">
        {profile?.profilePic ? (
          <img
            src={profile.profilePic + `?t=${Date.now()}`} // cache-busting param here
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            No Photo
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
          className="mt-2"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Email:</label>
        <p>{profile?.email}</p>
      </div>

      <div className="mb-4">
        <label className="block font-medium">Role:</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
}

export default Profile;
