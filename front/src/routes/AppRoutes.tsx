import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TwitterAuth from '../pages/TwitterAuth'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TwitterAuth />} />
    </Routes>
  );
};

export default AppRoutes;
