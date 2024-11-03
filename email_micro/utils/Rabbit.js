import amqp from "amqplib"
import axios from "axios"
import { sendDoctorMail, sendUserMail } from "./Email.js"
var connection,channel



const refresh=async()=>{
  const refreshStatus=await axios.get('https://auth-microservice-khs4.onrender.com/') //to turn on the server render instance.
  
  return refreshStatus.status

}

const getUserData=async(id)=>{
    // console.log(typeof id)
    const refreshCode=refresh()
    if(refreshCode===200){
      const userData=await axios.get(`https://auth-microservice-khs4.onrender.com/api/auth/user/${id}`)
      // console.log(userData.data)
      return userData.data
    }
    else {
        getUserData(id)
    }
    
}

export async function connectQueue() {
    try {
      connection = await amqp.connect(process.env.RABBIT_MQ_URL);
      channel = await connection.createChannel();
  
      await channel.assertQueue("test-queue");
  
      channel.consume("test-queue", async (data) => {
        if (data !== null) {
          try {
            const json = JSON.parse(data.content.toString());
            const user = await getUserData(json.userId);
            const doctor = await getUserData(json.doctorId);
  
            await sendUserMail(user, doctor, json.schedule);
            await sendDoctorMail(user, doctor, json.schedule);
  
            channel.ack(data);
          } catch (error) {
            console.error("Error processing message:", error);
            channel.nack(data, false, true); 
          }
        }
      });
  
      setupCloseHandlers();
      console.log("RabbitMQ consumer connected and running.");
  
      return { connection, channel };
    } catch (error) {
      console.log("Error connecting to RabbitMQ:", error);
      setTimeout(connectQueue, 5000); // Retry connection after 5 seconds
    }
  }
  const setupCloseHandlers = () => {
    connection.on("close", () => {
      console.error("RabbitMQ connection closed. Reconnecting...");
      connectQueue(); // Reconnect on connection close
    });
  
    connection.on("error", (error) => {
      console.error("RabbitMQ connection error:", error);
      connectQueue(); // Reconnect on connection error
    });
  }