// const express=require("express")
// require('dotenv').config()
//            or

import express from "express";
import { config } from "dotenv";
config({ path: "./config/config.env" });

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`server liteneing on post https://localhost:${process.env.PORT}`);
});

// cors is used to connect frontend  to backend

app.use(
    cors({
        
    })
);
