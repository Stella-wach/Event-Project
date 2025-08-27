import Events from "../models/Event.js";
import EventDetails from "../models/EventDetails.js";
import { dummyEventsData } from "../data/dummyEventsData.js";

// Seed database with dummy events (wipe & reseed)
export const seedDummyEvents = async () => {
  try {
    // Delete all existing events
    await Events.deleteMany({});

    // Insert fresh dummy events
    await Events.insertMany(dummyEventsData);

    console.log("✅ Dummy events reseeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding dummy events:", error.message);
  }
};


// Fetch events from MongoDB
export const getNowActiveEvents = async (req, res) => {
  try {
    const events = await Events.find();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

// Add new event to MongoDB (from frontend request)
export const addEvent = async (req, res) => {
  try {
    const { eventId, eventDateTime, eventPrice } = req.body;

    const event = await Events.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // ✅ Match schema fields correctly
    const newEvent = await EventDetails.create({
      eventId, // fixed
      eventDateTime: new Date(eventDateTime),
      eventPrice,
      ticketTypes: {}, // fixed
    });

    res.json({ success: true, message: "Event added successfully", event: newEvent });
  } catch (error) {
    console.error("Error adding event:", error.message);
    res.status(500).json({ error: "Failed to add event" });
  }
};


// API TO GET EVENTS FROM THE DATABASE
export const getEvents = async (req, res) => {
  try {
    const events = await EventDetails.find({
      eventDateTime: { $gte: new Date() },
    }).populate("eventId").sort({ eventDateTime: 1 });

    // filter unique events
    const uniqueEvents = [];
    const seen = new Set();

    events.forEach(e => {
      if (!seen.has(e.eventId._id)) {
        seen.add(e.eventId._id);
        uniqueEvents.push(e.eventId);
      }
    });

    res.json({ success: true, events: uniqueEvents });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API TO GET A SINGLE EVENT FROM THE DATABASE
export const getEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const events = await EventDetails.find({
      eventId,
      eventDateTime: { $gte: new Date() }
    });

    const event = await Events.findById(eventId);
    if (!event) {
      return res.json({ success: false, message: "Event not found" });
    }

    const dateTime = {};
    events.forEach((show) => {
      const date = show.eventDateTime.toISOString().split("T")[0];
      if (!dateTime[date]) {
        dateTime[date] = [];
      }
      dateTime[date].push({ time: show.eventDateTime, eventId });
    });

    res.json({ success: true, event, dateTime });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

