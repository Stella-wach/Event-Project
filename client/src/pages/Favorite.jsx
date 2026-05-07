import React from 'react'
import EventCard from '../components/EventCard'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/appContext'
import PageTransition from '../components/PageTransition'

const Favorite = () => {
  const { favoriteEvents } = useAppContext()

  return favoriteEvents.length > 0 ? (
    <PageTransition>
      <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
        <BlurCircle top='150px' left='0px' />
        <BlurCircle bottom='50px' right='50px' />
        <h1 className='text-lg font-medium my-4'>Your Favorite Events</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {favoriteEvents.map((event) => (
            <EventCard event={event} key={event._id} />
          ))}
        </div>
      </div>
    </PageTransition>
  ) : (
    <PageTransition>
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-3xl font-bold text-center'>No favorite events yet</h1>
      </div>
    </PageTransition>
  )
}

export default Favorite