import Booking from "../models/booking.js"
import Event from "../models/Event.js"  // ✅ Fixed import
import EventDetails from "../models/EventDetails.js"
import User from "../models/user.js"

// API to check if user is admin
export const isAdmin = async (req, res) => {
    res.json({ success: true, isAdmin: true })
}

// API to get dashboard data
export const getDashboardData = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true });
    const totalUsers = await User.countDocuments();

    // Get upcoming event details and populate event info
    const activeEventDetails = await EventDetails.find({
      eventDateTime: { $gte: new Date() }
    }).populate("eventId");

    console.log("Dashboard - found active events:", activeEventDetails.length);
    console.log("First active event structure:", activeEventDetails[0]);

    // Normalize the data and include both ticket counts AND prices
    const activeEvents = activeEventDetails.map((detail) => ({
      _id: detail._id,
      title: detail.eventId?.title || "Untitled Event",
      poster_path: detail.eventId?.poster_path || "/fallback.jpg",
      rating: detail.eventId?.rating || 0,
      eventDateTime: detail.eventDateTime,
      eventPrice: detail.eventPrice,
      // Include both booking counts and prices
      ticketTypes: {
        advance: detail.ticketTypes?.advance || 0,
        vip: detail.ticketTypes?.vip || 0,
        student: detail.ticketTypes?.student || 0
      },
      // Add ticket prices - you might need to define these based on your business logic
      ticketPrices: {
        advance: detail.eventPrice, // Base price
        vip: detail.eventPrice * 1.5, // VIP = 1.5x base price
        student: detail.eventPrice * 0.7 // Student = 0.7x base price (discount)
      }
    }));

    const dashboardData = {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
      totalUsers,
      activeEvents,
    };

    return res.json({ success: true, dashboardData });
  } catch (error) {
    console.error("Dashboard error:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};
// API to get active events (PUBLIC for testing)
export const getActiveEvents = async (req, res) => {
  try {
    const events = await Event.find({})  // ✅ Fixed from Events to Event
      .sort({ createdAt: -1 });

    res.json({ success: true, events });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};



// API TO GET ALL EVENTS
export const getAllEvents = async (req, res) => {
    try {
        // Get EventDetails with populated event data  
        const eventDetails = await EventDetails.find()
            .populate("eventId")
            .sort({ createdAt: -1 });

        console.log("📊 All events - found:", eventDetails.length);
        console.log("📊 First event structure:", eventDetails[0]);

        return res.json({ 
            success: true, 
            events: eventDetails 
        });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// API TO GET ALL BOOKINGS
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({})
            .populate('user')
            .populate('event')
            .sort({ createdAt: -1 })
        res.json({ success: true, bookings })
     } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message })
    }
}