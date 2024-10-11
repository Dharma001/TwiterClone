import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarLinkProps {
  to: string;
  activeIcon: JSX.Element;
  inactiveIcon: JSX.Element;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, activeIcon, inactiveIcon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li>
      <Link to={to} className='flex items-center'>
        <span className='hover:bg-zinc-900 px-4 py-2 rounded-full hover:bg-opacity-90 flex gap-2'>
          {isActive ? activeIcon : inactiveIcon}
          <span className={`ml-2 text-[18px] lg:text-[21px] ${isActive ? 'font-semibold' : 'font-normal'}`}>{label}</span>
        </span>
      </Link>
    </li>
  );
};

export default SidebarLink;
