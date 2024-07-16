import mongoose from "mongoose";
import validator from "validator";

const messageSchema=new mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
        //the second part of array is the error, tha occurs.
        minLength:[3,"FirstName must contain at least 3 characters"]
    },
    LastName:{
        type:String,
        required:true,
        minLength:[3,"LastName must contain at least 3 characters"]
    },
    Email:{
        type:String,
        required:true,
        // validate to check wheteher the 
        validate:[validator.isEmail,"Please Provide a valid email"]
    },
    Phone:{
        // here type is kept string in order to define minLength and maxLength
        type:String,
        required:true,
        minLength:[10, "Phone Number length must contain 10 digits"],
        maxLength:[10, "Phone Number length must contain 10 digits"]
    },
    message:{
        type:String,
        required:true,
        minLength:[10, "Message Number length must contain 10 characters"],
    }
})

export const Message =mongoose.model("Message",messageSchema);

