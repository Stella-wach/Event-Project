import express from "express";
import { getNowActiveEvents, addEvent, getEvent, getEvents } from "../controllers/eventController.js";
import { protectAdmin } from "../middleware/auth.js";

const eventRouter = express.Router();

// Routes using controller
eventRouter.get("/active-events", protectAdmin, getNowActiveEvents);
eventRouter.post("/add-event", protectAdmin, addEvent);
eventRouter.get("/all", getEvents);       // ✅ fixed
eventRouter.get("/:eventId", getEvent);   // ✅ keep this for single event

export default eventRouter;
