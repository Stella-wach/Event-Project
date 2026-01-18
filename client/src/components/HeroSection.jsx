import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
<div className="relative flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url('/backgroundEvents.jpg')] bg-cover bg-center h-screen">
      
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      {/* ✅ Changed from max-h-11 to max-h-8 (32px) - much smaller */}
      <img src={assets.eventLogo} alt="" className='max-h-8 lg:max-h-8 mt-20 relative z-10' />

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold max-w-110 relative z-10 leading-tight">
        Moonlight <br /> Sparks The Crowd
      </h1>

      <div className="flex items-center gap-4 text-gray-300 relative z-10">
        <span>Action | Music | Entertainment</span> 
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-4.5 h-4.5" /> 2025
        </div>         
        <div className="flex items-center gap-1">
          <ClockIcon className="w-4.5 h-4.5" /> 2h 8m
        </div>
      </div>

      <p className="max-w-xl text-gray-300 text-sm md:text-base leading-relaxed mb-6 relative z-10">
        A world of endless stages, dazzling lights, and roaring crowds—your adventure begins with one click.
      </p>

      <button
        onClick={() => navigate('/events')}
        className="flex items-center gap-1.5 sm:gap-2 px-5 py-2.5 sm:px-8 sm:py-4 text-sm sm:text-lg bg-primary hover:bg-primary-dull transition rounded-full font-semibold cursor-pointer relative z-10"
      >
        Explore Events
        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  )
}

export default HeroSection