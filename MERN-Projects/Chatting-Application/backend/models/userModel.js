import mongoose from "mongoose";

const userModel=new mongoose.Schema({
    FullName:{
        type:String,
        required:true
    },
    UserName:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    },
    ProfilePhoto:{
        type:String,
        default:""
    },
    Gender:{
        type:String,
        enum:["Male","Female"],
        required:true
    }
},{timestamps:true});
export const User=mongoose.model("User",userModel);