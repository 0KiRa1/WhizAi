import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'   

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div
      className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full 
      justify-center bg-cover bg-no-repeat min-h-screen'
      style={{ backgroundImage: `url(${assets.gradientBackground})` }}
    >
      <div className='text-center mb-6'>
        <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]'>
          Unlock Creativity <br /> with 
          <span className='text-[#FA8D16]'> AI Power</span>
        </h1>
        <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600'>
          Elevate your projects using our smart AI toolkit. Write blogs, design visuals, polish resumes, and boost productivity like never before.
        </p>
      </div>

      <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
        <button 
          onClick={() => navigate('/ai')} 
          className='bg-[#FA8D16] text-white px-10 py-3 rounded-lg hover:scale-105 active:scale-95 transition cursor-pointer'
        >
          Start creating now
        </button>
        <button className='bg-white px-10 py-3 rounded-lg border border-gray-300 hover:scale-105 active:scale-95 transition cursor-pointer'>
          Watch demo
        </button>
      </div>

      <div className='flex items-center gap-4 mt-8 mx-auto text-gray-600'>
        <img src={assets.user_group} alt="" className='h-8'/> Trusted by 10k+ users worldwide
      </div>
    </div>
  )
}

export default Hero
