import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://drdarkcraters:Zqo0cUSzwcc58KNR@cluster0.npebz3y.mongodb.net/delri').then(()=>console.log("DB Connected"))
}

