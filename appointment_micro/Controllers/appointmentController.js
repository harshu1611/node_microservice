import prisma from "../config/Prisma.js";
import { connectQueue, sendData } from "../utils/Rabbit.js";

export const newAppointment = async (req, res) => {
  try {
    const appointment = req.body;

    const newAppointment = await prisma.appointments.create({
      data: appointment,
    });

    if (newAppointment) {
      await connectQueue();
      await sendData(newAppointment);
    }
    res.status(200).json({ message: "Booking Successful" });
  } catch (error) {
    res.status(500).json({ message: "Something Error Occured" });
  }
};
