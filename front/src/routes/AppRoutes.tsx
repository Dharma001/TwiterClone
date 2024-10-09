import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TwitterAuth from '../pages/TwitterAuth'
import Login from '../pages/Auth/Login';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TwitterAuth />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
