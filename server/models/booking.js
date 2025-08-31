import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: { type: String, required: true, ref: 'User' },
    event: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'EventDetails' },
    eventDetail: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'EventDetails' },
    
    // Add booking reference field to handle the unique index
    bookingReference: { 
      type: String, 
      unique: true,
      default: function() {
        return `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      }
    },
    
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
    },
    
    // NEW M-PESA FIELDS
    paymentDetails: {
      mpesaReceiptNumber: String,
      transactionDate: String,
      phoneNumber: String,
      amount: Number
    },
    paymentError: String
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;