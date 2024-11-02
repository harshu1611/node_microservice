import express from "express";
import cors from "cors";
import { connectQueue } from "./utils/Rabbit.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

let rabbitChannel;

const initializeRabbitMQ = async () => {
  try {
     await connectQueue();
    console.log("RabbitMQ connection established successfully");
  } catch (error) {
    console.error("Error establishing RabbitMQ connection:", error);
  }
};

app.get("/",(req,res)=>{
    res.json({message:"Email Service is Running"})
})

app.listen(5004,async () => {
  await initializeRabbitMQ();  // Initialize RabbitMQ when the server starts
  console.log("Email server running");
});

// Use rabbitChannel for other parts of your app as needed
