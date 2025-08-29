import express from "express";
import { 
  getNowActiveEvents, 
  addEvent, 
  getEvent, 
  getEvents, 
  seedDummyEvents,
  getActiveEventDetails,  // Add this
  deleteEvent             // Add this
} from "../controllers/eventController.js";
import { protectAdmin } from "../middleware/auth.js";

const eventRouter = express.Router();

// Routes using controller
eventRouter.get("/active-events", protectAdmin, getNowActiveEvents);
eventRouter.get("/active-event-details", protectAdmin, getActiveEventDetails); // New route
eventRouter.post("/add-event", protectAdmin, addEvent);
eventRouter.delete("/delete-event/:eventDetailId", protectAdmin, deleteEvent); // New route
eventRouter.get("/all", getEvents);
eventRouter.get("/:eventId", getEvent);

// Temporary seeding route (remove protectAdmin for testing, add back later)
eventRouter.post("/seed", async (req, res) => {
  try {
    await seedDummyEvents();
    res.json({ success: true, message: "Database reseeded successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Seeding failed", error: error.message });
  }
});

export default eventRouter;