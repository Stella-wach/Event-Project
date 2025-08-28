import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import eventRouter from './routes/eventRoutes.js';
import { seedDummyEvents } from './controllers/eventController.js';
import bookingRouter from './routes/bookingRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = 3000;

await connectDB();

// ✅ Seed dummy events into MongoDB
await seedDummyEvents();

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

// Add this after connectDB() in server.js
import User from './models/user.js';

const createAdminUser = async () => {
  try {
    // Replace with your actual Clerk user ID
    const clerkUserId = "user_31sbnx9sYU00cdhH9zU466MFK5G"; 
    
    const adminUser = await User.findOneAndUpdate(
      { _id: clerkUserId },  // ✅ search by _id instead of clerkId
      {
        _id: clerkUserId,
        email: "wstellawambui@gmail.com",
        image: "https://example.com/image.jpg",
        firstName: "Stella",
        lastName: "Wachira",
        role: "admin"
      },
      { upsert: true, new: true }
    );

    return adminUser;
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
  }
};



// Call this once
await createAdminUser();


// Only run listen() locally
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () =>
    console.log(`Server is running at http://localhost:${port}`)
  );
}

export default app;
