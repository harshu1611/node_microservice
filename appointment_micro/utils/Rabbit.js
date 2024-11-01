import amqp from "amqplib"

var connection,channel
export async function connectQueue() {
    try {
      connection = await amqp.connect(process.env.RABBIT_MQ_URL);
      channel = await connection.createChannel();
  
      await channel.assertQueue("test-queue");
    } catch (error) {
      console.log(error);
    }
  }
  
  export const sendData=async(data)=>{
      await channel.sendToQueue("test-queue",Buffer.from(JSON.stringify(data)));

      await channel.close();
      await connection.close()
  
  }