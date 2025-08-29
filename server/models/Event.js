import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    poster_path: { type: String, required: true },
    backdrop_path: { type: String, required: true },
    tagline: { type: String },
    categories: { type: Array, required: true },
    speakers: { type: Array, required: true },
    rating: { type: Number, required: true },
    duration: { type: Number, required: true },
    eventPrice: { type: Number, default: 0 },
    bookedTickets: { type: Object, default: {} }
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);  
export default Event;  