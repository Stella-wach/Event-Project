import express from 'express';
import { 
  createBooking, 
  createEventBooking, // New function for EventDetails
  getBookedTickets, 
  getUserBookings,
  cancelBooking 
} from '../controllers/bookingController.js';
import { protectAdmin } from '../middleware/auth.js';

const bookingRouter = express.Router();

// New booking system for EventDetails
bookingRouter.post('/book-event', protectAdmin, createEventBooking);

// Legacy booking system (keep for compatibility)
bookingRouter.post('/create', protectAdmin, createBooking);

// Get booked tickets for a specific event
bookingRouter.get('/tickets/:eventId', getBookedTickets);

// Get all bookings for the logged-in user
bookingRouter.get('/user-bookings', protectAdmin, getUserBookings);

// Cancel a booking
bookingRouter.delete('/cancel/:bookingId', protectAdmin, cancelBooking);

export default bookingRouter;