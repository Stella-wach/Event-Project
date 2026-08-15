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
    console.error("❌ MongoDB connection failed:", error.message);
    console.error(error.stack);
    // Don't let the server report "running" while the DB is unreachable -
    // every DB-dependent route would just fail with an unexplained 500.
    process.exit(1);
  }
};

export default connectDB;
