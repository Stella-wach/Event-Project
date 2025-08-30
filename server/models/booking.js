import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: { type: String, required: true, ref: 'User' },
    event: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'EventDetails' }, // Changed to reference EventDetails
    eventDetail: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'EventDetails' }, // Explicit reference
    
    // Ticket information
    ticketTypes: {
      advance: { type: Number, default: 0 },
      vip: { type: Number, default: 0 },
      student: { type: Number, default: 0 }
    },
    
    amount: { type: Number, required: true },
    bookedTickets: { type: Array, default: [] }, // Keep for legacy compatibility
    isPaid: { type: Boolean, default: false },
    paymentLink: { type: String },
    
    // Additional fields for better tracking
    bookingDate: { type: Date, default: Date.now },
    status: { 
      type: String, 
      enum: ['pending', 'confirmed', 'cancelled'], 
      default: 'pending' 
    }
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;