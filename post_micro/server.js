import express, { json } from "express"
import Routes from './Routes/index.js'
import amqp from "amqplib"
import cors from "cors"
import axios from "axios"
const app = express()

app.use(express.json())
app.use(cors())
app.use(Routes)


app.listen(5002,(req,res)=>{
    console.log('Post server running')
})