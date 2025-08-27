import express from "express"
import { protectAdmin } from "../middleware/auth.js";
import { getAllBookings, getAllEvents, getDashboardData, isAdmin } from "../controllers/adminController.js";


const adminRouter = express.Router();

adminRouter.get('/is-admin', protectAdmin, isAdmin)
adminRouter.get('/dashboard', protectAdmin, getDashboardData)
adminRouter.get('/all-events', protectAdmin, getAllEvents)
adminRouter.get('/all-bookinhs', protectAdmin, getAllBookings)

export default adminRouter;