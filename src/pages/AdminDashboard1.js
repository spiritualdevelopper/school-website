// src/pages/AdminDashboard.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { user, role } = useAuth();

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome, Admin 👋</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {role}</p>
    </div>
  );
};

export default AdminDashboard;
