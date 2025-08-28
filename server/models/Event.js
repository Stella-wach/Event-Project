import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }, // changed from 'overview'
    poster_path: { type: String, required: true },
    backdrop_path: { type: String, required: true },
    
    tagline: { type: String },
    
    categories: { type: Array, required: true }, // changed from 'genres'
    speakers: { type: Array, required: true },   // changed from 'hosts'
    
    rating: { type: Number, required: true },    // changed from Array -> Number
    duration: { type: Number, required: true },  // renamed from runtime
    
    eventPrice: { type: Number, default: 0 },
    bookedTickets: { type: Object, default: {} }
  },
  { timestamps: true }
);

const Events = mongoose.model("Event", eventSchema);

export default Events;