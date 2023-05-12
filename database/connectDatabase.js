import mongoose from "mongoose";
import colors from 'colors';

export const connectDataBase = async () => {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected with ${connection.host}`.bgBlue.black.bold);
};
