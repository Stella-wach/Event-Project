import React, { useEffect, useState } from 'react'
import { LoaderIcon } from 'lucide-react';
import BlurCircle from '../components/BlurCircle';
import { dateFormat } from '../library/dateFormat';
import { useAppContext } from '../context/appContext';
import toast from 'react-hot-toast';

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  
  const { axios, getToken, user } = useAppContext()
  
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getMyBookings = async () => {
    try {
      const { data } = await axios.get('/api/booking/user-bookings', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
              
      if (data.success) {
        setBookings(data.bookings)
        console.log('Bookings loaded:', data.bookings)
      } else {
        toast.error(data.message || 'Failed to load bookings')
      }
    } catch (error) {
      console.log('Error fetching bookings:', error)
      toast.error('Failed to load your bookings')
    }
    setIsLoading(false)
  }

  const handlePayNow = (bookingId) => {
    // Implement payment logic here
    toast.success('Redirecting to payment...')
    // You can redirect to payment page or open payment modal
    console.log('Pay for booking:', bookingId)
  }

  const cancelBooking = async (bookingId) => {
    try {
      const { data } = await axios.delete(`/api/bookings/cancel/${bookingId}`, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      
      if (data.success) {
        toast.success(data.message)
        getMyBookings() // Refresh bookings
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log('Error cancelling booking:', error)
      toast.error('Failed to cancel booking')
    }
  }

  useEffect(() => {
    if (user) {
      getMyBookings()
    }
  }, [user])

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[80vh]'>
        <LoaderIcon className='animate-spin w-8 h-8' />
      </div>
    )
  }

  return (
    <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
      <BlurCircle top='100px' left='100px'/>
      <div>
        <BlurCircle bottom='0px' left='600px'/>
      </div>
      
      <h1 className='text-lg font-semibold mb-4'>My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-gray-400 text-lg'>No bookings found</p>
          <p className='text-gray-500 text-sm mt-2'>Book your first event to see it here</p>
        </div>
      ) : (
        bookings.map((booking, index) => (
          <div key={booking._id || index} className='flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl'>
            <div className='flex flex-col md:flex-row'>
              <img 
                src={booking.eventPoster || '/default-event-poster.jpg'} 
                alt="Event Poster" 
                className='max-w-45 aspect-video h-auto object-cover object-bottom rounded'
                onError={(e) => {
                  e.target.src = '/default-event-poster.jpg'
                }}
              />
              <div className='flex flex-col p-4'>
                <p className='text-lg font-semibold'>{booking.eventTitle}</p>
                <p className='text-gray-400 text-sm mt-1'>
                  Date: {booking.eventDate ? dateFormat(booking.eventDate) : 'Date TBD'}
                </p>
                <p className='text-gray-400 text-sm'>
                  Venue: {booking.eventVenue || 'Venue TBD'}
                </p>
                <p className='text-gray-400 text-sm'>
                  Booking Date: {dateFormat(booking.bookingDate)}
                </p>
                <div className='mt-2'>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'Confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
              <div className='flex items-center gap-4'>
                <p className='text-2xl font-semibold mb-3'>{currency}{booking.amount}</p>
                {!booking.isPaid && (
                  <button 
                    onClick={() => handlePayNow(booking._id)}
                    className='bg-primary hover:bg-primary-dull px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer transition-colors'
                  >
                    Pay Now
                  </button>
                )}
              </div>
              
              <div className='text-sm space-y-1'>
                <p><span className='text-gray-400'>Total Tickets:</span> {booking.ticketCount}</p>
                <p><span className='text-gray-400'>Ticket Numbers:</span> {booking.ticketNumbers.join(', ')}</p>
                {booking.isPaid && (
                  <p className='text-green-600 font-medium'>✓ Paid</p>
                )}
              </div>
              
              {!booking.isPaid && booking.status !== 'Cancelled' && (
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to cancel this booking?')) {
                      cancelBooking(booking._id)
                    }
                  }}
                  className='mt-2 text-red-500 hover:text-red-700 text-sm underline'
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default MyBookings