import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./ErrorHandler.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { UserMod } from "../Models/userSchema.js";

export const isAdminAuthentication=catchAsyncErrors(async(req,res,next)=>{
    // Note=> in req.cookies.adminToken, the admintoken is the value tha we gave in cookieToken, which will be Patienttoken in case of role = patient 
    const token=req.cookies.AdminToken;

    if(!token){
        return next(new ErrorHandler(400,"Admin Not authorised"));
    }
    // decoded is the payload From the jwt token
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)

    req.user=decoded
    if(req.user.role!=="Admin"){
        return next(new ErrorHandler(403,`${req.user.Role} not authorized`,))
    }
    next();
})

export const isPatientAuthentication=catchAsyncErrors(async(req,res,next)=>{
    // Note=> in req.cookies.adminToken, the admintoken is the value tha we gave in cookieToken, which will be Patienttoken in case of role = patient 
    const token=req.cookies.PatientToken;

    if(!token){
        next(new ErrorHandler(400,"Patient not authorised"));
    }
    // decoded is the payload From the jwt token
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)

    req.user=decoded
    if(req.user.role!=="Patient"){
        return next(new ErrorHandler(403,`${req.user.Role} not authorized`,))
    }
    next();
})