// Updated app.js - Add M-Pesa routes
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import eventRouter from './routes/eventRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import userRouter from './routes/userRoutes.js';
import mpesaRouter from './routes/mpesaRoutes.js'; // Add M-Pesa routes

const app = express();
const port = 3000;

await connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// API Routes
app.get('/', (req, res) => res.send('Server is Live!'));
app.use('/api/inngest', serve({ client: inngest, functions }));
app.use("/api/event", eventRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);
app.use('/api/mpesa', mpesaRouter); // Add M-Pesa routes

// Only run listen() locally
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () =>
    console.log(`Server is running at http://localhost:${port}`)
  );
}

export default app;
