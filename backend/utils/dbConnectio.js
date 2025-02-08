import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        mongoose.connection.on("connected",()=>{
            console.log("mongodb connected");
        })
        await mongoose.connect(process.env.DB_URL)
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;