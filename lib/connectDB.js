import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB conected sucessfully")
    } catch (error) {
        console.log("failed to connect",error)
    }
}
export default connectDB;