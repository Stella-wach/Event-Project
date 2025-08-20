import React, { useEffect, useState } from 'react'
import { dummyEventsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { CheckIcon, DeleteIcon, StarIcon } from 'lucide-react';
import { kConverter } from '../../library/kConverter';

const AddEvents = () => {

  const currency = import.meta.VITE_CURRENCY
  const [nowTrendingEvents, setNowTrendingEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] =useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [eventPrice, setEventPrice] =useState("");


  const fetchNowTrendingEvents = async () => {

   setNowTrendingEvents(dummyEventsData)
  };

  const handleDateTimeAdd =() => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if(!date || !time) return;

    setDateTimeSelection((prev) => {
      const times =prev[date] || [];
      if(!times.includes(time)) {
        return {...prev, [date]: [...times, time] };
      }
      return prev;
    });
  
  
  };

 const handleRemoveTime = (date, time) => {
  setDateTimeSelection((prev) => {
    const filteredTimes = prev[date].filter ((t) => t !== time);
    if (filteredTimes.length === 0){
      const { [date]: _, ...rest } = prev;
    }

    return{
      ...prev,
      [date]: filteredTimes,
    };
  });
 };


  useEffect (() => {
    fetchNowTrendingEvents();
  }, [])


  return nowTrendingEvents.length > 0 ? (
    <>
      <Title  text1= "Add" text2 = "Events" /> 

      <p className='mt-10 text-lg font-medium'>Trending Events</p>

      <div className='overflow-x-auto pb-4'>

    <div className='group flex flex-wrap gap-4 mt-4 w-max'>
      {nowTrendingEvents.map  ((event) =>(
        <div key = {event._id} className={`elative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300 `} onClick={()=> setSelectedEvents(event.id)}> 

        <div className='relative rounded-lg overflow-hidden'>

        <img src={event.poster_path} alt="" className='w-full object-cover brightness-90' />
        </div>
        <div className='text-sm flex tems-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0'>

          <p className='flex items-center gap-1 text-gray-400'>
          <StarIcon className=' w-4 h-4 text-primay fill-primary' />
          {event.rating.toFixed(1)}

          </p>
          <p className='text-gray-300'> {kConverter(event.attendee_count)}Votes</p>


        </div>
     
     {selectedEvents === event.id && (
      <div className='absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded'>
        <CheckIcon className='w-4 h-4 text-white' strokeWidth={2.5} />


      </div>

     )}

        <p className='font-medium truncate'>{event.title}</p>
          <p>{event.event_date}</p>
        </div>

      ))}
    </div>
      </div>

      {/* Event Price input */}

        <div className='mt-8'>

        <label className='block text-sm font-medium mb-2'>EventPrice</label>
        <div className='inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md'>
          <p className='text-gray-400 text-sm'>{currency}</p>

         <input  min={0}  type='number'  value={eventPrice} 
  onChange={(e) => setEventPrice(e.target.value)} 
  placeholder="Enter event price" 
  className='outline-none' 
/>

</div>
</div>

{/* Date and time selection */}

<div className='mt-6'>
  <label className='block text-sm font-medium mb-2'>Select Date and Time</label>

  <div className='inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg'>

    <input type="datetime-local" value={dateTimeInput} onChange={(e) => setDateTimeInput(e.target.value)} className='outline-none rounded-md' />

      <button onClick={handleDateTimeAdd} className='bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer'>
      Add Time
      </button>


  </div>
</div>

{/* Display Selected Times */}
{Object.keys(dateTimeSelection).length > 0 && (
     
     <div className='mt-6'>

      <h2 className='mb-2'>Selected Date-Time</h2>

      <ul className='space-y-3'>
        {Object.entries(dateTimeSelection).map(([date, times]) => (  
          <li key={date}>
<div className='font-medium'>{date}</div>
<div className='flex flex-wrap gap-2 mt-1 text-sm'>{times.map((time) => (
  <div key={time} className='border border-primary px-2 py-1 flex items-center rounded'>
   <span>{time}</span> 
    <DeleteIcon onClick={() => handleRemoveTime(date, time)}  width={15} className='ml-2 text-red-500 hover:text-red-700 cursor-pointer'/>
     
   </div>
))}
</div>
          </li>
        ))}

      </ul>

     </div>

)}

<button className='bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer'>
  Add Event
</button>

    </>
  ): <Loading/>
} 

export default AddEvents

