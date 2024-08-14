import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    content:{type:String,required:true},
    title:{type:String,required:true,unique:true},
    image:{type:String,required:true,default:'https://i.ytimg.com/vi/SG2KCNLbY8Q/hqdefault.jpg'},
    category:{type:String,default:'uncategorized'},
    slug:{type:String,required:true,unique:true},
},{ timestamps: true });

const Post=mongoose.model("Post",postSchema);

export default Post