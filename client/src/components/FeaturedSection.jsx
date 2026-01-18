import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'
import EventCard from './EventCard'
import { useAppContext } from '../context/appContext'

const FeaturedSection = () => {
    const navigate = useNavigate()
    const { events} = useAppContext()

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>

     <div className='relative flex items-center justify-between pt-16 pb-6'>
        <BlurCircle top='0' right='-80px'/>
        {/* ✅ Reduced heading size */}
        <p className='text-gray-300 font-medium text-base'>Upcoming Events</p>

        <button onClick={()=> navigate('/events')}   className='group flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer'>
            View All 
            <ArrowRight className='group-hover:translate-x-0.5 transition w-3.5 h-3.5'/> 
        </button>
     </div> 

     {/* ✅ Changed to proper 4-column grid layout */}
     <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6'>
       {events.slice(0, 4).map((event) => (
         <EventCard key={event._id} event={event} />
       ))}
     </div> 

     {/* ✅ Made button smaller */}
     <div className='flex justify-center mt-12'>
        <button onClick={() => { navigate('/events'); scrollTo(0, 0); }}
        className='px-8 py-2 text-xs bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>Show More</button>
     </div> 
    </div>
  )
}

export default FeaturedSection