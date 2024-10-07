import React from 'react';

const TwitterAuth: React.FC = () => {

  const welcomeValue: string | null = localStorage.getItem('welcome');

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
  
    const popup = window.open(
      'http://localhost:5000/api/auth/google',
      'google-login',
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );
  
    const popupChecker = setInterval(() => {
      if (popup.closed) {
        clearInterval(popupChecker);
        console.log('Popup closed by user.');
      }
    }, 500);
  
    window.addEventListener('message', (event) => {
      if (event.origin === 'http://localhost:5000') {
        const { user } = event.data;
  
        if (user) {
          console.log('User authenticated:', user);
          
          const token = user.token;
          localStorage.setItem('token', token);

          window.location.href = '/login';
        }
      }
    });
  };  
  
  const handleSetWelcome = (): void => {
    localStorage.setItem('welcome', 'true');
    window.location.reload(); 
  };
  return(
    <>
    <div className="bg-black w-full h-screen -z-10 flex flex-col lg:gap-12 lg:flex-row lg:p-0">
      <div className="flex w-full lg:gap-12 justify-center p-8 items-center flex-col lg:flex-row pt-14">
        <div className=" w-full px-2 py-8 lg:w-[45%] flex items-center justify-start lg:justify-center">
        <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="w-10 h-10 -mt-8 -mr-2 lg:h-[24rem] lg:w-[24rem] text-white"
      >
        <g>
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            fill="currentColor"
          />
        </g>

      </svg>
        </div>
        <div className="w-auto lg:w-[45%] flex items-center justify-center lg:justify-start">
        <div className="flex justify-center flex-col items-start lg:h-1/2">
            <div className="grid gap-10 lg:gap-12 p-3 lg:p-0">
              <h1 className='text-white font-bold text-[40px] lg:text-7xl'>Happening now</h1>
              <h3 className='text-white font-bold text-xl lg:text-4xl'>join today.</h3>
            </div>
            <div className=" w-[85%] lg:w-[56%]">
            <div className=" mt-2 lg:mt-7 space-y-2">
            <button   onClick={handleGoogleLogin} className='flex items-center gap-[3.5px] bg-white w-full py-[8.5px] justify-center text-gray-700 text-[14px] font-medium rounded-3xl'>
                <img 
                  alt="" 
                  className='w-[20px] h-[20px]' 
                  src="./assets/icons/google-icon.png"
                />
                Sing up with Google
              </button>
              <button className='flex items-center gap-[3.5px] bg-white w-full py-[8.5px] justify-center text-gray-800 text-[14px] font-bold rounded-3xl'>
                <img 
                  alt="" 
                  className='w-[20px] h-[20px]' 
                  src="./assets/icons/apple-icon.png"
                />
                Sing up with Apple
              </button>
            </div>
            <div className="w-full flex items-center gap-[1px] justify-center my-[4.5px]">
              <div className="w-1/2 border-b border-gray-800 h-1"></div>
              <p className='text-gray-300 font-medium text-[14px]'>or</p>
              <div className="w-1/2 border-b border-gray-800 h-1"></div>
            </div>
            <button className='flex items-center text-white bg-[#1D9BF0] w-full py-[9px] justify-center text-[15px] font-bold rounded-3xl'>
              Create account
            </button>
              <p className='text-gray-500 ml-1 my-1.5 text-[11px]'>By signing up, you agree to the <span className='text-[#1D9BF0]'>Terms of Service</span> and <span className='text-[#1D9BF0]'>Privacy Policy</span> , including <span className='text-[#1D9BF0]'>Cookie Use</span>.</p>
              <div className="space-y-4">
                  <p className='text-white text-lg mt-14 font-semibold'>Already have an account?</p>

                  <button className='flex items-center border hover:bg-blue-100 hover:bg-opacity-5 border-gray-500 text-[#1D9BF0] w-full py-[7px] justify-center text-[15px] font-semibold rounded-3xl'>
                  Sign In
                  </button>         
              </div>
            </div>
            </div>
            </div>
            </div>
            <div className="lg:absolute bottom-0 flex items-center justify-center lg:-z-1 lg:py-4 w-full bg-black text-gray-500">
                  <p className="flex flex-wrap gap-4 px-7 lg:px-0 leading-[4px] text-[12.5px] lg:text-[13.5px] items-center justify-center">
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
                {!welcomeValue ? (
                <div className="absolute bottom-0 py-4 w-full border-t border-gray-600 bg-black text-gray-500 flex items-center justify-center z-50">
              <div className=" w-[98%] z-10000 lg:w-[50%] grid px-3 grid-cols-8 py-1 gap-2">
                <div className="flex col-span-8 lg:col-span-8 justify-between">
                <h4 className='font-semibold text-white text-[20px] lg:text-[22px]'>Welcome to x.com!</h4> 
                <button 
                  onClick={handleSetWelcome} 
                  className='border rounded-3xl border-gray-500 px-[15px] cursor-pointer text-white py-[6px]'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" viewBox="0 0 24 24"><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M5.47 5.47a.75.75 0 0 1 1.06 0l12 12a.75.75 0 1 1-1.06 1.06l-12-12a.75.75 0 0 1 0-1.06"/><path d="M18.53 5.47a.75.75 0 0 1 0 1.06l-12 12a.75.75 0 0 1-1.06-1.06l12-12a.75.75 0 0 1 1.06 0"/></g></svg>
                    </button>
                </div>
                <p className='col-span-7 text-[14px] lg:text-[15px] text-gray-300'>We are letting you know that we are changing our URL, but your privacy and data protection settings remain the same.
                    For more details, see our Privacy Policy: <a className='text-purple-600' href="https://x.com/en/privacy">https://x.com/en/privacy</a></p>
              </div>
                </div>
                ) : (
                  ''
                )}
            </div>
          </>
  );
};

export default TwitterAuth;