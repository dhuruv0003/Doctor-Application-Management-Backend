import ErrorHandler from "../MiddleWares/ErrorHandler.js";
import { UserMod } from "../Models/userSchema.js";
import { catchAsyncErrors } from "../MiddleWares/catchAsyncErrors.js";

export const register=catchAsyncErrors(async(req,res,next)=>{
    const {FirstName,LastName,Email,Phone,NIC, DOB,Gender,Password,Role}=req.body;
    if(!FirstName || !LastName || !Email||!Phone || !NIC || !DOB || !Gender || !Password|| !Role){
        return next(new ErrorHandler(400,"please fill the form properly"))
    }

    const userExist= await UserMod.findOne({Email});
    if(userExist){
        return next(new ErrorHandler(400,"user already exists"));
    }

    const dbEntry=await UserMod.create({
        FirstName,LastName,Email,Phone,NIC, DOB,Gender,Password,Role
    })

    return res.status(200).json({
        success:true,
        message:"DB entry created successfully",
        dbEntry
    })


}

)