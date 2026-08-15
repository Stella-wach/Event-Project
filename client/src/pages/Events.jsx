import React from 'react'
import EventCard from '../components/EventCard'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/appContext'
import PageTransition from '../components/PageTransition'

const Events = () => {
  const { events, isEventsLoading, eventsError, fetchEvents } = useAppContext()

  if (isEventsLoading) {
    return (
      <PageTransition>
        <div className='flex flex-col items-center justify-center h-screen'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4'></div>
          <p className='text-lg'>Waking up the server, this can take up to a minute...</p>
        </div>
      </PageTransition>
    )
  }

  if (eventsError) {
    return (
      <PageTransition>
        <div className='flex flex-col items-center justify-center h-screen'>
          <h1 className='text-2xl font-bold text-center mb-4'>Couldn&apos;t load events</h1>
          <button
            onClick={() => fetchEvents()}
            className='px-6 py-2 bg-primary rounded-full hover:bg-primary/90 transition'
          >
            Try again
          </button>
        </div>
      </PageTransition>
    )
  }

  return events.length > 0 ? (
    <PageTransition>
      <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
        <BlurCircle top='150px' left='0px' />
        <BlurCircle bottom='50px' right='50px' />
        <h1 className='text-lg font-medium my-4'>Trending</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {events.map((event) => (
            <EventCard event={event} key={event._id} />
          ))}
        </div>
      </div>
    </PageTransition>
  ) : (
    <PageTransition>
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-3xl font-bold text-center'>No events available</h1>
      </div>
    </PageTransition>
  )
}

export default Events