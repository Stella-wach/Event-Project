import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

// Reusable left-to-right reveal animation
const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }
  })
}

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-cover bg-center h-screen overflow-hidden">

      {/* Optimized, fast-loading hero background (preloaded + compressed WebP) */}
      <picture className="absolute inset-0 -z-10">
        <source srcSet="/backgroundEvents.webp" type="image/webp" />
        <img
          src="/backgroundEvents.jpg"
          alt=""
          fetchpriority="high"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </picture>

      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <motion.img
        src={assets.eventLogo}
        alt=""
        className='max-h-8 lg:max-h-8 mt-20 relative z-10'
        variants={fadeInLeft}
        initial="hidden"
        animate="visible"
        custom={0}
      />

      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-semibold max-w-110 relative z-10 leading-tight"
        variants={fadeInLeft}
        initial="hidden"
        animate="visible"
        custom={0.15}
      >
        Moonlight <br /> Sparks The Crowd
      </motion.h1>

      <motion.div
        className="flex items-center gap-4 text-gray-300 relative z-10"
        variants={fadeInLeft}
        initial="hidden"
        animate="visible"
        custom={0.3}
      >
        <span>Action | Music | Entertainment</span>
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-4.5 h-4.5" /> 2025
        </div>
        <div className="flex items-center gap-1">
          <ClockIcon className="w-4.5 h-4.5" /> 2h 8m
        </div>
      </motion.div>

      <motion.p
        className="max-w-xl text-gray-300 text-sm md:text-base leading-relaxed mb-6 relative z-10"
        variants={fadeInLeft}
        initial="hidden"
        animate="visible"
        custom={0.45}
      >
        A world of endless stages, dazzling lights, and roaring crowds—your adventure begins with one click.
      </motion.p>

      <motion.button
        onClick={() => navigate('/events')}
        className="flex items-center gap-1.5 sm:gap-2 px-5 py-2.5 sm:px-8 sm:py-4 text-sm sm:text-lg bg-primary hover:bg-primary-dull transition rounded-full font-semibold cursor-pointer relative z-10"
        variants={fadeInLeft}
        initial="hidden"
        animate="visible"
        custom={0.6}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        Explore Events
        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>
    </div>
  )
}

export default HeroSection