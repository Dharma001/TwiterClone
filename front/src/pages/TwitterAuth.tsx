import React from 'react';

const TwitterAuth: React.FC = () => {
  return(
    <div className="bg-black h-screen flex">
        <div className="border w-1/2 flex items-center justify-center">
        <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-96 w-96 text-white"
      >
        <g>
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            fill="currentColor"
          />
        </g>
      </svg>
        </div>
        <div className="w-1/2 flex items-center justify-start">
        <div className="border h-1/2">
            <div className="grid gap-8">
              <h1 className='text-white font-bold text-6xl lg:text-7xl'>Happening now</h1>
              <h3 className='text-white font-bold text-3xl'>join today.</h3>
            </div>
            <div className="mt-5 space-y-2">
            <button className='flex items-center gap-[3.5px] bg-white px-[75px] py-[10px] text-gray-700 text-[14px] font-bold rounded-3xl'>
                <img 
                  alt="" 
                  className='w-[20px] h-[20px]' 
                  src="./assets/icons/google-icon.png"
                />
                Sing up with Google
              </button>
              <button className='flex items-center gap-[3.5px] bg-white px-[75px] py-[10px] text-gray-700 text-[14px] font-bold rounded-3xl'>
                <img 
                  alt="" 
                  className='w-[20px] h-[20px]' 
                  src="./assets/icons/apple-icon.png"
                />
                Sing up with Google
              </button>
            </div>
            <div className="w-[58%] flex items-center gap-[1px] justify-center my-[4.5px]">
              <div className="w-1/2 border-b border-gray-800 h-1"></div>
              <p className='text-gray-300 font-medium text-[14px]'>or</p>
              <div className="w-1/2 border-b border-gray-800 h-1"></div>
            </div>
            <button className='flex items-center text-white bg-[#1D9BF0] px-[108px] py-[10px] text-[14px] font-semibold rounded-3xl'>
              Create account
              </button>

      </div>
      </div>
        <div className="bg-gray-500 absolute bottom-0">
      <p>hello</p>
    </div>
      </div>
  );
};

export default TwitterAuth;