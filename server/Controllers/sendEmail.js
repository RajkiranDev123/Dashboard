import nodemailer from "nodemailer"
import { users } from "../models/usersSchema.js";
export const mail = async () => {

    const totalDocs = await users.countDocuments()

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'rajtech645@gmail.com',
            pass: process.env.email_pass,
        }
    });



    const mailOptions = {
        from: 'rajtech645@gmail.com',
        to: "rajkir783@gmail.com",
        subject: 'Users data report',
        text: `Total users joined ${totalDocs}`
    };

    try {



        await transporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
                console.log(error)


            } else {
                console.log('Email sent: ' + info.response);
                console.log("td",totalDocs)
                console.log( process.env.email_pass)

                return totalDocs


            }
        });

    } catch (error) {
        console.log(error)

    }
}