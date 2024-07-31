import ErrorHandler from "../MiddleWares/ErrorHandler";
import { UserMod } from "../Models/userSchema";


const register=async(req,res,next)=>{
    const {FirstName,LastName,Email,Phone,NIC, dob,gender,password,role}=req.body;
    if(!FirstName || !LastName || !Email||!Phone,NIC || !dob || !gender || !password || !role){
        return next(new ErrorHandler(400,"please fill the form properly"))
    }

    const userExist= await UserMod.findOne({email});
    if(userExist){
        return next(new ErrorHandler(400,"user already exists"));
    }
    

}