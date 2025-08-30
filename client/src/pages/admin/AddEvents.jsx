import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { CheckIcon, DeleteIcon, StarIcon } from 'lucide-react';
import { kConverter } from '../../library/kConverter';
import { useAppContext } from '../../context/appContext';

const AddEvents = () => {
  const { axios, getToken, user } = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY;
  const [nowTrendingEvents, setNowTrendingEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [ticketPrices, setTicketPrices] = useState({
    advance: "",
    vip: "",
    student: ""
  });

  const [addingEvent, setAddingEvent] = useState(false)

  const fetchNowTrendingEvents = async () => {
    try {
      const { data } = await axios.get('/api/event/active-events', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });
     
      if (data.success) {
        setNowTrendingEvents(data.events);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev;
    });
    
    // Clear input after adding
    setDateTimeInput("");
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [date]: filteredTimes };
    });
  };

  // IMPROVED EVENT SUBMISSION
  const handleSubmit = async () => {
    try {
      setAddingEvent(true);

      if (!selectedEvents || Object.keys(dateTimeSelection).length === 0 || !eventPrice) {
        toast.error('Please select an event, date/time, and price');
        return;
      }

      // Create separate EventDetails for each date/time combination
      const eventDetailsPromises = [];
      
      for (const [date, times] of Object.entries(dateTimeSelection)) {
        for (const time of times) {
          const eventDateTime = `${date}T${time}`;
          
          const payload = {
            eventId: String(selectedEvents),
            eventDateTime: eventDateTime,
            eventPrice: Number(eventPrice),
            ticketTypes: {
              advance: Number(ticketPrices.advance) || 0,
              vip: Number(ticketPrices.vip) || 0,
              student: Number(ticketPrices.student) || 0
            }
          };

          console.log("Sending payload for", eventDateTime, ":", payload);

          const eventPromise = axios.post('/api/event/add-event', payload, {
            headers: { 
              'Authorization': `Bearer ${await getToken()}`,
              'Content-Type': 'application/json'
            }
          });
          
          eventDetailsPromises.push(eventPromise);
        }
      }

      // Wait for all events to be added
      const results = await Promise.all(eventDetailsPromises);
      
      // Check if all were successful
      const allSuccessful = results.every(result => result.data.success);
      
      if (allSuccessful) {
        toast.success(`Successfully added ${results.length} event schedule(s)!`);
        
        // Reset form
        setSelectedEvents(null);
        setDateTimeSelection({});
        setEventPrice("");
        setTicketPrices({ advance: "", vip: "", student: "" });
        
        // Optional: Trigger a refetch of events in other components
        // You might want to add this to your context to update other components
        
      } else {
        const failedCount = results.filter(result => !result.data.success).length;
        toast.error(`${failedCount} event(s) failed to add`);
      }
      
    } catch (error) {
      console.error("Submission error", error);
      console.error("Error response:", error.response?.data);
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred please try again');
      }
    } finally {
      setAddingEvent(false);
    }
  };

  useEffect(() => {
    if(user){
      fetchNowTrendingEvents();
    }
  }, [user]);

  return nowTrendingEvents.length > 0 ? (
    <>
      <Title text1="Add" text2="Events" />

      <p className="mt-10 text-lg font-medium">Trending Events</p>

      <div className="overflow-x-auto pb-4">
        <div className="group flex flex-wrap gap-4 mt-4 w-max">
          {nowTrendingEvents.map((event) => (
            <div
              key={event._id}
              className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300 ${
                selectedEvents === event._id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => {
                console.log("Selected event ID:", event._id, "Type:", typeof event._id);
                setSelectedEvents(event._id);
              }}
            >
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={event.poster_path}
                  alt=""
                  className="w-full object-cover brightness-90"
                />
              </div>
              <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
                <p className="flex items-center gap-1 text-gray-400">
                  <StarIcon className="w-4 h-4 text-primary fill-primary" />
                  {event.rating.toFixed(1)}
                </p>
                <p className="text-gray-300">
                  {kConverter(event.attendee_count)} Votes
                </p>
              </div>

              {selectedEvents === event._id && (
                <div className="absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded">
                  <CheckIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
              )}

              <p className="font-medium truncate">{event.title}</p>
              <p>{event.event_date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Event Price input */}
      <div className="mt-8">
        <label className="block text-sm font-medium mb-2">Main Event Price</label>
        <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
          <p className="text-gray-400 text-sm">{currency}</p>
          <input
            min={0}
            type="number"
            value={eventPrice}
            onChange={(e) => setEventPrice(e.target.value)}
            placeholder="Enter event price"
            className="outline-none"
          />
        </div>
      </div>

      {/* Ticket Prices */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">Ticket Prices (Optional)</label>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Advance</label>
            <div className="flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
              <p className="text-gray-400 text-sm">{currency}</p>
              <input
                type="number"
                value={ticketPrices.advance}
                onChange={(e) => setTicketPrices(prev => ({...prev, advance: e.target.value}))}
                placeholder="0"
                className="outline-none w-full"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-gray-500 mb-1">VIP</label>
            <div className="flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
              <p className="text-gray-400 text-sm">{currency}</p>
              <input
                type="number"
                value={ticketPrices.vip}
                onChange={(e) => setTicketPrices(prev => ({...prev, vip: e.target.value}))}
                placeholder="0"
                className="outline-none w-full"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-gray-500 mb-1">Student</label>
            <div className="flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
              <p className="text-gray-400 text-sm">{currency}</p>
              <input
                type="number"
                value={ticketPrices.student}
                onChange={(e) => setTicketPrices(prev => ({...prev, student: e.target.value}))}
                placeholder="0"
                className="outline-none w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Date and time selection */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">
          Select Date and Time
        </label>
        <div className="inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="outline-none rounded-md"
          />
          <button
            onClick={handleDateTimeAdd}
            disabled={!dateTimeInput}
            className="bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer disabled:opacity-50"
          >
            Add Time
          </button>
        </div>
      </div>

      {/* Display Selected Times */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2 text-sm font-medium">Selected Date-Time Slots</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <ul className="space-y-3">
              {Object.entries(dateTimeSelection).map(([date, times]) => (
                <li key={date}>
                  <div className="font-medium text-sm text-gray-700">{new Date(date).toLocaleDateString()}</div>
                  <div className="flex flex-wrap gap-2 mt-1 text-sm">
                    {times.map((time) => (
                      <div
                        key={time}
                        className="border border-primary bg-primary/5 px-3 py-1 flex items-center rounded-full"
                      >
                        <span>{new Date(`${date}T${time}`).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        <DeleteIcon
                          onClick={() => handleRemoveTime(date, time)}
                          width={15}
                          className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-2">
              Total slots: {Object.values(dateTimeSelection).flat().length}
            </p>
          </div>
        </div>
      )}

      <button 
        onClick={handleSubmit} 
        disabled={addingEvent || !selectedEvents || Object.keys(dateTimeSelection).length === 0 || !eventPrice} 
        className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer disabled:opacity-50"
      >
        {addingEvent ? 'Adding Event...' : `Add Event (${Object.values(dateTimeSelection).flat().length} slot${Object.values(dateTimeSelection).flat().length !== 1 ? 's' : ''})`}
      </button>
    </>
  ) : (
    <Loading />
  );
};

export default AddEvents;