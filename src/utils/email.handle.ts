import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { Options } from "nodemailer/lib/sendmail-transport";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? "",
  port: Number(process.env.SMTP_PORT) ?? 111,
  auth: {
    user: process.env.SMTP_EMAIL ?? "",
    pass: process.env.SMTP_PASS ?? ""
  }
});

transporter.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("We are ready to send emails");
  }
});

const sendEmail = async (mailOptions: Options) => {
  await transporter.sendMail(mailOptions);
};

export { sendEmail };
