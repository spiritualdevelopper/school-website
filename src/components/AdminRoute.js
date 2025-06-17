import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const AdminRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading user data...
      </div>
    );
  }

  if (!user || user.email !== 'venkatsou18@gmail.com') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
