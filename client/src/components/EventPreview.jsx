import React from 'react'
import { motion } from 'framer-motion'
import { dummyEventMedia } from '../assets/assets.js'
import ReactPlayer from 'react-player';
import BlurCircle from './BlurCircle.jsx';
import { PlayCircle } from 'lucide-react';

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }
  })
}

const EventPreview = () => {
  const [currentEvent, setCurrentEvent] = React.useState(dummyEventMedia[0]);

  console.log('Video URL:', currentEvent?.videoUrl); 

  return (
    <div>
      <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-16 overflow-hidden'>
        {/* ✅ Reduced heading size */}
        <motion.p
          className='text-gray-300 font-medium text-base max-w-[960px] mx-auto'
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          custom={0}
        >
          Event Preview
        </motion.p>

        <motion.div
          className='relative mt-4'
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0.15}
        >
          <BlurCircle top='-100px' right='-100px' />
          <div className="relative w-full max-w-[640px] aspect-video mx-auto">
            <iframe
              src={currentEvent.videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </motion.div>
      </div>

      {/* ✅ Made thumbnail grid smaller and more compact */}
      <motion.div
        className='group grid grid-cols-4 gap-3 md:gap-6 mt-6 max-w-2xl mx-auto px-6'
        variants={fadeInLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={0.3}
      >
        {dummyEventMedia.map((event) => (
          <div 
            key={event.image} 
            className='relative hover:-translate-y-1 duration-300 transition cursor-pointer rounded-lg overflow-hidden'
            onClick={() => setCurrentEvent(event)}
          >
            <img 
              src={event.image} 
              alt="trailer" 
              className='w-full h-full object-cover brightness-75' 
            />
            {/* ✅ Made play icon smaller */}
            <PlayCircle 
              strokeWidth={1.6} 
              className='absolute top-1/2 left-1/2 w-6 h-6 md:w-8 md:h-8 transform -translate-x-1/2 -translate-y-1/2' 
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default EventPreview