import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protectAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No authorization header or wrong format"); // DEBUG LOG
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const token = authHeader.split(" ")[1];
    console.log("🎫 Token received:", token.substring(0, 20) + "..."); // DEBUG LOG

    let decoded;
    let userId;

    try {
      // Try to decode the Clerk JWT token
      decoded = jwt.decode(token);
      console.log("🔓 Decoded token:", decoded); // DEBUG LOG

      // Clerk tokens typically have 'sub' field for user ID
      if (decoded && decoded.sub) {
        userId = decoded.sub;
        console.log("🔍 Using Clerk sub field for userId:", userId); // DEBUG LOG
      } else {
        console.log("❌ No sub field found in token"); // DEBUG LOG
        return res.status(401).json({ success: false, message: "Invalid token format" });
      }
    } catch (decodeError) {
      console.log("❌ Failed to decode JWT:", decodeError.message); // DEBUG LOG
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // For Clerk integration, you might need to verify the token with Clerk
    // If you have Clerk secret key, you could verify like this:
    // const clerkSecretKey = process.env.CLERK_SECRET_KEY;
    // const verified = jwt.verify(token, clerkSecretKey);

    console.log("🔍 Looking for user ID:", userId); // DEBUG LOG
    
    // Find user in your database
    // Note: You might need to store Clerk user IDs in your User model
    const user = await User.findOne({ 
      $or: [
        { _id: userId }, // If you store Clerk ID as _id
        { clerkId: userId }, // If you store Clerk ID in a separate field
        { clerkUserId: userId } // Alternative field name
      ]
    });
    
    console.log("👤 Found user:", user); // DEBUG LOG

    if (!user) {
      console.log("❌ User not found in database with Clerk ID:", userId); // DEBUG LOG
      return res.status(403).json({ success: false, message: "User not found" });
    }

    if (user.role !== "admin") {
      console.log("❌ User role is:", user.role, "not admin"); // DEBUG LOG
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    console.log("✅ Admin access granted"); // DEBUG LOG
    req.user = user;
    next();
  } catch (error) {
    console.error("❌ Admin check failed:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};