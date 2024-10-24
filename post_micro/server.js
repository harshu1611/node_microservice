import express, { json } from "express"
import Routes from './Routes/index.js'
import cors from "cors"
const app = express()

app.use(express.json())
app.use(cors())
app.use(Routes)
app.listen(5002,(req,res)=>{
    console.log('Post server running')
})