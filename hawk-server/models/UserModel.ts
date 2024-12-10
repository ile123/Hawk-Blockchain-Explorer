import mongoose, { Schema, Model } from "mongoose";
import IUser from "../types/IUser";

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema, "users");

export default User;