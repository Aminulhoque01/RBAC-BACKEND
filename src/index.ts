import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
 

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
// app.use("/api/v1", routes);

// database connection + server start
async function startServer() {
  try {

    await mongoose.connect(process.env.DB_URL as string);
    console.log("Database Connected");

    app.listen(port, () => {
      console.log(`Server running on ${port}`);
    });

  } catch (error) {
    console.log("Server Error:", error);
  }
}

startServer();