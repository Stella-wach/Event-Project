import React, { useEffect, useState } from 'react'
import { dummyDateTimeData, dummyEventsData } from '../assets/assets'
import BlurCircle from '../components/BlurCircle'
import { Heart, StarIcon, Ticket } from 'lucide-react'
import timeFormat from '../library/TimeFormat'
import { useParams, useNavigate  } from 'react-router-dom'
import Loading from '../components/Loading'

const EventDetails = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
 
  const navigate = useNavigate();

  const getEvent = async () => {
    const found = dummyEventsData.find(event => event._id === id)
    if (!found) return;

    setEvent({
      event: found,
      dateTime: dummyDateTimeData,
    })
  }

  useEffect(() => {
    getEvent()
  }, [id])

  return event ? (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
        <img src={event.event.poster_path} alt="" className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover' />

        <div className='relative flex flex-col gap-3'>
          <BlurCircle top='-100px' left='-100px' />

          <p className='text-primary'>EPIC</p>
          <h1 className='text-4xl font-semibold max-w-96 text-balance'>{event.event.title}</h1>

          <div className='flex items-center gap-2 text-gray-300'>
            <StarIcon className='w-5 h-5 text-primary fill-primary' />
            {(typeof event.event.rating === 'number' ? event.event.rating.toFixed(1) : 'N/A')} User Rating
          </div>

          <p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>
            {event.event.description}
          </p>

          <p>
            {timeFormat(event.event.duration)} ●
            {Array.isArray(event.event.categories)
              ? event.event.categories.map(category => category.name).join(', ')
              : 'No categories'} ●
            {event.event.event_date
              ? event.event.event_date.split("-")[0]
              : 'No event year'}
          </p>

          <div className='flex items-center gap-4 mt-4'>
            <button 
  onClick={() => navigate(`/event/${event.event._id}/checkout`)}
  className='flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dull transition  cursor-pointer rounded-full font-medium text-white'
>
  <Ticket className='w-5 h-5' />
  Buy Tickets
</button>

            

            <button className='flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 transition rounded-full font-medium text-white'>
              <Heart className={`w-5 h-5`}/>
            </button>
          </div>
        </div>
      </div>
      <p className='text-lg font-medium mt-20'>Hosts</p>
      <div className='overflow-x-auto no-scrollbar mt-8 pb-4'>
      <div className='flex items-center gap-4 w-max px-4'>
            
             {event.event.speakers?.slice(0, 12).map((speaker, index) => (
  <div key={index} className='flex flex-col items-center text-center'>
    <img
      src={speaker.profile_path}
      alt={speaker.name}
      className='rounded-full h-20 md:h-20 aspect-square object-cover'
    />
    <p className='font-medium text-xs mt-3'>{speaker.name}</p>
  </div>
))}

      </div>
      </div>
    </div>
  ) : <Loading />
}

export default EventDetails
