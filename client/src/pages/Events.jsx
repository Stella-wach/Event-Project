import React from 'react'
import EventCard from '../components/EventCard'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/appContext'

const Events = () => {


  const {events} = useAppContext()

  return events.length > 0 ? (
    <div className='relative my-40 mb-60 px-6 md:px-16 1g:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>

      <BlurCircle top='150px' left='0px' />
      <BlurCircle bottom='50px' right='50px' />
   
      <h1 className='text-lg font-medium my-4'>Trending</h1>

<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
        {events.map((event) => (
          <EventCard event={event} key={event._id} />
        ))}
      </div>
    </div>
  ) : (
  <div className='flex flex-col items-center justify-center h-screen'>
    <h1 className='text-3xl font-bold text-center'>No events available</h1>
    </div>
  )
}

export default Events
