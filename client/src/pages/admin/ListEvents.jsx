import React, { useEffect, useState } from 'react'
import { dummyEventsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { dateFormat } from '../../library/dateFormat';

const ListEvents = () => {

const currency = import.meta.env.VITE_CURRENCY

const [events, setEvents] = useState([]);
const [loading, setLoading] = useState(true);

const getAllEvents = async () =>{
  try {
    setEvents([{
          event: dummyEventsData[0],
      eventDateTime: "2025-06-20T16:00:00.000Z",
      ticketPrice: 2500,
      ticketTypes: {
        advance: 0,
        vip: 2,
        student: 0,
      },
    }]);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

useEffect(() =>{
  getAllEvents();
},[]);

return  !loading ?  (
    <>

    <Title text1 = "List" text2="Events"/>
   <div className='max-w-4xl mt-6 overflow-x-auto'>
    <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>

    <thead>
      <tr className='bg-primary/20 text-left text-white'>

      <th className='p-2 font-medium pl-5'> Event Name</th>
      <th className='p-2 font-medium'>Event Time</th>
      <th className='p-2 font-medium'>Total Bookings</th>
      <th className='p-2 font-medium'>Earnings</th>

      </tr>
    </thead>

    <tbody className='text-sm font-light'>

      {events.map((event, index) => (
        <tr key={index} className='border-b boder-primary/10 bg-primary/5 even:bg-primary/10'>

          <td className='p-2 min-w-45 pl-5'>{event.event.title}</td>
          <td className='p-2'>{dateFormat(event.eventDateTime)}</td>
          <td className='p-2'>{Object.keys(event.ticketTypes).length}</td>
            <td className='p-2'>{currency} {Object.keys(event.ticketTypes).length * event.ticketPrice}</td>
          

        </tr>

      ))}

    </tbody>


    </table>

   </div>
      
    </>
  ) : <Loading/>
}

export default ListEvents
