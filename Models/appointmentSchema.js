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
    Appointment_date:{
        type:Date,
        required :true,
    },
    Department:{
        type:String,
        required:true
    },
    Doctor:{
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        }
    },
    HasVisited:{
        // To check wether the user has earlier visited or not
        type:Boolean,
        default:false
    },
    DoctorId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    PatientId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending"
    }

})

export const AppointmentModel=mongoose.model("AppointmentMod",appointmentSchema)