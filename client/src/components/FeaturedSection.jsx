import { ArrowRight } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'
import EventCard from './EventCard'
import { useAppContext } from '../context/appContext'

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }
  })
}

const FeaturedSection = () => {
    const navigate = useNavigate()
    const { events} = useAppContext()

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>

     <motion.div
        className='relative flex items-center justify-between pt-16 pb-6'
        variants={fadeInLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        custom={0}
     >
        <BlurCircle top='0' right='-80px'/>
        {/* ✅ Reduced heading size */}
        <p className='text-gray-300 font-medium text-base'>Upcoming Events</p>

        <button onClick={()=> navigate('/events')}   className='group flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer'>
            View All 
            <ArrowRight className='group-hover:translate-x-0.5 transition w-3.5 h-3.5'/> 
        </button>
     </motion.div> 

     {/* ✅ Changed to proper 4-column grid layout */}
     <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6'>
       {events.slice(0, 4).map((event, index) => (
         <motion.div
           key={event._id}
           variants={fadeInLeft}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.3 }}
           custom={0.1 * index}
         >
           <EventCard event={event} />
         </motion.div>
       ))}
     </div> 

     {/* ✅ Made button smaller */}
     <motion.div
        className='flex justify-center mt-12'
        variants={fadeInLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        custom={0.2}
     >
        <button onClick={() => { navigate('/events'); scrollTo(0, 0); }}
        className='px-8 py-2 text-xs bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>Show More</button>
     </motion.div> 
    </div>
  )
}

export default FeaturedSection