import User from "../models/User.js";
import bigPromise from "./bigPromise.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { json } from "express";
import Vendor from "../models/vendor.js";

dotenv.config()
//const SECRET_KEY="VENDOR"
export const auth =bigPromise((req,res,next)=>{
    try{
        let token=req.headers.authorization;
        if(token){
            token=token.split(" ")[1];
            let decode = jwt.verify(token,process.env.JWT_SECRET)
            req.userid=decode.id;
           // console.log("hello "+decode);
        }else{
            res.status(401).json({message:"No token"});
        }
        
        next(); 
    }catch(error){
        console.log(error);
        return res.status(401).json({msg:"UnAuthorised user"});
    }
})

