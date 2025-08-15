import React from 'react'
import { dummyEventMedia } from '../assets/assets.js'
import ReactPlayer from 'react-player';
import BlurCircle from './BlurCircle.jsx';
import { PlayCircle } from 'lucide-react';

const EventPreview = () => {
  const [currentEvent, setCurrentEvent] = React.useState(dummyEventMedia[0]);

  console.log('Video URL:', currentEvent?.videoUrl); 

  return (
<div>
  <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
    <p className='text-gray-300 font-medium text-lg max-w-[960px] mx-auto'>Event Preview</p>

    <div className='relative mt-6'>
      <BlurCircle top='-100px' right='-100px' />
      <div className="relative w-full max-w-[720px] aspect-video mx-auto">
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
    </div>
  </div>

  <div className='group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto'>
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
        <PlayCircle 
          strokeWidth={1.6} 
          className='absolute top-1/2 left-1/2 w-8 h-8 md:w-12 md:h-12 transform -translate-x-1/2 -translate-y-1/2' 
        />
      </div>
    ))}
  </div>
</div>
  )
}

export default EventPreview
