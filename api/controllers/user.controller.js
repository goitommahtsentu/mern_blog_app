
import mongoose from "mongoose";
import User from "../models/user.model.js";

export const test=async (req,res)=>{
        res.json({message:"Hello World"});
}