import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TwitterAuth from '../pages/TwitterAuth'
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TwitterAuth />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
