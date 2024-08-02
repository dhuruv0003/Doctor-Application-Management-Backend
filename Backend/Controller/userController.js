import ErrorHandler from "../MiddleWares/ErrorHandler.js";
import { UserMod } from "../Models/userSchema.js";
import { catchAsyncErrors } from "../MiddleWares/catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";

export const register = catchAsyncErrors(async (req, res, next) => {
  const {
    FirstName,
    LastName,
    Email,
    Phone,
    NIC,
    DOB,
    Gender,
    Password,
    Role,
  } = req.body;
  if (
    !FirstName ||
    !LastName ||
    !Email ||
    !Phone ||
    !NIC ||
    !DOB ||
    !Gender ||
    !Password ||
    !Role
  ) {
    return next(new ErrorHandler(400, "please fill the form properly"));
  }

  const userExist = await UserMod.findOne({ Email });
  if (userExist) {
    return next(new ErrorHandler(400, "user already exists"));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(Password, 10);
  } catch (error) {
    return next(new ErrorHandler(400, "Password cannot be hashed"));
  }

  const dbEntry = await UserMod.create({
    FirstName,
    LastName,
    Email,
    Phone,
    NIC,
    DOB,
    Gender,
    Password: hashedPassword,
    Role,
  });

  return res.status(200).json({
    success: true,
    message: "DB entry created successfully",
    dbEntry,
  });
});

export const userLogin = catchAsyncErrors(async (req, res, next) => {
  const { Email, Password, ConfirmPassword, Role } = req.body;

  if (!Email || !Password || !ConfirmPassword || !Role) {
    next(new ErrorHandler(400, "Please fill details carefully"));
  }
  if (Password != ConfirmPassword) {
    next(new ErrorHandler(400, "Password does not match"));
  }
  let userExist = await UserMod.findOne({ Email });
  if (!userExist) {
    next(new ErrorHandler(400, "Invalid password or email"));
  }

  const payload = {
    email: userExist.email,
    id: userExist._id,
    role: userExist.Role,
  };

  if (await bcrypt.compare(Password, userExist.Password)) {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "2h",
    });

    userExist = userExist.toObject();
    userExist.token = token;
    userExist.password = undefined;

    return res.status(202).json({
      success: true,
      token,
      userExist,
      message: "User Logged in successfully",
    });
  } else {
    next(new ErrorHandler(400, "Error aa gya"));
  }
});
