import React, { useCallback, useEffect, useState } from 'react'
import { LoaderIcon } from 'lucide-react'
import BlurCircle from '../components/BlurCircle'
import { dateFormat } from '../library/dateFormat'
import { useAppContext } from '../context/appContext'
import toast from 'react-hot-toast'
import PageTransition from '../components/PageTransition'

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const { axios, getToken, user } = useAppContext()
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [cancellingBooking, setCancellingBooking] = useState(null)
  const [payingBooking, setPayingBooking] = useState(null)

  const getMyBookings = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/booking/user-bookings', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        setBookings(data.bookings)
      } else {
        toast.error(data.message || 'Failed to load bookings')
      }
    } catch (error) {
      console.log('Error fetching bookings:', error)
      toast.error('Failed to load your bookings')
    }
    setIsLoading(false)
  }, [axios, getToken])

  // FIXED: was a no-op placeholder that always showed the same static toast
  // regardless of which booking was clicked. Now actually triggers STK Push.
  const handlePayNow = async (bookingId) => {
    const phoneNumber = window.prompt(
      'Enter your M-Pesa phone number (e.g. 0712345678 or 254712345678):'
    )

    if (!phoneNumber) return // user cancelled the prompt

    setPayingBooking(bookingId)

    try {
      const { data } = await axios.post(
        '/api/mpesa/stk-push',
        { bookingId, phoneNumber },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      )

      if (data.success) {
        toast.success(data.message || 'Check your phone for the M-Pesa prompt')
        pollPaymentStatus(bookingId)
      } else {
        toast.error(data.message || 'Failed to initiate payment')
        setPayingBooking(null)
      }
    } catch (error) {
      console.log('Pay Now error:', error)
      toast.error(error.response?.data?.message || 'Payment initiation failed')
      setPayingBooking(null)
    }
  }

  // Polls payment status after STK Push is triggered, same pattern as EventCheckout
  const pollPaymentStatus = (bookingId) => {
    const checkStatus = async () => {
      try {
        const { data } = await axios.get(`/api/mpesa/payment-status/${bookingId}`, {
          headers: { Authorization: `Bearer ${await getToken()}` }
        })
        if (data.success) {
          if (data.payment.isPaid) {
            toast.success('Payment successful!')
            getMyBookings() // refresh the list to show updated status
            return true
          } else if (data.payment.paymentError) {
            toast.error(`Payment failed: ${data.payment.paymentError}`)
            return true
          }
        }
        return false
      } catch {
        return true
      }
    }

    let attempts = 0
    const maxAttempts = 40 // ~2 minutes at 3s intervals
    const pollInterval = setInterval(async () => {
      attempts++
      const shouldStop = await checkStatus()
      if (shouldStop || attempts >= maxAttempts) {
        clearInterval(pollInterval)
        setPayingBooking(null)
        if (attempts >= maxAttempts) {
          toast('Payment taking longer than expected. Refresh to check status.', {
            duration: 5000
          })
        }
      }
    }, 3000)
  }

  const cancelBooking = async (bookingId) => {
    setCancellingBooking(bookingId)
    try {
      const { data } = await axios.delete(`/api/booking/cancel/${bookingId}`, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        toast.success(data.message)
        getMyBookings()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel booking')
    }
    setCancellingBooking(null)
  }

  useEffect(() => {
    if (user) getMyBookings()
  }, [getMyBookings, user])

  if (isLoading) {
    return (
      <PageTransition>
        <div className='flex justify-center items-center min-h-[80vh]'>
          <LoaderIcon className='animate-spin w-8 h-8' />
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
        <BlurCircle top='100px' left='100px' />
        <div>
          <BlurCircle bottom='0px' left='600px' />
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
                  onError={(e) => { e.target.src = '/default-event-poster.jpg' }}
                />
                <div className='flex flex-col p-4'>
                  <p className='text-lg font-semibold'>{booking.eventTitle}</p>
                  <p className='text-gray-400 text-sm mt-1'>
                    Date: {booking.eventDate ? dateFormat(booking.eventDate) : 'Date TBD'}
                  </p>
                  <p className='text-gray-400 text-sm'>Venue: {booking.eventVenue || 'Venue TBD'}</p>
                  <p className='text-gray-400 text-sm'>Booking Date: {dateFormat(booking.bookingDate)}</p>

                  <div className='mt-2 flex flex-wrap gap-2'>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      booking.isPaid
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {booking.isPaid ? 'Paid' : booking.status || 'Pending'}
                    </span>
                    {booking.mpesaReceiptNumber && (
                      <span className='inline-block px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800'>
                        Receipt: {booking.mpesaReceiptNumber}
                      </span>
                    )}
                  </div>

                  <div className='mt-2 text-xs text-gray-400'>
                    {booking.ticketTypes && (
                      <div className='space-y-1'>
                        {booking.ticketTypes.advance > 0 && <p>Advance: {booking.ticketTypes.advance}</p>}
                        {booking.ticketTypes.vip > 0 && <p>VIP: {booking.ticketTypes.vip}</p>}
                        {booking.ticketTypes.student > 0 && <p>Student: {booking.ticketTypes.student}</p>}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
                <div className='flex items-center gap-4'>
                  <p className='text-2xl font-semibold mb-3'>{currency}{booking.amount}</p>
                  {!booking.isPaid && (
                    <button
                      onClick={() => handlePayNow(booking._id)}
                      disabled={payingBooking === booking._id}
                      className='bg-primary hover:bg-primary-dull px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer transition-colors disabled:opacity-50'
                    >
                      {payingBooking === booking._id ? (
                        <span className='flex items-center gap-1'>
                          <LoaderIcon className='w-3 h-3 animate-spin' />
                          Processing...
                        </span>
                      ) : (
                        'Pay Now'
                      )}
                    </button>
                  )}
                </div>

                <div className='text-sm space-y-1'>
                  <p><span className='text-gray-400'>Total Tickets:</span> {booking.ticketCount}</p>
                  {booking.ticketNumbers && booking.ticketNumbers.length > 0 && (
                    <p><span className='text-gray-400'>Ticket Numbers:</span> {booking.ticketNumbers.join(', ')}</p>
                  )}
                  {booking.isPaid && <p className='text-green-600 font-medium'>✓ Payment Confirmed</p>}
                  {booking.paymentError && (
                    <p className='text-red-500 text-xs'>Payment Error: {booking.paymentError}</p>
                  )}
                </div>

                {!booking.isPaid && booking.status !== 'cancelled' && (
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to cancel this booking?')) {
                        cancelBooking(booking._id)
                      }
                    }}
                    disabled={cancellingBooking === booking._id}
                    className='mt-2 text-red-500 hover:text-red-700 disabled:opacity-50 text-sm underline flex items-center gap-1'
                  >
                    {cancellingBooking === booking._id ? (
                      <>
                        <LoaderIcon className='w-3 h-3 animate-spin' />
                        Cancelling...
                      </>
                    ) : (
                      'Cancel Booking'
                    )}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </PageTransition>
  )
}

export default MyBookings