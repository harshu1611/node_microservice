import express from "express";
import cors from "cors";
import Routes from './Routes/index.js'

const app = express();
app.use(express.json());
app.use(cors());




app.get("/", (req, res) => {
  res.json({ message: "Appointment Server is running" });
});

//Routes
app.use(Routes);

app.listen(5003, () => {
  // connectQueue();
  console.log(`Appointment Server running on port`);
});
