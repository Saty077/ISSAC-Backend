import express from "express";
import OpenAI from "openai";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use("/api", chatRoutes);

app.get("/test", async (req, res) => {
  res.json({
    message: "test6: corred bug for test 4!",
  });
});

app.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
  connectDB();
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("connected to DB");
  } catch (error) {
    console.log("failed to connect with DB", error);
  }
};
