import express from "express";
import cors from "cors";
import Routes from "./routes/index.js";
import amqp from "amqplib";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.json({ message: "Auth Server is runnin" });
});

//Routes
app.use(Routes);

app.listen(5001, () => {

  console.log(`Server running on port`);
});
