import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Minus, Plus, Ticket, CreditCard } from 'lucide-react'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import { dateFormat } from '../library/dateFormat'
import { useAppContext } from '../context/appContext'

const EventCheckout = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { axios, getToken, user } = useAppContext()
  const currency = import.meta.env.VITE_CURRENCY

  const [event, setEvent] = useState(null)
  const [selectedDateTime, setSelectedDateTime] = useState('')
  const [ticketCounts, setTicketCounts] = useState({
    advance: 0,
    vip: 0,
    student: 0
  })
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState(false)

  // Ticket prices based on base price
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
        // Set first available datetime as default
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
    
    const selectedShow = Object.values(event.dateTime)
      .flat()
      .find(show => show.eventDetailId === selectedDateTime)
    
    if (!selectedShow) return 0
    
    const prices = getTicketPrices(selectedShow.price)
    
    return (
      (ticketCounts.advance * prices.advance) +
      (ticketCounts.vip * prices.vip) +
      (ticketCounts.student * prices.student)
    )
  }

  const getTotalTickets = () => {
    return Object.values(ticketCounts).reduce((sum, count) => sum + count, 0)
  }

  const handleBooking = async () => {
    try {
      if (!user) {
        toast.error("Please login to book tickets")
        return
      }

      if (getTotalTickets() === 0) {
        toast.error("Please select at least one ticket")
        return
      }

      if (!selectedDateTime) {
        toast.error("Please select an event time")
        return
      }

      setBooking(true)

      const bookingData = {
        eventDetailId: selectedDateTime,
        ticketTypes: ticketCounts,
        amount: calculateTotal()
      }

      const { data } = await axios.post('/api/booking/book-event', bookingData, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      if (data.success) {
        toast.success("Booking successful!")
        navigate('/my-bookings')
      } else {
        toast.error(data.message || "Booking failed")
      }

    } catch (error) {
      console.error(error)
      toast.error("Booking failed. Please try again.")
    }
    setBooking(false)
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
    Object.values(event.dateTime).flat().find(show => show.eventDetailId === selectedDateTime) : 
    null

  const ticketPrices = selectedShow ? getTicketPrices(selectedShow.price) : { advance: 0, vip: 0, student: 0 }

  return (
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
            <p className='text-gray-400 text-sm mt-2 leading-tight'>
              {event.event.description}
            </p>
          </div>

          {/* Booking Form */}
          <div className='space-y-6'>
            {/* Date/Time Selection */}
            <div>
              <h3 className='font-medium mb-3'>Select Event Time</h3>
              <div className='space-y-2'>
                {Object.entries(event.dateTime).map(([date, shows]) => (
                  <div key={date}>
                    <p className='text-sm font-medium text-gray-300 mb-2'>{dateFormat(date)}</p>
                    {shows.map((show) => (
                      <label key={show.eventDetailId} className='flex items-center gap-2 cursor-pointer'>
                        <input
                          type="radio"
                          name="datetime"
                          value={show.eventDetailId}
                          checked={selectedDateTime === show.eventDetailId}
                          onChange={(e) => setSelectedDateTime(e.target.value)}
                          className='text-primary'
                        />
                        <span className='text-sm'>
                          {new Date(show.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {currency}{show.price}
                        </span>
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Ticket Selection */}
            {selectedDateTime && (
              <div>
                <h3 className='font-medium mb-3'>Select Tickets</h3>
                <div className='space-y-4'>
                  {/* Advance Tickets */}
                  <div className='flex items-center justify-between p-3 border border-primary/20 rounded-lg'>
                    <div>
                      <p className='font-medium'>Advance</p>
                      <p className='text-sm text-gray-400'>{currency}{ticketPrices.advance}</p>
                    </div>
                    <div className='flex items-center gap-3'>
                      <button 
                        onClick={() => updateTicketCount('advance', -1)}
                        className='w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center'
                      >
                        <Minus className='w-4 h-4' />
                      </button>
                      <span className='w-8 text-center font-medium'>{ticketCounts.advance}</span>
                      <button 
                        onClick={() => updateTicketCount('advance', 1)}
                        className='w-8 h-8 rounded-full bg-primary hover:bg-primary-dull flex items-center justify-center'
                      >
                        <Plus className='w-4 h-4' />
                      </button>
                    </div>
                  </div>

                  {/* VIP Tickets */}
                  <div className='flex items-center justify-between p-3 border border-primary/20 rounded-lg'>
                    <div>
                      <p className='font-medium'>VIP</p>
                      <p className='text-sm text-gray-400'>{currency}{ticketPrices.vip}</p>
                    </div>
                    <div className='flex items-center gap-3'>
                      <button 
                        onClick={() => updateTicketCount('vip', -1)}
                        className='w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center'
                      >
                        <Minus className='w-4 h-4' />
                      </button>
                      <span className='w-8 text-center font-medium'>{ticketCounts.vip}</span>
                      <button 
                        onClick={() => updateTicketCount('vip', 1)}
                        className='w-8 h-8 rounded-full bg-primary hover:bg-primary-dull flex items-center justify-center'
                      >
                        <Plus className='w-4 h-4' />
                      </button>
                    </div>
                  </div>

                  {/* Student Tickets */}
                  <div className='flex items-center justify-between p-3 border border-primary/20 rounded-lg'>
                    <div>
                      <p className='font-medium'>Student</p>
                      <p className='text-sm text-gray-400'>{currency}{ticketPrices.student}</p>
                    </div>
                    <div className='flex items-center gap-3'>
                      <button 
                        onClick={() => updateTicketCount('student', -1)}
                        className='w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center'
                      >
                        <Minus className='w-4 h-4' />
                      </button>
                      <span className='w-8 text-center font-medium'>{ticketCounts.student}</span>
                      <button 
                        onClick={() => updateTicketCount('student', 1)}
                        className='w-8 h-8 rounded-full bg-primary hover:bg-primary-dull flex items-center justify-center'
                      >
                        <Plus className='w-4 h-4' />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Booking Summary */}
                <div className='mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg'>
                  <div className='flex justify-between mb-2'>
                    <span>Total Tickets:</span>
                    <span>{getTotalTickets()}</span>
                  </div>
                  <div className='flex justify-between text-lg font-semibold'>
                    <span>Total Amount:</span>
                    <span>{currency}{calculateTotal()}</span>
                  </div>
                </div>

                {/* Book Button */}
                <button
                  onClick={handleBooking}
                  disabled={booking || getTotalTickets() === 0}
                  className='w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dull disabled:opacity-50 disabled:cursor-not-allowed transition rounded-lg font-medium text-white'
                >
                  {booking ? (
                    <LoaderIcon className='w-5 h-5 animate-spin' />
                  ) : (
                    <>
                      <CreditCard className='w-5 h-5' />
                      Book Tickets
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) 

}

export default EventCheckout