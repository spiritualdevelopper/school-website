import React, { useState } from 'react';
import AddEvent from '../components/AddEvent';
import AddGalleryImage from '../components/AddGalleryImage';
import AddNotice from '../components/AddNotice';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('event');
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Loading user data...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">User not found. Please log in.</p>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'event':
        return <AddEvent />;
      case 'gallery':
        return <AddGalleryImage />;
      case 'notice':
        return <AddNotice />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Welcome Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Welcome, Admin 👋</h1>
        <p className="text-gray-700">Email: {user.email}</p>
        <p className="text-gray-700">Role: Admin</p>
        <button
          onClick={() => signOut(auth)}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center mb-6 gap-4">
        {['event', 'gallery', 'notice'].map((tab) => {
          const label =
            tab === 'event' ? 'Add Event' :
            tab === 'gallery' ? 'Add Gallery' :
            'Post Notice';
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition
                ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              aria-pressed={isActive}
              aria-label={label}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto min-h-[300px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
