import { StarIcon } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import timeFormat from '../library/TimeFormat';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col justify-between p-2 ml-10 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-66'>
      <img
        onClick={() => {
          navigate(`/event/${event?._id}`);
          window.scrollTo(0, 0);
        }}
        src={event?.backdrop_path || ''}
        alt=""
        className='rounded-lg h-52 w-full object-cover object-right-bottom cursor-pointer'
      />

      <p className='font-semibold mt-2 truncate'>{event?.title || 'Untitled'}</p>

      <p className='text-sm text-gray-400 mt-2'>
        {event?.price || 'Price not specified'} 
        {' '} <br />
        {event?.event_date ? new Date(event.event_date).getFullYear() : 'N/A'} ●{' '}
        {(Array.isArray(event?.categories) ? event.categories.slice(0, 2) : [])
          .map(category => category?.name)
          .join(' | ') || 'No categories'} ●{' '}
        {event?.duration ? timeFormat(event.duration) : 'N/A'}
      </p>

      <div className='flex items-center justify-between mt-4 pb-3'>
        <button
          onClick={() => {
            navigate(`/event/${event?._id}`);
            window.scrollTo(0, 0);
          }}
          className='px-4 py-2 text-xs bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'
        >
          Buy Tickets
        </button>

        <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
          <StarIcon className='w-4 h-4 text-primary fill-primary' />
          {(Number(event?.rating) || 0).toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
