import express from "express"
import { newAppointment } from "../Controllers/appointmentController.js";

const app=express();

app.post('/appointment/new',newAppointment)

export default app