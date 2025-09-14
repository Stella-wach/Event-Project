import express from 'express';
import {
   createBooking,
   createEventBooking, // New function for EventDetails
  getBookedTickets,
   getUserBookings,
  cancelBooking
} from '../controllers/bookingController.js';
import { protectAdmin } from '../middleware/auth.js';
import { requireAuth } from '@clerk/express'; // Import Clerk auth

const bookingRouter = express.Router();

// New booking system for EventDetails - Use Clerk auth since it matches M-Pesa routes
bookingRouter.post('/book-event', requireAuth(), createEventBooking);

// Legacy booking system (keep for compatibility)
bookingRouter.post('/create', requireAuth(), createBooking);

// Get booked tickets for a specific event - can be public
bookingRouter.get('/tickets/:eventId', getBookedTickets);

// Get all bookings for the logged-in user - Use Clerk auth
bookingRouter.get('/user-bookings', requireAuth(), getUserBookings);

// FIXED: Cancel a booking - Use Clerk auth instead of protectAdmin so users can cancel their own bookings
bookingRouter.delete('/cancel/:bookingId', requireAuth(), cancelBooking);

export default bookingRouter;