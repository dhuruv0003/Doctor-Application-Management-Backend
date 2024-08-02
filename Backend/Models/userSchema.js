import mongoose from "mongoose";
import validator from "validator";

const userSchema=mongoose.Schema({
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

    NIC:{
        type:String,
        required:true,
        minLength:[13, "NIC length must contain 13 digits"],
        minLength:[13, "NIC length must contain 13 digits"],
    },
    DOB:{
        type:String,
        required:true,
    }
    ,Gender:{
        type:String,
        required:true,
        enum:["Male", "Female"]
    },
    Password:{
        type:String,
        required:true,
        minLength:[8, "password length must contain at lewast 8 characters"],
        // user will get all details but not password 
        select:false
    },
    Role:{
        type:String,
        required:true,
        enum:["Admin","Patient"]
    },
    doctorDepart:{
        type:String
    },
    docAvatar:{
        public_id:String,
        url:String
    }
    
})

export const UserMod=mongoose.model("User",userSchema) 