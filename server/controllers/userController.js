import { clerkClient } from "@clerk/express";
import Booking from "../models/booking.js";
import Event from "../models/Event.js";

// API CONTROLLER FUNCTIONS TO GET USER BOOKINGS (Updated for M-Pesa)
export const getUserBookings = async (req, res) => {
    try {
        const userId = req.auth.userId; // Fixed: Clerk uses req.auth.userId, not req.auth().userId

        const bookings = await Booking.find({ user: userId })
            .populate({
                path: 'event',
                populate: {
                    path: 'eventId',
                    model: 'Event'
                }
            })
            .sort({ createdAt: -1 });

        if (!bookings || bookings.length === 0) {
            return res.json({
                success: true,
                message: "No bookings found",
                bookings: []
            });
        }

        const formattedBookings = bookings.map(booking => {
            // Handle both new EventDetails-based bookings and legacy bookings
            const eventInfo = booking.event.eventId ? {
                // New EventDetails-based booking
                title: booking.event.eventId.title,
                poster_path: booking.event.eventId.poster_path,
                eventDateTime: booking.event.eventDateTime,
                venue: booking.event.eventId.venue
            } : {
                // Legacy Event-based booking (fallback)
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
                amount: booking.amount,
                isPaid: booking.isPaid,
                status: booking.status || (booking.isPaid ? 'confirmed' : 'pending'),
                bookingDate: booking.createdAt,
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
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}

// API CONTROLLER FUNCTION TO UPDATE FAVORITE EVENT IN CLERK METADATA
export const updateFavorite = async (req, res) => {
    try {
        const { eventId } = req.body;
        const userId = req.auth.userId; // Fixed: Clerk uses req.auth.userId

        const user = await clerkClient.users.getUser(userId);

        if (!user.privateMetadata.favorites) {
            user.privateMetadata.favorites = [];
        }

        if (!user.privateMetadata.favorites.includes(eventId)) {
            user.privateMetadata.favorites.push(eventId);
        } else {
            user.privateMetadata.favorites = user.privateMetadata.favorites.filter(item => item !== eventId);
        }

        await clerkClient.users.updateUserMetadata(userId, { privateMetadata: user.privateMetadata });

        res.json({ success: true, message: "Favorite events updated." });

    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}

export const getFavorites = async (req, res) => {
    try {
        const user = await clerkClient.users.getUser(req.auth.userId); // Fixed: Clerk uses req.auth.userId
        const favorites = user.privateMetadata.favorites;

        // Get events from database
        const events = await Event.find({ _id: { $in: favorites } });

        res.json({ success: true, events });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}