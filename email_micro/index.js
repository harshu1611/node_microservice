import express, { json } from "express"
import cors from "cors"
import { connectQueue } from "./utils/Rabbit.js"
const app = express()

app.use(express.json())
app.use(cors())

app.listen(5004,(req,res)=>{
    connectQueue()
    console.log('Post server running')
})