import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
 try {
  await mongoose.connect(process.env.DB_URL as string);
  console.log("Database connected");
 } catch (error) {
  console.log("Database error", error);
 }
};