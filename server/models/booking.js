import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {type: String, required: true , ref: 'User'},
    event: {type: String, required: true , ref: 'Event'},
    amount: {type: Number, required: true },
    bookedTickets: {type: Array, required: true },
    isPaid: {type: Boolean, required: false },
    paymentLink: {type: String },

},{timestamps: true})

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;