import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { CalendarIcon, ClockIcon, DollarSignIcon, TrashIcon, TicketIcon } from 'lucide-react';
import { useAppContext } from '../../context/appContext';

const ActiveEvents = () => {
  const { axios, getToken, user } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY;
  
  const [activeEvents, setActiveEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingEvent, setDeletingEvent] = useState(null);

  // Fetch added events (EventDetails with populated event info)
  const fetchActiveEvents = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/event/active-event-details', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });

      if (data.success) {
        setActiveEvents(data.events);
      } else {
        toast.error('Failed to fetch active events');
      }
    } catch (error) {
      console.error('Error fetching active events:', error);
      toast.error('Error loading events');
    } finally {
      setLoading(false);
    }
  };

  // Delete an event
  const handleDeleteEvent = async (eventDetailId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      setDeletingEvent(eventDetailId);
      const { data } = await axios.delete(`/api/event/delete-event/${eventDetailId}`, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });

      if (data.success) {
        toast.success('Event deleted successfully');
        setActiveEvents(prev => prev.filter(event => event._id !== eventDetailId));
      } else {
        toast.error(data.message || 'Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Error deleting event');
    } finally {
      setDeletingEvent(null);
    }
  };

  // Format date and time
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  useEffect(() => {
    if (user) {
      fetchActiveEvents();
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Title text1="Active" text2="Events" />
      
      <div className="mt-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-lg font-medium">
            {activeEvents.length} Active Event{activeEvents.length !== 1 ? 's' : ''}
          </p>
          <button 
            onClick={fetchActiveEvents}
            className="bg-primary/80 text-white px-4 py-2 text-sm rounded-lg hover:bg-primary"
          >
            Refresh
          </button>
        </div>

        {activeEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No active events found</p>
            <p className="text-gray-400 text-sm mt-2">Add some events to see them here</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeEvents.map((eventDetail) => {
              const { date, time } = formatDateTime(eventDetail.eventDateTime);
              
              return (
                <div 
                  key={eventDetail._id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={eventDetail.eventId.poster_path}
                      alt={eventDetail.eventId.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      ⭐ {eventDetail.eventId.rating.toFixed(1)}
                    </div>
                  </div>

                  {/* Event Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 truncate">
                      {eventDetail.eventId.title}
                    </h3>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      {/* Date */}
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-primary" />
                        <span>{date}</span>
                      </div>
                      
                      {/* Time */}
                      <div className="flex items-center gap-2">
                        <ClockIcon className="w-4 h-4 text-primary" />
                        <span>{time}</span>
                      </div>
                      
                      {/* Main Event Price */}
                      <div className="flex items-center gap-2">
                        <DollarSignIcon className="w-4 h-4 text-primary" />
                        <span className="font-medium text-gray-800">
                          {currency} {eventDetail.eventPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Ticket Prices Section */}
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TicketIcon className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-gray-700">Ticket Prices</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <div className="text-gray-500">Advance</div>
                          <div className="font-semibold text-green-600">
                            {currency} {eventDetail.ticketTypes?.advance || 0}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-500">VIP</div>
                          <div className="font-semibold text-purple-600">
                            {currency} {eventDetail.ticketTypes?.vip || 0}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-500">Student</div>
                          <div className="font-semibold text-blue-600">
                            {currency} {eventDetail.ticketTypes?.student || 0}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-1">
                        {eventDetail.eventId.categories.slice(0, 2).map((category, index) => (
                          <span
                            key={index}
                            className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                          >
                            {category}
                          </span>
                        ))}
                        {eventDetail.eventId.categories.length > 2 && (
                          <span className="text-xs text-gray-400 px-2 py-1">
                            +{eventDetail.eventId.categories.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 pt-3 border-t flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        Added {new Date(eventDetail.createdAt).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => handleDeleteEvent(eventDetail._id)}
                        disabled={deletingEvent === eventDetail._id}
                        className="text-red-500 hover:text-red-700 p-1 rounded disabled:opacity-50"
                        title="Delete event"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default ActiveEvents;