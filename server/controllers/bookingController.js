import Booking from '../models/booking.js';
import Event from '../models/Event.js';
import EventDetails from '../models/EventDetails.js';

// Updated booking creation for EventDetails system
export const createEventBooking = async (req, res) => {
  try {
    const userId = req.auth.userId; // Fixed: Use req.auth.userId for Clerk
    const { eventDetailId, ticketTypes, amount } = req.body;

    console.log("📝 Booking request:", { eventDetailId, ticketTypes, amount, userId });

    // Validate input
    if (!eventDetailId || !ticketTypes || !amount) {
      return res.json({
        success: false, 
        message: "Missing required booking information"
      });
    }

    // Get the EventDetails and populate the Event
    const eventDetail = await EventDetails.findById(eventDetailId).populate('eventId');
    if (!eventDetail) {
      return res.json({
        success: false, 
        message: "Event schedule not found"
      });
    }

    // Check if event is still in the future
    const eventDateTime = new Date(eventDetail.eventDateTime);
    const currentDateTime = new Date();
    if (eventDateTime <= currentDateTime) {
      return res.json({
        success: false, 
        message: "This event time has already passed"
      });
    }

    // Calculate total tickets being booked
    const totalTickets = Object.values(ticketTypes).reduce((sum, count) => sum + count, 0);
    
    if (totalTickets === 0) {
      return res.json({
        success: false, 
        message: "Please select at least one ticket"
      });
    }

    if (totalTickets > 10) {
      return res.json({
        success: false, 
        message: "Maximum 10 tickets can be booked per transaction"
      });
    }

    // Create the booking
    const booking = await Booking.create({
      user: userId,
      event: eventDetail._id, // Reference to EventDetails, not base Event
      eventDetail: eventDetail._id, // Also store direct reference
      ticketTypes: ticketTypes,
      amount: amount,
      isPaid: false,
      bookingDate: new Date()
    });

    console.log("✅ Booking created:", booking._id);

    // Format response with event information
    const bookingResponse = {
      id: booking._id,
      eventTitle: eventDetail.eventId.title,
      eventDate: eventDetail.eventDateTime,
      eventVenue: eventDetail.eventId.venue || "Venue TBD",
      eventPoster: eventDetail.eventId.poster_path,
      ticketTypes: ticketTypes,
      totalTickets: totalTickets,
      amount: booking.amount,
      isPaid: booking.isPaid,
      bookingDate: booking.createdAt
    };

    res.json({
      success: true,
      message: `Successfully booked ${totalTickets} ticket(s) for ${eventDetail.eventId.title}`,
      booking: bookingResponse
    });

  } catch (error) {
    console.error("❌ Booking error:", error.message);
    res.json({
      success: false, 
      message: "An error occurred while processing your booking. Please try again."
    });
  }
};

// Updated function to get user's bookings
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.auth.userId; // Fixed: Use req.auth.userId for Clerk
    
    console.log("📊 Fetching bookings for user:", userId);
    
    const bookings = await Booking.find({ user: userId })
      .populate({
        path: 'event',
        populate: {
          path: 'eventId',
          model: 'Event'
        }
      })
      .sort({ createdAt: -1 });

    console.log("📊 Found bookings:", bookings.length);

    if (!bookings || bookings.length === 0) {
      return res.json({
        success: true,
        message: "No bookings found",
        bookings: []
      });
    }

    const formattedBookings = bookings.map(booking => {
      // Handle both old Event-based bookings and new EventDetails-based bookings
      const eventInfo = booking.event.eventId ? {
        // New EventDetails-based booking
        title: booking.event.eventId.title,
        poster_path: booking.event.eventId.poster_path,
        eventDateTime: booking.event.eventDateTime,
        venue: booking.event.eventId.venue
      } : {
        // Old Event-based booking (fallback)
        title: booking.event.title,
        poster_path: booking.event.poster_path,
        eventDateTime: booking.event.event_date,
        venue: booking.event.venue
      };

      return {
        _id: booking._id,
        eventTitle: eventInfo.title,
        eventDate: eventInfo.eventDateTime,
        eventVenue: eventInfo.venue,
        eventPoster: eventInfo.poster_path,
        ticketTypes: booking.ticketTypes || {},
        ticketCount: Object.values(booking.ticketTypes || {}).reduce((sum, count) => sum + count, 0),
        ticketNumbers: booking.bookedTickets || [], // For compatibility
        amount: booking.amount,
        isPaid: booking.isPaid,
        bookingDate: booking.createdAt,
        status: booking.isPaid ? 'Confirmed' : 'Pending Payment',
        // M-Pesa payment information
        paymentDetails: booking.paymentDetails || null,
        paymentError: booking.paymentError || null,
        canPay: !booking.isPaid && booking.status !== 'cancelled',
        mpesaReceiptNumber: booking.paymentDetails?.mpesaReceiptNumber || null
      };
    });

    res.json({
      success: true,
      message: `Found ${bookings.length} booking(s)`,
      bookings: formattedBookings
    });
  } catch (error) {
    console.error("❌ Error fetching user bookings:", error.message);
    res.json({
      success: false, 
      message: "Failed to retrieve bookings. Please try again."
    });
  }
};

// Legacy functions (keep for compatibility)
export const createBooking = async (req, res) => {
  // This is the old booking system - redirect to new one
  return res.json({
    success: false,
    message: "Please use the new booking system through event checkout"
  });
};

export const getBookedTickets = async (req, res) => {
  try {
    const { eventId } = req.params;
    const eventData = await Event.findById(eventId);

    if (!eventData) {
      return res.json({success: false, message: "Event not found."});
    }

    const bookedTickets = Object.keys(eventData.bookedTickets || {});
    const availableTickets = eventData.totalTickets - bookedTickets.length;

    res.json({
      success: true,
      message: "Ticket information retrieved successfully",
      bookedTickets,
      availableTickets,
      totalTickets: eventData.totalTickets,
      eventTitle: eventData.title
    });
  } catch (error) {
    console.log(error.message);
    res.json({success: false, message: "Failed to retrieve ticket information."});
  }
};

// FIXED cancelBooking function to work with Clerk auth
export const cancelBooking = async (req, res) => {
  try {
    // FIXED: Use req.auth.userId (Clerk format) instead of req.auth().userId
    const userId = req.auth.userId;
    const { bookingId } = req.params;

    console.log('Cancel booking request:', { userId, bookingId }); // Debug log

    const booking = await Booking.findOne({ _id: bookingId, user: userId })
      .populate({
        path: 'event',
        populate: {
          path: 'eventId',
          model: 'Event'
        }
      });

    if (!booking) {
      console.log('Booking not found or unauthorized for user:', userId); // Debug log
      return res.json({success: false, message: "Booking not found or unauthorized."});
    }

    // Check if booking can be cancelled (event hasn't started)
    const eventDateTime = booking.event.eventDateTime || booking.event.event_date;
    const eventDate = new Date(eventDateTime);
    const currentDate = new Date();
    const timeDifference = eventDate.getTime() - currentDate.getTime();
    const hoursDifference = timeDifference / (1000 * 3600);

    if (hoursDifference < 24) {
      console.log('Cancellation not allowed - less than 24 hours:', hoursDifference); // Debug log
      return res.json({
        success: false, 
        message: "Cancellation not allowed. Event starts in less than 24 hours."
      });
    }

    // Delete the booking
    await Booking.findByIdAndDelete(bookingId);

    console.log('Booking cancelled successfully:', bookingId); // Debug log

    res.json({
      success: true,
      message: "Booking cancelled successfully. Refund will be processed within 5-7 business days."
    });
  } catch (error) {
    console.error('Cancel booking error:', error.message);
    console.error('Error stack:', error.stack); // More detailed error logging
    res.json({success: false, message: "Failed to cancel booking."});
  }
};