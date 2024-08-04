import ErrorHandler from "../MiddleWares/ErrorHandler.js";
import { UserMod } from "../Models/userSchema.js";
import { catchAsyncErrors } from "../MiddleWares/catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";

  export const PatientRegister = catchAsyncErrors(async (req, res, next) => {
    const { FirstName,LastName,Email,Phone,NIC,DOB,Gender,Password ,ConfirmPassword} = req.body;

    if (!FirstName ||!LastName ||!Email ||!Phone ||!NIC ||!DOB ||!Gender ||!Password || !ConfirmPassword) 
    {
      return next(new ErrorHandler(400, "please fill the form properly"));
    }

    if(ConfirmPassword!==Password){
      return next(new ErrorHandler(400,"Password and Confirm password do not match"))
    }

    const userExist = await UserMod.findOne({ Email });
    if (userExist) {
      return next(new ErrorHandler(400,`${userExist.Role} with this email already exists`));
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(Password, 10);
    } catch (error) {
      return next(new ErrorHandler(400, "Password cannot be hashed"));
    }

    let dbEntry = await UserMod.create({
      FirstName, LastName, Email,Phone,NIC,DOB,Gender,Password: hashedPassword,Role:"Patient",
    });

    const token=jwt.sign({id:dbEntry._id, Role:dbEntry.Role},process.env.JWT_SECRET_KEY,{
      expiresIn: "2h",
    })

    const options={ expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true}

    const cookieToken=dbEntry.Role==="Patient"?"PatientToken":"AdminToken"

    return res.cookie(cookieToken,token,options).status(200).json({
      success: true,
      message: "DB entry created successfully",
      dbEntry,
      token
    });
  });

  export const userLogin = catchAsyncErrors(async (req, res, next) => {
    const { Email, Password, Role } = req.body;

    if (!Email || !Password || !Role) {
      return next(new ErrorHandler(400, "Please fill details properly"));
    }

  

    let userExist = await UserMod.findOne({ Email });

    if (!userExist) {
      return next(new ErrorHandler(400, "Invalid password or email"));
    }

    if (Role !== userExist.Role) {
      return next(new ErrorHandler(400, "Role does not match"));
    }

    const payload = {
      email: userExist.Email,
      id: userExist._id,
      role: userExist.Role,
    };

    if (await bcrypt.compare(Password, userExist.Password)) {
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "2h",
      });

      userExist = userExist.toObject();
      userExist.token = token;
      userExist.Password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      const cookieToken =
        userExist.Role === "Admin" ? "AdminToken" : "PatientToken";
      return res.cookie(cookieToken, token, options).status(202).json({
        success: true,
        token,
        userExist,
        message: "User Logged in successfully",
      });
    } else {
      next(new ErrorHandler(400, "Invalid password"));
    }
  });

  export const adminRegister = catchAsyncErrors(async (req, res, next) => {
          const {FirstName,LastName,Email,Phone,NIC,DOB,Gender,Password,ConfirmPassword}=req.body;

          if(!FirstName ||!LastName ||!Email ||!Phone ||!NIC ||!DOB ||!Gender ||!Password || !ConfirmPassword){
              return next(new ErrorHandler(400,"please fill details properly"));
          }

          if(ConfirmPassword!==Password){
            return next(new ErrorHandler(400,"Password and Confirm password do not match"))
          }

          const AdminExist=await UserMod.findOne({Email})

          if(AdminExist){
              return next(new ErrorHandler(400, `${AdminExist.Role} with this email Already exists`))
          }

          let hashedPassword;
          try {
              hashedPassword=await bcrypt.hash(Password,10);
          } catch (error) {
              next(new ErrorHandler(400,"Password cannot be hashed"))
          }
          
          const dbEntry=await UserMod.create({
              FirstName,LastName,Email,Phone,NIC,DOB,Gender,Password:hashedPassword,Role:"Admin"
          }) 
        
          return res.status(200).json({
            success: true,
            message: "DB entry created successfully",
            dbEntry,
          });
        
      }
  );

  export const getAllDoctors=catchAsyncErrors(async(req,res,next)=>{
    const doctors=await UserMod.find({Role:"Doctor"});
    return res.status(200).json({
      success:true,
      doctors
    })
  })

  export const getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    // authenticate karne ke baad to req.user me jo bhi details hai usko display karo, i.e tokens' payload 
    const user=req.user
    return res.status(200).json({
      success:true,
      user
    })
  })

  export const logOutAdmin=catchAsyncErrors(async(req,res,next)=>{
    // remove AdminToken from the cokie
    return res.status(200).cookie("AdminToken",undefined,{
      httpOnly:true,
      expires:new Date(Date.now())
    }).json({
      success:true,
      message:"User LoggedOut successfully"
    })
  })

  export const logOutPatient=catchAsyncErrors(async (req,res,next) => {
    const options={
      httpOnly:true,
      expires:new Date(Date.now())
    }
    return res.cookie("PatientToken",undefined,options).status(200).json({
      success:true,
      message:"Patient LoggedOut Successfully "
    })
  })
  
  export const addnewDoctor=catchAsyncErrors(async(req,res,next)=>{

    //Agar req.files empty hai, ya req.files ki length =0 ha toh return error
    if(!req.files || Object.keys(req.files).length==0){
      return next(new ErrorHandler(400,"Doctor Avtar Not Found"))
    }
  }) 

