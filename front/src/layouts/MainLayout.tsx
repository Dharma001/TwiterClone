import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar'

const MainLayout: React.FC = () => {
  return (
    <div className="bg-black h-screen">
      <div className='mx-auto flex max-w-6xl lg:max-w-[69%] h-full'>
        <div className="w-[20%] lg:w-[21%] border-r border-gray-800">
          <Sidebar /> 
        </div>
      <main className='flex-1 w-[80%] lg:w-[69%] overflow-y-auto bg-white'>
        <Outlet />
      </main>
      </div>
    </div>
  );
};

export default MainLayout;
