import React, { useState, useEffect } from 'react';
import { Plus, Minus, Calendar, MapPin } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { dummyEventsData } from '../assets/assets'; // Or replace with API call
import BlurCircle from '../components/BlurCircle';

const EventCheckout = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [quantities, setQuantities] = useState({
    advance: 1,
    vip: 0,
    student: 0
  });

  useEffect(() => {
    const found = dummyEventsData.find(evt => evt._id === id);
    setEvent(found);
  }, [id]);

  

const updateQuantity = (ticketId, change) => {
    setQuantities(prev => ({
      ...prev,
      [ticketId]: Math.max(0, prev[ticketId] + change)
    }));
  };
  

  const getTotalQuantity = () => Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  const getTotalPrice = () => ticketTypes.reduce((total, ticket) => total + (quantities[ticket.id] * ticket.price), 0);

  if (!event) return <div className="text-white px-6 pt-20">Loading event...</div>;

const ticketTypes = [
  {
    id: 'advance',
    name: 'ADVANCE TICKETS',
    price: event?.ticketPrices?.advance || 0,
    description: 'Admits 1',
  },
  {
    id: 'vip',
    name: 'VIP TICKETS',
    price: event?.ticketPrices?.vip || 0,
    description: 'Admits 1',
  },
  {
    id: 'student',
    name: 'STUDENT TICKETS',
    price: event?.ticketPrices?.student || 0,
    description: 'Admits 1',
  }
];
  return (
    <div className="relative mt-10 px-6 md:px-16 lg:px-40 pt-24 pb-16 overflow-hidden  min-h-screen text-white">
      
      
     <BlurCircle top="10%" left="5%" />
<BlurCircle bottom="0" right="10%" />


      {/* Header Info */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <div className="mt-2 flex flex-col md:flex-row gap-4 text-gray-300 text-sm">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>Fri, 19 Sep 2025 | 8:00 AM - 6:00 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>
        </div>
      </div>

      {/* Ticket Types Table */}
      <div className="p-6 bg-gray-900 rounded-2xl border border-gray-700 shadow-lg">
        <div className="grid grid-cols-12 gap-4 mb-4 text-sm font-semibold text-gray-400 uppercase tracking-wide">
          <div className="col-span-5">Ticket</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-3 text-center">Quantity</div>
          <div className="col-span-2 text-right">Total</div>
        </div>

        {ticketTypes.map(ticket => (
          <div key={ticket.id} className="grid grid-cols-12 gap-4 items-center py-4 border-t border-gray-700">
            <div className="col-span-5">
              <div className="font-semibold text-white">{ticket.name}</div>
              <div className="text-sm text-gray-400">{ticket.description}</div>
            </div>
            <div className="col-span-2 text-center">
              <span className="font-semibold text-gray-200">KES {ticket.price.toLocaleString()}</span>
            </div>
            <div className="col-span-3">
              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={() => updateQuantity(ticket.id, -1)}
                  className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantities[ticket.id] === 0}
                >
                  <Minus size={16} className={quantities[ticket.id] === 0 ? 'text-gray-500' : 'text-gray-300'} />
                </button>
                <span className="w-8 text-center font-semibold text-white">{quantities[ticket.id]}</span>
                <button
                  onClick={() => updateQuantity(ticket.id, 1)}
                  className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Plus size={16} className="text-gray-300" />
                </button>
              </div>
            </div>
            <div className="col-span-2 text-right font-bold">
              <span>KES {(quantities[ticket.id] * ticket.price).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-10 border-t border-gray-700 pt-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Total</h3>
          <span className="text-2xl font-bold text-white">KES {getTotalPrice().toLocaleString()}</span>
        </div>
        <button
          className={`w-full py-3 px-6 cursor-pointer rounded-lg font-semibold text-lg transition-all duration-200 ${
            getTotalQuantity() > 0 
              ? 'bg-primary hover:bg-primary-dull text-white shadow-lg hover:shadow-xl' 
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
          disabled={getTotalQuantity() === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default EventCheckout;
