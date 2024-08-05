import mongoose from 'mongoose'
import validator from 'validator'

const appointmentSchema=new mongoose.Schema({
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
        type:Date,
        required:true,
    }
    ,Gender:{
        type:String,
        required:true,
        enum:["Male", "Female"]
    },
    appointment_date:{
        type:String,
        required :true,
    },
    department:{
        type:String,
        required:true
    },
    doctorName:{
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        }
    },
    hasVisited:{
        type:true,
        required:true
    },
    doctorId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    patientId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending"
    }

})

export const AppointmentModel=mongoose.model("AppointmentMod",appointmentSchema)