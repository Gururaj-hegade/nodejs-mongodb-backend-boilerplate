// Import Dependencies
import mongoose  from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const vendorSchema=new mongoose.Schema({
    shopName:{
        type:String,
        required:true,
        maxlength:40,
        unique:true
    },
    vendorName:{
        type:String,
        required:true,
        maxlength:30
    },
    bio:{
        type:String,
        maxlength:1000,
        default:""
    },
    phoneNo:{
        type:Number,
        required:true
    },
    emailId:{
        type:String,
        required:[true,'Please provide an email'], 
        validate:[validator.isEmail,'Please enter email in correct format'],
        unique:true
    },
    token:{
        type:String
    }

},
{
    timestamps:true 
})

// create and return jwt token 
vendorSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRY 
    })
}

const Vendor = mongoose.model("Vendor",vendorSchema);
export default Vendor;