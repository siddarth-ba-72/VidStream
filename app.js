import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
// import cors from "cors";
import ErrorMiddleware from "./middlewares/Error.js";
import path from "path"

dotenv.config({
  path: './config/config.env',
});

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );

import courseRoutes from './routes/courseRoutes.js';
import userRoutes from './routes/userRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import otherRoutes from './routes/otherRoutes.js';

app.use('/api/vs/courses', courseRoutes);
app.use('/api/vs/users', userRoutes);
app.use('/api/vs/payments', paymentRoutes);
app.use('/api/vs/others', otherRoutes);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.use(ErrorMiddleware);

export default app;