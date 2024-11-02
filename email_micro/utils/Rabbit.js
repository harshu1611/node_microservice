import amqp from "amqplib"
import axios from "axios"
import { sendDoctorMail, sendUserMail } from "./Email.js"
var connection,channel

const getUserData=async(id)=>{
    // console.log(typeof id)
    const userData=await axios.get(`https://auth-microservice-khs4.onrender.com/api/auth/user/${id}`)
    // console.log(userData.data)
    return userData.data
}

export async function connectQueue() {
    try {
        connection = await amqp.connect(process.env.RABBIT_MQ_URL);
        channel    = await connection.createChannel()
        
        await channel.assertQueue("test-queue")
        channel.consume("test-queue", async(data) => {
            // console.log(`${Buffer.from(data.content)}`,typeof(Buffer.from(data.content)));
            // console.log((data.content))
            const json= JSON.parse(data.content)
            const user=await getUserData(json.userId)
            const doctor= await getUserData(json.doctorId)

             await sendUserMail(user,doctor,json.schedule)
             await sendDoctorMail(user,doctor,json.schedule)

            channel.ack(data)

            return {connection,channel}
        })
    } catch (error) {
        console.log(error);
    }
}