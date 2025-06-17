import React, { useState } from 'react';
import AddEvent from '../components/AddEvent';
import ManageEvent from '../components/ManageEvent';
import AddGalleryImage from '../components/AddGalleryImage';
import ManageGallery from '../components/ManageGallery';
import AddNotice from '../components/AddNotice';
import ManageNotice from '../components/ManageNotice';
import AddTeacher from '../components/AddTeacher';
import ManageTeachers from '../components/ManageTeachers';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('events');

  const renderContent = () => {
    switch (activeTab) {
      case 'events':
        return (
          <>
            <AddEvent />
            <div className="mt-6">
              <ManageEvent />
            </div>
          </>
        );
      case 'gallery':
        return (
          <>
            <AddGalleryImage />
            <div className="mt-6">
              <ManageGallery />
            </div>
          </>
        );
      case 'notices':
        return (
          <>
            <AddNotice />
            <div className="mt-6">
              <ManageNotice />
            </div>
          </>
        );
      case 'teachers':
        return (
          <>
            <AddTeacher />
            <div className="mt-6">
              <ManageTeachers />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const tabs = [
    { key: 'events', label: 'Events' },
    { key: 'gallery', label: 'Gallery' },
    { key: 'notices', label: 'Notices' },
    { key: 'teachers', label: 'Teachers' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-6 py-2 rounded-full font-semibold transition duration-300 shadow-sm ${
              activeTab === key
                ? 'bg-blue-600 text-white scale-105'
                : 'bg-white text-gray-700 hover:bg-blue-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Section Content */}
      <div className="max-w-5xl mx-auto">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
