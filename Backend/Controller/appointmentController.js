import { catchAsyncErrors } from "../MiddleWares/catchAsyncErrors";
import ErrorHandler from "../MiddleWares/ErrorHandler";
import { AppointmentModel } from "../Models/appointMentSchema";
import { UserMod } from "../Models/userSchema";


export const postAppointment=catchAsyncErrors(async(req,res,next)=>{
    const {FirstName,LastName,Email,Phone,NIC,DOB,Gender,Appointment_date,Department,Doctor_firstName,Doctor_lastName,HasVisited,Address}=req.body;

    if(!FirstName || !LastName || !Email || !Phone || !NIC || !DOB || !Gender || !Appointment_date || !Department || !Doctor_firstName || !Doctor_lastName || !HasVisited  || !Address){
        return next(new ErrorHandler(400, "please Fill details properly"))
    }

    // If there are more then one doctor in same department with same name, then raise error.
    // Note all the doctor's are register in userMod, so verify from there only

    const isDoctorWithSameName=await UserMod.find({
        FirstName:Doctor_firstName,
        LastName:Doctor_lastName,
        Role:"Doctor",
        DoctorDepart:Department
    })

    if(isDoctorWithSameName.length===0){
        return next(new ErrorHandler(404,"Doctor with the given name not found"))
    }

    if(isDoctorWithSameName.length>1){
        return next(new ErrorHandler(400,
            "More than one doctor with given name exists in same department"
        ))
    }


})