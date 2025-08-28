import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   _id: { type: String, required: true },
   name: { type: String },         // keep temporarily
   firstName: { type: String },
   lastName: { type: String },
   email: { type: String, required: true },
   image: { type: String, required: true },
   role: { type: String, enum: ["user", "admin"], default: "user" }
});

const User = mongoose.model("User", userSchema);

export default User;
