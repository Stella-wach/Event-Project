import express from "express";
import { 
  isAdmin, 
  getDashboardData, 
  getActiveEvents, 
  getAllEvents, 
  getAllBookings 
} from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/auth.js";

const adminRouter = express.Router();

// Admin routes
adminRouter.get("/is-admin", protectAdmin, isAdmin);
adminRouter.get("/dashboard", protectAdmin, getDashboardData);
adminRouter.get("/active-events", protectAdmin, getActiveEvents);
adminRouter.get("/all-events", protectAdmin, getAllEvents);
adminRouter.get("/all-bookings", protectAdmin, getAllBookings);

export default adminRouter;