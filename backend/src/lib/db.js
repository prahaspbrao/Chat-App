import mongoose from "mongoose";
import { ENV } from "./env";


export const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(ENV.MONGO_URI);

        console.log("MongoDb connected : " , conn.connection.host);
    } catch (error) {
        console.error("Error connection to MongoDB : ", error);
        process.exit(1);  //status code means fail , 0 means success
    }
}