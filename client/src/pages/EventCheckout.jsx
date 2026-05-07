import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Minus, Plus, CreditCard, LoaderIcon, Phone } from 'lucide-react'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import { dateFormat } from '../library/dateFormat'
import { useAppContext } from '../context/appContext'
import PageTransition from '../components/PageTransition'

const EventCheckout = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { axios, getToken, user } = useAppContext()
  const currency = import.meta.env.VITE_CURRENCY

  const [event, setEvent] = useState(null)
  const [selectedDateTime, setSelectedDateTime] = useState('')
  const [ticketCounts, setTicketCounts] = useState({ advance: 0, vip: 0, student: 0 })
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState(false)
  const [paymentMode, setPaymentMode] = useState('later')

  const getTicketPrices = (basePrice) => ({
    advance: basePrice,
    vip: Math.round(basePrice * 1.5),
    student: Math.round(basePrice * 0.7)
  })

  const getEvent = async () => {
    try {
      const { data } = await axios.get(`/api/event/${id}`)
      if (data.success) {
        setEvent(data)
        const firstDate = Object.keys(data.dateTime)[0]
        if (firstDate && data.dateTime[firstDate].length > 0) {
          setSelectedDateTime(data.dateTime[firstDate][0].eventDetailId)
        }
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to load event details")
    }
    setLoading(false)
  }

  const updateTicketCount = (type, increment) => {
    setTicketCounts(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + increment)
    }))
  }

  const calculateTotal = () => {
    if (!event || !selectedDateTime) return 0
    const selectedShow = Object.values(event.dateTime).flat().find(show => show.eventDetailId === selectedDateTime)
    if (!selectedShow) return 0
    const prices = getTicketPrices(selectedShow.price)
    return (ticketCounts.advance * prices.advance) + (ticketCounts.vip * prices.vip) + (ticketCounts.student * prices.student)
  }

  const getTotalTickets = () => Object.values(ticketCounts).reduce((sum, count) => sum + count, 0)

  const handleBooking = async () => {
    try {
      if (!user) return toast.error("Please login to book tickets")
      if (getTotalTickets() === 0) return toast.error("Please select at least one ticket")
      if (!selectedDateTime) return toast.error("Please select an event time")
      if (paymentMode === 'now' && !phoneNumber) return toast.error("Please enter your M-Pesa phone number")

      setBooking(true)

      const bookingData = {
        eventDetailId: selectedDateTime,
        ticketTypes: ticketCounts,
        amount: calculateTotal(),
        phoneNumber: paymentMode === 'now' ? phoneNumber : null,
        autoPayment: paymentMode === 'now'
      }

      const endpoint = paymentMode === 'now' ? '/api/mpesa/book-with-payment' : '/api/booking/book-event'
      const token = await getToken()
      const response = await axios.post(endpoint, bookingData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      })

      const data = response.data

      if (data.success) {
        if (paymentMode === 'now' && data.booking.payment?.paymentInitiated) {
          toast.success("Booking created! Check your phone for M-Pesa payment prompt.")
          pollPaymentStatus(data.booking.id)
        } else {
          toast.success("Booking successful!")
          setTimeout(() => navigate('/my-bookings'), 1500)
        }
        setTicketCounts({ advance: 0, vip: 0, student: 0 })
        setPhoneNumber('')
      } else {
        toast.error(data.message || "Booking failed")
      }
    } catch (error) {
      console.error(error)
      toast.error("Booking failed. Please try again.")
    }
    setBooking(false)
  }

  const pollPaymentStatus = (bookingId) => {
    const checkStatus = async () => {
      try {
        const { data } = await axios.get(`/api/mpesa/payment-status/${bookingId}`, {
          headers: { Authorization: `Bearer ${await getToken()}` }
        })
        if (data.success) {
          if (data.payment.isPaid) {
            toast.success("Payment successful! Redirecting to your bookings...")
            setTimeout(() => navigate('/my-bookings'), 2000)
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
    const maxAttempts = 40
    const pollInterval = setInterval(async () => {
      attempts++
      const shouldStop = await checkStatus()
      if (shouldStop || attempts >= maxAttempts) {
        clearInterval(pollInterval)
        if (attempts >= maxAttempts) {
          toast("Payment taking longer than expected. Check your bookings page for updates.", { duration: 5000 })
        }
      }
    }, 3000)
  }

  useEffect(() => {
    getEvent()
  }, [id])

  if (loading) return <Loading />

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p>Event not found</p>
      </div>
    )
  }

  const selectedShow = selectedDateTime ?
    Object.values(event.dateTime).flat().find(show => show.eventDetailId === selectedDateTime) : null

  const ticketPrices = selectedShow ? getTicketPrices(selectedShow.price) : { advance: 0, vip: 0, student: 0 }

  return (
    <PageTransition>
      <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
        <BlurCircle top='100px' left='-100px' />

        <div className='max-w-4xl mx-auto'>
          <h1 className='text-2xl font-semibold mb-6'>Book Tickets</h1>

          <div className='grid md:grid-cols-2 gap-8'>
            {/* Event Info */}
            <div>
              <img
                src={event.event.poster_path}
                alt={event.event.title}
                className='w-full max-w-80 rounded-lg object-cover mb-4'
              />
              <h2 className='text-xl font-semibold'>{event.event.title}</h2>
              <p className='text-gray-400 text-sm mt-2 leading-tight'>{event.event.description}</p>

              {selectedShow && (
                <div className='mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg'>
                  <p className='text-sm font-medium'>Selected Show:</p>
                  <p className='text-sm text-gray-400'>
                    {dateFormat(selectedShow.time)} - {currency}{selectedShow.price}
                  </p>
                </div>
              )}
            </div>

            {/* Booking Form */}
            <div className='space-y-6'>
              <div>
                <h3 className='font-medium mb-3'>Select Event Time</h3>
                <div className='space-y-2'>
                  {Object.entries(event.dateTime).map(([date, shows]) => (
                    <div key={date}>
                      <p className='text-sm font-medium text-gray-300 mb-2'>{dateFormat(date)}</p>
                      <div className='space-y-1'>
                        {shows.map((show) => (
                          <label key={show.eventDetailId} className='flex items-center gap-2 cursor-pointer p-2 hover:bg-primary/5 rounded'>
                            <input
                              type="radio"
                              name="datetime"
                              value={show.eventDetailId}
                              checked={selectedDateTime === show.eventDetailId}
                              onChange={(e) => setSelectedDateTime(e.target.value)}
                              className='text-primary'
                            />
                            <span className='text-sm'>
                              {new Date(show.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {currency}{show.price}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedDateTime && (
                <div>
                  <h3 className='font-medium mb-3'>Select Tickets</h3>
                  <div className='space-y-4'>
                    {/* Advance */}
                    <div className='flex items-center justify-between p-3 border border-primary/20 rounded-lg'>
                      <div>
                        <p className='font-medium'>Advance</p>
                        <p className='text-sm text-gray-400'>{currency}{ticketPrices.advance}</p>
                      </div>
                      <div className='flex items-center gap-3'>
                        <button onClick={() => updateTicketCount('advance', -1)} className='w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center' disabled={ticketCounts.advance === 0}>
                          <Minus className='w-4 h-4' />
                        </button>
                        <span className='w-8 text-center font-medium'>{ticketCounts.advance}</span>
                        <button onClick={() => updateTicketCount('advance', 1)} className='w-8 h-8 rounded-full bg-primary hover:bg-primary/80 flex items-center justify-center'>
                          <Plus className='w-4 h-4' />
                        </button>
                      </div>
                    </div>

                    {/* VIP */}
                    <div className='flex items-center justify-between p-3 border border-primary/20 rounded-lg'>
                      <div>
                        <p className='font-medium'>VIP</p>
                        <p className='text-sm text-gray-400'>{currency}{ticketPrices.vip}</p>
                      </div>
                      <div className='flex items-center gap-3'>
                        <button onClick={() => updateTicketCount('vip', -1)} className='w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center' disabled={ticketCounts.vip === 0}>
                          <Minus className='w-4 h-4' />
                        </button>
                        <span className='w-8 text-center font-medium'>{ticketCounts.vip}</span>
                        <button onClick={() => updateTicketCount('vip', 1)} className='w-8 h-8 rounded-full bg-primary hover:bg-primary/80 flex items-center justify-center'>
                          <Plus className='w-4 h-4' />
                        </button>
                      </div>
                    </div>

                    {/* Student */}
                    <div className='flex items-center justify-between p-3 border border-primary/20 rounded-lg'>
                      <div>
                        <p className='font-medium'>Student</p>
                        <p className='text-sm text-gray-400'>{currency}{ticketPrices.student}</p>
                      </div>
                      <div className='flex items-center gap-3'>
                        <button onClick={() => updateTicketCount('student', -1)} className='w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center' disabled={ticketCounts.student === 0}>
                          <Minus className='w-4 h-4' />
                        </button>
                        <span className='w-8 text-center font-medium'>{ticketCounts.student}</span>
                        <button onClick={() => updateTicketCount('student', 1)} className='w-8 h-8 rounded-full bg-primary hover:bg-primary/80 flex items-center justify-center'>
                          <Plus className='w-4 h-4' />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Payment Options */}
                  <div className='mt-6'>
                    <h3 className='font-medium mb-3'>Payment Options</h3>
                    <div className='space-y-3'>
                      <label className='flex items-center gap-3 p-3 border border-primary/20 rounded-lg cursor-pointer hover:bg-primary/5'>
                        <input type="radio" name="paymentMode" value="now" checked={paymentMode === 'now'} onChange={(e) => setPaymentMode(e.target.value)} className='text-primary' />
                        <div className='flex items-center gap-2'>
                          <Phone className='w-4 h-4' />
                          <span>Pay Now with M-Pesa</span>
                        </div>
                      </label>

                      <label className='flex items-center gap-3 p-3 border border-primary/20 rounded-lg cursor-pointer hover:bg-primary/5'>
                        <input type="radio" name="paymentMode" value="later" checked={paymentMode === 'later'} onChange={(e) => setPaymentMode(e.target.value)} className='text-primary' />
                        <div className='flex items-center gap-2'>
                          <CreditCard className='w-4 h-4' />
                          <span>Book Now, Pay Later</span>
                        </div>
                      </label>
                    </div>

                    {paymentMode === 'now' && (
                      <div className='mt-4'>
                        <label className='block text-sm font-medium mb-2'>M-Pesa Phone Number</label>
                        <div className='relative'>
                          <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                          <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="0712345678 or 254712345678"
                            className='w-full pl-10 pr-4 py-3 bg-transparent border border-primary/20 rounded-lg focus:border-primary focus:outline-none'
                          />
                        </div>
                        <p className='text-xs text-gray-400 mt-1'>Enter the number you want to pay from</p>
                      </div>
                    )}
                  </div>

                  {/* Summary */}
                  <div className='mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg'>
                    <div className='space-y-2'>
                      {ticketCounts.advance > 0 && (
                        <div className='flex justify-between text-sm'>
                          <span>Advance ({ticketCounts.advance}x)</span>
                          <span>{currency}{ticketCounts.advance * ticketPrices.advance}</span>
                        </div>
                      )}
                      {ticketCounts.vip > 0 && (
                        <div className='flex justify-between text-sm'>
                          <span>VIP ({ticketCounts.vip}x)</span>
                          <span>{currency}{ticketCounts.vip * ticketPrices.vip}</span>
                        </div>
                      )}
                      {ticketCounts.student > 0 && (
                        <div className='flex justify-between text-sm'>
                          <span>Student ({ticketCounts.student}x)</span>
                          <span>{currency}{ticketCounts.student * ticketPrices.student}</span>
                        </div>
                      )}
                      <hr className='border-primary/20' />
                      <div className='flex justify-between font-semibold'>
                        <span>Total ({getTotalTickets()} tickets):</span>
                        <span>{currency}{calculateTotal()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={(e) => { e.preventDefault(); handleBooking() }}
                    disabled={booking || getTotalTickets() === 0 || (paymentMode === 'now' && !phoneNumber)}
                    className='w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition rounded-lg font-medium text-white'
                  >
                    {booking ? (
                      <>
                        <LoaderIcon className='w-5 h-5 animate-spin' />
                        {paymentMode === 'now' ? 'Processing Payment...' : 'Creating Booking...'}
                      </>
                    ) : (
                      <>
                        {paymentMode === 'now' ? (
                          <>
                            <Phone className='w-5 h-5' />
                            Pay {currency}{calculateTotal()} with M-Pesa
                          </>
                        ) : (
                          <>
                            <CreditCard className='w-5 h-5' />
                            Book {getTotalTickets()} Ticket{getTotalTickets() !== 1 ? 's' : ''} - {currency}{calculateTotal()}
                          </>
                        )}
                      </>
                    )}
                  </button>

                  {paymentMode === 'now' && (
                    <p className='text-xs text-gray-400 mt-2 text-center'>
                      You'll receive an M-Pesa prompt on your phone to complete payment
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default EventCheckout