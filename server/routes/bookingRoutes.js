import express from 'express';
import { createBooking, getBookedTickets } from '../controllers/bookingController.js';

const bookingRouter = express.Router();


bookingRouter.post('/create', createBooking);
bookingRouter.get('/tickets/:eventId', getBookedTickets);


export default bookingRouter;