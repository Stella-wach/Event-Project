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

    const decoded = jwt.decode(token);
    console.log("🔓 Decoded token:", decoded); // DEBUG LOG

    if (!decoded || !decoded.sub) {
      console.log("❌ Invalid token or missing sub field"); // DEBUG LOG
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const userId = decoded.sub;
    console.log("🔍 Looking for user ID:", userId); // DEBUG LOG
    
    const user = await User.findById(userId);
    console.log("👤 Found user:", user); // DEBUG LOG

    if (!user) {
      console.log("❌ User not found in database"); // DEBUG LOG
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
}