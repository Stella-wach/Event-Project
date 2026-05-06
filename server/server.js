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
import mpesaRouter from './routes/mpesaRoutes.js';

const app = express();
const port = process.env.PORT || 3000; // ✅ Fix 1: use Render's PORT

await connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",                  // local dev
    process.env.CLIENT_URL,                   // ✅ Fix 2: your Vercel URL from .env
  ],
  credentials: true
}));
app.use(clerkMiddleware());

// API Routes
app.get('/', (req, res) => res.send('Server is Live!'));
app.use('/api/inngest', serve({ client: inngest, functions }));
app.use("/api/event", eventRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);
app.use('/api/mpesa', mpesaRouter);


app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);

export default app;