import { ObjectId } from "mongoose";

type IUser = {
  email: string;
  password: string;
  viewedTransactions: string[];
  viewedBlocks: string[];
  viewedWallets: string[];
};

export default IUser;
