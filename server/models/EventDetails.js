import mongoose from "mongoose";

const eventDetailsSchema = new mongoose.Schema(
  {
    eventId: { type: String, ref: "Event", required: true }, // references Event._id
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
