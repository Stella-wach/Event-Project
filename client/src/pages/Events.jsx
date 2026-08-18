import React, { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchIcon } from 'lucide-react'
import EventCard from '../components/EventCard'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/appContext'
import PageTransition from '../components/PageTransition'

const Events = () => {
  const { events, isEventsLoading, eventsError, fetchEvents } = useAppContext()
  const [searchParams, setSearchParams] = useSearchParams()

  // Search term and category live in the URL (?q=...&category=...) so
  // results are shareable/bookmarkable and survive a page refresh or
  // browser back/forward, instead of being lost local component state.
  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''

  const categories = useMemo(() => {
    const seen = new Map()
    events.forEach((event) => {
      (event.categories || []).forEach((c) => seen.set(c.name, c.name))
    })
    return Array.from(seen.values()).sort()
  }, [events])

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesQuery = query
        ? event.title?.toLowerCase().includes(query.toLowerCase())
        : true
      const matchesCategory = category
        ? (event.categories || []).some((c) => c.name === category)
        : true
      return matchesQuery && matchesCategory
    })
  }, [events, query, category])

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next, { replace: true })
  }

  // With fallback data always pre-populated, only show the blocking
  // spinner/error screens if there's truly nothing to display yet -
  // otherwise a background refresh would flash the list away.
  if (isEventsLoading && events.length === 0) {
    return (
      <PageTransition>
        <div className='flex flex-col items-center justify-center h-screen'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4'></div>
          <p className='text-lg'>Waking up the server, this can take up to a minute...</p>
        </div>
      </PageTransition>
    )
  }

  if (eventsError && events.length === 0) {
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

        <div className='flex flex-col sm:flex-row gap-4 mb-8'>
          <div className='relative flex-1'>
            <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
            <input
              type='text'
              value={query}
              onChange={(e) => updateParam('q', e.target.value)}
              placeholder='Search events by title...'
              className='w-full pl-10 pr-4 py-2 bg-gray-800 rounded-full text-sm outline-none focus:ring-1 focus:ring-primary'
            />
          </div>
          {categories.length > 0 && (
            <select
              value={category}
              onChange={(e) => updateParam('category', e.target.value)}
              className='px-4 py-2 bg-gray-800 rounded-full text-sm outline-none focus:ring-1 focus:ring-primary cursor-pointer'
            >
              <option value=''>All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          )}
        </div>

        <h1 className='text-lg font-medium my-4'>
          {query || category ? `Results (${filteredEvents.length})` : 'Trending'}
        </h1>

        {filteredEvents.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
            {filteredEvents.map((event) => (
              <EventCard event={event} key={event._id} />
            ))}
          </div>
        ) : (
          <p className='text-gray-400 text-center py-20'>No events match your search.</p>
        )}
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