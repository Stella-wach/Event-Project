import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("✅ Connected to MongoDB successfully")
    );

    // Just use the env var, no need to append manually
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "quickevents", // explicitly choose your DB
    });
  } catch (error) {
    console.log("❌ MongoDB error:", error.message);
  }
};

export default connectDB;
