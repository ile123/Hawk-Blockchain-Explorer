import mongoose from "mongoose";
import axios from "axios";
import { config } from "./config/dotenv";

export const connectToDatabase = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to the database");
  } catch (error) {
    console.error(error);
  }
};

export const sendRpcRequest = async (method: any, params: any[] = []) => {
  try {
    const response = await axios.post(
      config.API_URL,
      {
        jsonrpc: "2.0",
        id: 1,
        method: method,
        params: params,
      },
      {
        auth: {
          username: config.USERNAME,
          password: config.PASSWORD,
        },
      }
    );
    return response.data.result;
  } catch (error: any) {
    console.error("Error:", error.response?.data?.error || error.message);
  }
};
