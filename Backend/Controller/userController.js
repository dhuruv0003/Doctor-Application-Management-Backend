import { UserMod } from "../Models/userSchema";

const register=async(req,res,next)=>{
    const {FirstName,LastName,Email,Phone,NIC, dob,gender,password,role}=req.body;
}