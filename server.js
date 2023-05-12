import app from './app.js';
import { connectDataBase } from './database/connectDatabase.js';
import cloudinary from "cloudinary";
import nodeCron from 'node-cron';
import RazorPay from 'razorpay';
import { Stats } from './models/Stats.js';
import colors from 'colors';

connectDataBase();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

export const instance = new RazorPay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET
});

nodeCron.schedule("0 0 0 5 * *", async () => {
  try {
    await Stats.create({});
  } catch (error) {
    console.log(error);
  };
});

app.listen(process.env.PORT, () => {
  console.log(`Server running actively on: http://localhost:${process.env.PORT}`.bgCyan.black.bold);
});