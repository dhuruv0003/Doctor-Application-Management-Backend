import { catchAsyncErrors } from "../MiddleWares/catchAsyncErrors";
import ErrorHandler from "../MiddleWares/ErrorHandler";


export const postAppointment=catchAsyncErrors(async(req,res,next)=>{
    const {FirstName,LastName,Email,Phone,NIC,DOB,Gender,Appointment_date,Department,Doctor_firstName,Doctor_lastName,HasVisited,Address}=req.body;

    if(!FirstName || !LastName || !Email || !Phone || !NIC || !DOB || !Gender || !Appointment_date || !Department || !Doctor_firstName || !Doctor_lastName || !HasVisited  || !Address){
        return next(new ErrorHandler(400, "please Fill details properly"))
    }
})