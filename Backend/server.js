const express=require("express")
require('dotenv').config()
const cors=require('cors')
const cookieParser= require('cookie-parser')
const fileUpload=require('express-fileupload')
//            or

// import express from "express";
// import { config } from "dotenv";
// config({ path: "./config/config.env" });

const app = express();

PORT=process.env.PORT 

app.listen(PORT, () => {
  console.log(`server liteneing on post https://localhost:${PORT}`);
});


// MiddlWares 


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


    const corsOptions={
      origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
      methods:["GET","POST","PUT","DELETE"],
      credentials:true
    }
    app.use(cors(corsOptions))

    app.use(cookieParser())
    app.use(express.json())

    app.use(express.urlencoded({extended:true}))
    // express.urlencoded() uses querystring library is used to parse urlencoded data and parse nested objects(i.e objects within objects )

    //Eg=> Parsed result: { user: { name: 'John', age: 30 } }


    app.use(fileUpload({
      useTempFiles:true,
      tempFileDir:'/tmp/'
    }));

    require('./Config/database').dbConnect();

    require('./Config/cloudinary').cloudinaryConnect()