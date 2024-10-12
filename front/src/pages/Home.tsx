import React, { useEffect, useState } from 'react'

const Home: React.FC = () => {
  const [isForYouPostActive , setForYouPostInActive] = useState(false);
  const [isFollowingPostActive , setFollowingPostInActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const forYouPost = () => {
    setForYouPostInActive(true)
    setFollowingPostInActive(false)
  }

  const following = () => {
    setFollowingPostInActive(true)
    setForYouPostInActive(false)
  }
  return (
    <>
    <div className="flex gap-5 h-full">
      <div className="relative w-[70%] border-r border-gray-500">
        <nav className='absolute top-0 w-full'>
          <ul className={`grid grid-cols-2 border-b text-white py-[2px] ${isScrolled ? 'bg-gray-900 bg-opacity-50' : ''}`}>
            <li onClick={forYouPost} className='flex justify-center items-center hover:bg-gray-900 hover:bg-opacity-90 border-r border-gray-500'>
              <span className={`p-3 text-md ${isForYouPostActive && !isFollowingPostActive ? 'border-b-[4px] rounded-sm border-blue-500 font-semibold' : 'font-medium'}`}>
              For You
              </span>
            </li>
            <li onClick={following} className='flex justify-center items-center hover:bg-gray-900 hover:bg-opacity-90'>
              <span className={`p-3 text-md ${!isForYouPostActive && isFollowingPostActive ? 'border-b-[4px] rounded-sm border-blue-500 font-semibold' : 'font-medium'}`}>
                Following
              </span>
            </li>
          </ul>
        </nav>
        </div>
        <div className="w-[40%]">
          <h1>search</h1>
        </div>
    </div>
    </>
  )
}

export default Home;