import { catchAsyncErrors } from "../MiddleWares/catchAsyncErrors.js";
import ErrorHandler from "../MiddleWares/ErrorHandler.js";
import { AppointmentModel } from "../Models/appointMentSchema.js";
import { UserMod } from "../Models/userSchema.js";


export const postAppointment=catchAsyncErrors(async(req,res,next)=>{
        const {FirstName,LastName,Email,Phone,NIC,DOB,Gender,Appointment_date,Department,Doctor_firstName,Doctor_lastName,HasVisited,Address}=req.body;

        if(!FirstName || !LastName || !Email || !Phone || !NIC || !DOB || !Gender || !Appointment_date || !Department || !Doctor_firstName || !Doctor_lastName  || !Address){
            return next(new ErrorHandler(400, "please Fill details properly"))
        }

        // If there are more then one doctor in same department with same name, then raise error.
        // Note all the doctor's are register in userMod, so verify from there only

        const isDoctorConflict=await UserMod.find({
            FirstName:Doctor_firstName,
            LastName:Doctor_lastName,
            Role:"Doctor",
            DoctorDepart:Department
        })
        // above code return array with doctor having same name 

        if(isDoctorConflict.length===0){
            return next(new ErrorHandler(404,"Doctor with the given name not found"))
        }

        if(isDoctorConflict.length>1){
            return next(new ErrorHandler(400,
                "More than one doctor with given name exists in same department, please contact through email"
            ));
        };

        // if any doctor found
        const DoctorId=isDoctorConflict[0]._id
        // jaise hi patient login k rega, uska payload req.user me store ho jayega 
        const PatientId=req.user._id


        const dbEntry=await AppointmentModel.create({
            FirstName,LastName,Email,Phone,NIC,DOB,Gender,Appointment_date,Department,
            Doctor:{
                firstName:Doctor_firstName,
                lastName:Doctor_lastName
            },PatientId,DoctorId
            ,HasVisited,Address
        })

        return res.status(200).json({
            success:true,
            message:"Appointment Sent Successfully",
            dbEntry
        })

})

export const getAllAppointments= catchAsyncErrors(async(req,res,next)=>{
        const allAppoint=await AppointmentModel.find();
        res.status(200).json({
            success:true,
            allAppoint
        })
})

export const updateAppointmentStatus=catchAsyncErrors(async(req,res,next)=>{
        // find specefic appointment id whose status you want to update
        console.log(req.body);

        const {id}=req.params;
        let appointment=await AppointmentModel.findById(id);
        if(!appointment){
            return next(new ErrorHandler(404,"Appointment Not Found"))
        }
    // Now update the request
        console.log(req.body);
        
        appointment=await AppointmentModel.findByIdAndUpdate(id,req.body
            ,{
                //using req.body jo bhi req ki body me type krege postman par wo hissah update ho jayega, so we can update any thing in the request.
                // but here we have to update only status so we can also write {Status} or req.body.status  
            new:true,
            runValidators:true,
            useFindAndModify:false
        })
        console.log(req.body);
        
        res.status(200).json({
            success:true,
            message:"Appointment Updated",
            appointment
        })

})

export const deleteAppointment=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params;

    let appointment=await AppointmentModel.findById(id);

    if(!appointment){
        return next(new ErrorHandler(404,"Appointment Not Found"))
    }

    await AppointmentModel.deleteOne()
    res.status(200).json({
        success:true,
        message:"Message Deleted SuccessFully"
    })
})