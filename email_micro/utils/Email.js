import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const transporter = nodemailer.createTransport({
    service:"Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth:{
        user: process.env.SMTP_USER_EMAIL,
        pass:process.env.SMTP_USER_PASS
    }
  });

  

  export const sendUserMail=async(user,doctor,timestamp)=>{
    var date=new Date(timestamp)
    // console.log(user,typeof(user))
    const mailOptions = {
        from: process.env.SMTP_USER_EMAIL,
        to: user.user.email,
        subject: "Appointment Confirmation",
        text: `Your apppointment is confirmed with ${doctor.user.name} at ${date.toString()}`,
      };

     transporter.sendMail(mailOptions,(error,info)=>{
        if (error) {
            console.error("Error sending email: ", error);
          } else {
            console.log("Email sent: ", info.response);
          }
     })
  }

export const sendDoctorMail=async(user,doctor,timestamp)=>{
    var date=new Date(timestamp)
    // console.log(user,typeof(user))
    const mailOptions = {
        from: process.env.SMTP_USER_EMAIL,
        to: doctor.user.email,
        subject: "Appointment Confirmation",
        text: `Your apppointment is confirmed with ${user.user.name} at ${date.toString()}`,
      };

     transporter.sendMail(mailOptions,(error,info)=>{
        if (error) {
            console.error("Error sending email: ", error);
          } else {
            console.log("Email sent: ", info.response);
          }
     })
}