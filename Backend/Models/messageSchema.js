const mongoose=require('mongoose')
const validator = require('validator')

const messageSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First Name must contain at least 3 characters"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"First Name must contain at least 3 characters"]
    },
    email:{
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

module.exports=mongoose.model("message",messageSchema);

