import React, { useEffect, useState } from 'react'
import { dummyEventsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { dateFormat } from '../../library/dateFormat';
import { useAppContext } from '../../context/appContext';

const ListEvents = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const { axios, getToken, user } = useAppContext();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllEvents = async () => {
    try {
      const { data } = await axios.get("/api/admin/all-events", {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });

      console.log("Full API Response:", data);
      console.log("Events array:", data.events);
      console.log("First event structure:", data.events?.[0]);

      setEvents(data.events || []);
      setLoading(false);

    } catch (error) {
      console.error(error);
      setEvents([]);
      setLoading(false);
    }
  }

  useEffect(() => {
    if(user){
      getAllEvents();
    }
  }, [user]);

  return !loading ? (
    <>
      <Title text1="List" text2="Events"/>
      <div className='max-w-4xl mt-6 overflow-x-auto'>
        <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
          <thead>
            <tr className='bg-primary/20 text-left text-white'>
              <th className='p-2 font-medium pl-5'>Event Name</th>
              <th className='p-2 font-medium'>Event Time</th>
              <th className='p-2 font-medium'>Total Bookings</th>
              <th className='p-2 font-medium'>Earnings</th>
            </tr>
          </thead>

          <tbody className='text-sm font-light'>
            {events && events.length > 0 ? events.map((event, index) => (
              <tr key={event._id || index} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
                <td className='p-2 min-w-45 pl-5'>{event?.eventId?.title || 'No Title'}</td>
                <td className='p-2'>{event.eventDateTime ? dateFormat(event.eventDateTime) : 'N/A'}</td>
                <td className='p-2'>{(event.ticketTypes?.advance || 0) + (event.ticketTypes?.vip || 0) + (event.ticketTypes?.student || 0)}</td>
               <td className='p-2'>{currency} {event.ticketTypes?.advance || event.eventPrice || 0}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="p-4 text-center">No events found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  ) : <Loading/>
}

export default ListEvents