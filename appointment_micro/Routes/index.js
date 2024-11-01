import express from "express"
import AppointmentRoutes from './appointment_routes.js'

const app= express()

app.use('/api',AppointmentRoutes)

export default app