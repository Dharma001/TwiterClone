import React from 'react';
import SidebarLink from '../specific/SidebarLink';

const Sidebar: React.FC = () => {
  return (
    <aside className='w-full h-full p-4 space-y-4 overflow-y-auto'>
      <div className='flex px-4 items-center'>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-7 h-7 lg:w-[31px] lg:h-[31px] text-white"
        >
          <g>
            <path
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              fill="currentColor"
            />
          </g>
        </svg>
      </div>
      <nav>
        <ul className='text-white space-y-2'>
          <SidebarLink
            to="/"
            label="Home"
            activeIcon={
              <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24"><rect width="24" height="24" fill="none" /><path fill="currentColor" d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z" /></svg>
            }
            inactiveIcon={
              <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24"><rect width="24" height="24" fill="none" /><path fill="currentColor" d="M6 19h3v-6h6v6h3v-9l-6-4.5L6 10zm-2 2V9l8-6l8 6v12h-7v-6h-2v6zm8-8.75" /></svg>
            }
          />
          <SidebarLink
            to="/explore"
            label="Explore"
            activeIcon={
              <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24"><rect width="24" height="24" fill="none" /><path fill="currentColor" fill-rule="evenodd" d="m16.622 15.172l4.244 4.244l-1.414 1.415l-4.24-4.24a7 7 0 1 1 1.41-1.42zM16 11a5 5 0 1 0-10 0a5 5 0 0 0 10 0" /></svg>
            }
            inactiveIcon={
              <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24"><rect width="24" height="24" fill="none" /><path fill="currentColor" fill-rule="evenodd" d="m16.31 15.561l4.114 4.115l-.848.848l-4.123-4.123a7 7 0 1 1 .857-.84M16.8 11a5.8 5.8 0 1 0-11.6 0a5.8 5.8 0 0 0 11.6 0" /></svg>
            }
          />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
