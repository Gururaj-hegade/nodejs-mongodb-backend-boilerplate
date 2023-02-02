import Vendor from "../models/vendor.js";
import bigPromise from "../middlewares/bigPromise.js";
import { cookieToken } from "../utils/cookieToken.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { token } from "morgan";
dotenv.config()


export const addVendor=bigPromise(async(req,res,next)=>{
   const {shopName,vendorName,phoneNo,bio,emailId}=req.body; 
    console.log(shopName);    
    if((!shopName) & (!emailId) & (!vendorName) & (!phoneNo)){
        return res.status(400).json({
            success:false, 
            message:"All fields are required!" 
        })
    }

    const existingVendor = await Vendor.findOne({emailId:emailId})
    if(existingVendor){
        return res.status(500).json({ 
            success:true, 
            message:"Vendor Already Exists !", 
        })
    }
    
    const vendor=await Vendor.create({ 
        shopName, 
        vendorName,
        bio, 
        phoneNo,
        emailId,

    })
    
     cookieToken(vendor,res,"Added Successfully!");
});
    


export const getVendors=bigPromise(async(req,res,next)=>{
    
        Vendor.find({}).then(
          (vendor) => {
            res.status(200).json(vendor);
          }
        ).catch(
          (error) => {
            res.status(404).json({
              error: error
            });
          }
        );
})


export const deleteVendor=bigPromise(async(req,res,next)=>{
    const {emailId}=req.body;
    
    const found= await Vendor.findOneAndDelete({emailId:emailId});
    if(!found){
        return res.status(400).json({
            success:false, 
            message:"vendor not found" 
        })
    }else{
        return res.status(200).json({
            success:true,
            message:"vendor deleted"
        })
    }
})


export const getOneVendor=async (req,res,next)=>{
    const uid=req.userid;

    console.log(uid);
    const found=await Vendor.findById({_id:uid});
    if(!found){
        return res.status(400).json({
            success:false, 
            message:"vendor not found" 
        })
    }else{
        return res.status(200).json({
            success:true,
            message:found
        })
    }
}
