
import React from 'react';


const EventCheckout = ({ event }) => {
  const ticketPrices = event?.ticketPrices || {};
  const ticketTypes = defaultTicketTypes(ticketPrices);

  const handleBuyTicket = (type) => {
    alert(`Buying ${type.name} for KES ${type.price}`);

  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl w-full max-w-xl mx-auto">

        <BlurCircle top="-100px" left="-100px" />
<BlurCircle top="100px" right="0px" />
      

     
    </div>
  );
};

export default EventCheckout;
