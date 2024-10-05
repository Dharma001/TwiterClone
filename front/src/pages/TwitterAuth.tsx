import React from 'react';

const TwitterAuth: React.FC = () => {
  return(
    <>
    <div className="bg-black h-screen flex flex-col gap-12 lg:flex-row p-8 lg:p-0">
        <div className=" w-full lg:w-[55%] flex items-center justify-start lg:justify-center">
        <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="w-12 h-12 -mt-8 -mr-2 lg:h-[24rem] lg:w-[24rem] text-white"
      >
        <g>
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            fill="currentColor"
          />
        </g>
      </svg>
        </div>
        <div className="w-full lg:w-[45%] flex items-center justify-center lg:justify-start">
        <div className="flex items-center justify-center flex-col lg:items-start lg:h-1/2">
            <div className="grid gap-12 p-3 lg:p-0">
              <h1 className='text-white font-bold text-5xl lg:text-7xl'>Happening now</h1>
              <h3 className='text-white font-bold text-xl lg:text-4xl'>join today.</h3>
            </div>
            <div className=" mt-2 lg:mt-7 space-y-2">
            <button className='flex items-center gap-[3.5px] bg-white px-[72px] py-[10px] text-gray-700 text-[14px] font-medium rounded-3xl'>
                <img 
                  alt="" 
                  className='w-[20px] h-[20px]' 
                  src="./assets/icons/google-icon.png"
                />
                Sing up with Google
              </button>
              <button className='flex items-center gap-[3.5px] bg-white px-[75px] py-[10px] text-gray-800 text-[14px] font-bold rounded-3xl'>
                <img 
                  alt="" 
                  className='w-[20px] h-[20px]' 
                  src="./assets/icons/apple-icon.png"
                />
                Sing up with Apple
              </button>
            </div>
            <div className="w-[56%] flex items-center gap-[1px] justify-center my-[4.5px]">
              <div className="w-1/2 border-b border-gray-800 h-1"></div>
              <p className='text-gray-300 font-medium text-[14px]'>or</p>
              <div className="w-1/2 border-b border-gray-800 h-1"></div>
            </div>
            <button className='flex items-center text-white bg-[#1D9BF0] px-[101px] py-[10px] text-[14px] font-semibold rounded-3xl'>
              Create account
            </button>
              <p className='text-gray-500 w-[55%] ml-1 my-1.5 text-[11.5px]'>By signing up, you agree to the <span className='text-[#1D9BF0]'>Terms of Service</span> and <span className='text-[#1D9BF0]'>Privacy Policy</span> , including <span className='text-[#1D9BF0]'>Cookie Use</span>.</p>

              <div className="space-y-4">
                  <p className='text-white text-lg mt-14 font-semibold'>Already have an account?</p>

                  <button className='flex items-center border hover:bg-blue-100 hover:bg-opacity-5 border-gray-400 text-[#1D9BF0] px-[128px] py-[9px] text-[14px] font-semibold rounded-3xl'>
                  Sign In
                  </button>         
              </div>
            </div>
            </div>
            <div className="absolute bottom-0 py-4 w-full bg-black text-gray-500">
                  <p className="flex flex-wrap gap-4 text-[13.5px] items-center justify-center">
                    <span>About</span>
                    <span>Download the X app</span>
                    <span>Help Center</span>
                    <span>Terms of Service</span>
                    <span>Privacy Policy</span>
                    <span>Cookie Policy</span>
                    <span>Accessibility</span>
                    <span>Ads info</span>
                    <span>Blog</span>
                    <span>Careers</span>
                    <span>Brand Resources</span>
                    <span>Advertising</span>
                    <span>Marketing</span>
                    <span>X for Business</span>
                    <span>Developers</span>
                    <span>Directory</span>
                    <span>Settings</span>
                    <span>© 2024 X Corp</span>
                  </p>
                </div>
            </div>
          </>
  );
};

export default TwitterAuth;