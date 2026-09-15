// There are two main apporach to connect the database:

// require('dotenv').config({path:'./env'})
import dns from "dns";
import { app } from "./app.js";

import dotenv from "dotenv";   // to make consitency use this import syntax so that code 
//looks better rather than the require method

// import mongoose from "mongoose";          
// import { DB_NAME } from "./constants";

dns.setServers(["8.8.8.8"]);
dotenv.config({path:'./env'})

// this is the 2nd approach which is stadard practice

import connectDB from "./db/index.js";

connectDB()
.then(()=>{
    app.on("Error",(error)=>{
        console.log("Error: ",error)
    })
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at: ${process.env.PORT}`)
    })

})
.catch((error)=>{
    console.log("MongoDB connection failed!!!: ",error)
})




// Below is the first approach to connnect the database:

/*
import express from "express"
const app= express()

(async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("ERROR",(error)=>{
            console.log("Error: ",error)
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on Port: ${process.env.PORT}`);
        })
    }
    catch(error) {
        console.log("Error", error)
        throw error
    }
})()
    */