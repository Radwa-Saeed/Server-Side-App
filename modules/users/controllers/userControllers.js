const User = require('../model/userModel')
const {StatusCodes}=require('http-status-codes')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Post = require('../../posts/model/postModel')

const sign_up = async (req,res)=>{
    const {username,email,password,cpassword,phone,location,role}=req.body
    try {
        const found = await User.findOne({email,isDeleted:false});
        if (found){
            res.status(StatusCodes.BAD_REQUEST).json({message:'FAILED TO SIGN UP ... THIS EMAIL IS ALLREADY EXIST !'})
        }
        else{
            if (password==cpassword){
                //const enc_phone =  jwt.sign(phone,process.env.SECRET_KEY)
                //console.log(enc_phone)
                const newUser = new User({username,email,password,phone,location,role})
                const user = await newUser.save()
                res.status(StatusCodes.CREATED).json({message:'SIGNED UP SUCCESSFULLY'})
            }
            else{
                res.status(StatusCodes.BAD_REQUEST).json({message:'PASSWORDS ARE NOT IDENTICAL'})
            }
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
}

const sign_in = async (req,res)=>{
    const{email,password}=req.body
    try {
        const found = await User.findOne({email})
        if (!found){
            res.status(StatusCodes.BAD_REQUEST).json({message:"THIS EMAIL IS INVALID"})
        }
        else{
            if(!found.isBlocked){
                const match = await bcrypt.compare(password,found.password);
                if (match){
                    const token = jwt.sign({_id:found._id,role:found.role},process.env.SECRET_KEY); // encrypt the id and role to give a token 
                    const decoded_phone = jwt.verify(found.phone,process.env.SECRET_KEY); //bcrypt the phone
                    res.status(StatusCodes.OK).json({message:'SIGNED IN SUCCESSFULLY',token,Profile:{
                        id:found._id,
                        username:found.username,
                        email:found.email,
                        phone:decoded_phone,
                        location:found.location
                    }})
                }
                else{
                    res.status(StatusCodes.BAD_REQUEST).json({message:"WRONG PASSWORD"})
                }
            }
            else{
                res.status(StatusCodes.BAD_REQUEST).json({message:"SORRY YOUR ACCOUNT IS BLOCKED BY ADMIN"})
            }
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
}

const update_profile=async(req,res)=>{
    const _id=req.user._id
    const {username,email,phone,location}=req.body
    try {
        const enc_phone = jwt.sign(phone,process.env.SECRET_KEY);
        await User.findByIdAndUpdate({_id},{username,email,phone:enc_phone,location})
        res.status(StatusCodes.OK).json({message:"UPDATED SUCCESS"})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
}
const update_password=async(req,res)=>{
    const _id=req.user._id
    const {oldpassword,newpassword,cpassword}=req.body
    try {
        const user = await User.findOne({_id,isDeleted:false})
        const match = await bcrypt.compare(oldpassword,user.password)
        if (match){
            if (newpassword==cpassword){
                const heashed = await bcrypt.hash(newpassword,7)
                await User.findByIdAndUpdate({_id},{password:heashed})
                res.status(StatusCodes.OK).json({message:"PASSWORD UPDATED SUCCESS"})
            }
            else{
                res.status(StatusCodes.BAD_REQUEST).json({message:"REWRITE THE NEW PASS CORRECTLY"})    
            }
        }
        else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"WRONG PASSWORD"})    
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
}

const deactivate = async(req,res)=>{
    const _id = req.user._id
    try {
        await User.findByIdAndUpdate({_id},{isDeleted:true})
        await Post.updateMany({createdby:_id},{$set:{isDeleted:true}})
        res.status(StatusCodes.OK).json({message:"ACCOUNT DEACTIVATED SUCCESS"})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:error})
    }
}



module.exports={sign_up,sign_in,update_profile,update_password,deactivate}
