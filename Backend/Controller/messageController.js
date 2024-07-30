import { Message } from "../Models/messageSchema.js";
import { catchAsyncErrors } from "../MiddleWares/catchAsyncErrors.js";
import ErrorHandler from "../MiddleWares/ErrorHandler.js";


export const sendMessage=catchAsyncErrors(async(req,res,next)=>{

    //Fetch data from req.body
    const {FirstName,LastName,Email,Phone,message}=req.body;

    // check if above parameters exists or not

    if(!FirstName || !LastName || !Email || !Phone || !message){
        // return res.status(401).json({
        //     success:false,
        //     message:"Icomplete Data in the request"
        // });
        return next(new ErrorHandler(400,"Please Fill full Form"))
    }

    //Create entry in database
    const dbEntry=await Message.create({
        FirstName,LastName,Email,Phone,message
    })
    return res.status(200).json({
        success:true,
        message:"Database Entry created Successfully",
        dbEntry
    })
})