import {errorHandler} from "../utils/error.js";
import Post from "../models/post.model.js";

export const  create=async (req,res,next)=>{
   if(!req.user.isAdmin){
       return next(errorHandler(403,'you are not allowed to create post'));
   }
   if(!req.body.title || !req.body.content){
       return next(errorHandler(400,'please all the required fields'))
   }
   const slug= req.body.title.split(' ').join('-').toLowerCase()
       .replace(/[^a-zA-z0-9]/g,'');

   const newPost=new Post({
       ...req.body,slug,userId:req.user.id
   })
}