import { StarIcon } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import timeFormat from '../library/TimeFormat';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  return (
    // ✅ Made card fit 4 per row: reduced width significantly, removed left margin
    <div className='flex flex-col justify-between p-2 bg-gray-800 rounded-xl hover:-translate-y-1 transition duration-300 w-full max-w-64'>
      <img
        onClick={() => {
          navigate(`/event/${event?._id}`);
          window.scrollTo(0, 0);
        }}
        src={event?.backdrop_path || ''}
        alt=""
        // ✅ Made image smaller for 4-card layout
        className='rounded-lg h-36 w-full object-cover object-right-bottom cursor-pointer'
      />

      {/* ✅ Made title even smaller for compact layout */}
      <p className='font-medium text-xs mt-1.5 truncate'>{event?.title || 'Untitled'}</p>

      {/* ✅ Made metadata even smaller */}
      <p className='text-[10px] text-gray-400 mt-1 leading-tight'>
        {event?.price || 'Price not specified'}
        {' '} <br />
        {event?.event_date ? new Date(event.event_date).getFullYear() : 'N/A'} ●{' '}
        {(Array.isArray(event?.categories) ? event.categories.slice(0, 2) : [])
          .map(category => category?.name)
          .join(' | ') || 'No categories'} ●{' '}
        {event?.duration ? timeFormat(event.duration) : 'N/A'}
      </p>

      {/* ✅ Made bottom section very compact */}
      <div className='flex items-center justify-between mt-2 pb-1'>
        <button
          onClick={() => {
            navigate(`/event/${event?._id}`);
            window.scrollTo(0, 0);
          }}
          // ✅ Made button very small for compact layout
          className='px-2.5 py-1 text-[10px] bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'
        >
          Buy Tickets
        </button>

        <p className='flex items-center gap-0.5 text-[10px] text-gray-400 pr-1'>
          <StarIcon className='w-2.5 h-2.5 text-primary fill-primary' />
          {(Number(event?.rating) || 0).toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default EventCard;