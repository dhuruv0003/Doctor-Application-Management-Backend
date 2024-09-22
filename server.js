import express from "express"

import cookieParser from "cookie-parser";

import cors from "cors";
import 'dotenv/config'
import cloudinary from 'cloudinary'
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./MiddleWares/errorMiddleWare.js";
//            or

// import express from "express";
// import { config } from "dotenv";
// config({ path: "./config/config.env" });

const app = express();


app.use(cors(
  {
    origin: ['http://localhost:5173', process.env.FRONTEND_URL_TWO],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
    
  }
))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const PORT=process.env.PORT || 6000
app.listen(PORT, () => {
  console.log(`server liteneing on post https://localhost:${PORT}`);
});


// MiddlWares 


    app.use(cookieParser())
    app.use(express.json())

    // cors is used to connect frontend to backend

    // CORS (Cross-Origin Resource Sharing) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the resource originated. This is crucial for enabling web applications to communicate with each other across different origins.

    // const corsOptions = {
    //   origin: 'http://example.com', // Allow only requests from this origin
    //   methods: ['GET', 'POST'], // Allow only these HTTP methods
    //   allowedHeaders: ['Content-Type', 'Authorization'], // Allow only these headers
    //   credentials: true, // Allow credentials (cookies, authorization headers, TLS client certificates)
    //   optionsSuccessStatus: 200 // Response status for preflight requests (OPTIONS)
    // };

    // app.use(cors(corsOptions));


    
  
    app.use(express.urlencoded({extended:true}))
    // express.urlencoded() uses querystring library is used to parse urlencoded data and parse nested objects(i.e objects within objects )

    //Eg=> Parsed result: { user: { name: 'John', age: 30 } }

    app.use(fileUpload({
      useTempFiles:true,
      tempFileDir:'/tmp/'
    }));

    import  messageRoute from './Routes/messageRoute.js'
    app.use('/api/v1/message',messageRoute);

    import userRoute from './Routes/userRoute.js'
    app.use('/api/v1/user',userRoute)

    import appointmentRoute from './Routes/appointmentRoute.js'

    app.use('/api/v1/appointment',appointmentRoute)

    import {dbConnect} from  './Config/database.js'
    dbConnect()

    import {cloudinaryConnect} from "./Config/cloudinary.js"
    cloudinaryConnect();


    app.use(errorMiddleware);