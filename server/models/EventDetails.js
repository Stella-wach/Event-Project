import mongoose from "mongoose";

const eventDetailsSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true }, // ✅ Changed "Events" to "Event"
    eventDateTime: { type: Date, required: true },
    eventPrice: { type: Number, required: true },

    ticketTypes: {
      advance: { type: Number, default: 0 },
      vip: { type: Number, default: 0 },
      student: { type: Number, default: 0 }
    }
  },
  { timestamps: true, minimize: false }
);

const EventDetails = mongoose.model("EventDetails", eventDetailsSchema);

export default EventDetails;