import mongoose, { Model } from "mongoose";
import IUser from "../types/IUser";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  viewedTransactions: {
    type: [String],
    default: [],
  },
  viewedBlocks: {
    type: [String],
    default: [],
  },
  viewedWallets: {
    type: [String],
    default: [],
  }
}, { timestamps: true });

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema, "users");

export default User;