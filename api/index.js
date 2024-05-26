import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const app = express();


mongoose.connect(process.env.MONGO_DB).then(()=>{
        console.log('MongoDB Connected!');
}).catch(err=>{
    console.log(err);
})
app.listen(8000,()=>{
    console.log("Server running on port 3000");
})