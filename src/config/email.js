import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"Quiz App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text
    });
    return true;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
};