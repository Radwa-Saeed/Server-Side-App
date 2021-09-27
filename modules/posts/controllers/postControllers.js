const { StatusCodes } = require("http-status-codes");
//const Adv = require("../../adv/model/advModel");
const Post = require("../model/postModel");

const creatpost = async (req,res)=>{
    const {title,desc}=req.body
    const _id = req.user._id  //signed in user id
    try {
        const newPost = new Post({title,desc,createdby:_id})
        await newPost.save()
        res.status(StatusCodes.CREATED).json({message:`NEW POST CREATED SUCCESS: ${newPost} `})        
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
} 
const updatepost = async (req,res)=>{
    const {_id,title,desc}=req.body
    //const _id = req.user._id  //signed in user id
    //console.log(typeof(_id))
    try {
        const foundpost = await Post.findById({_id})
        if (req.user._id==foundpost.createdby){
            await Post.findByIdAndUpdate({_id},{title,desc})
            res.status(StatusCodes.OK).json({message:'POST UPDATED SUCCESS'})        
        }
        else{
            res.status(StatusCodes.NOT_ACCEPTABLE).json({message:'YOU ARE NOT ALLOWED TO EDIT THIS POST'})        
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
} 
const deletepost = async (req,res)=>{
    const {_id}=req.body
    //const _id = req.user._id  //signed in user id
    try {
        const foundpost = await Post.findById({_id})
        if (req.user._id==foundpost.createdby){
            await Post.findByIdAndUpdate({_id},{isDeleted:true})
            res.status(StatusCodes.OK).json({message:'POST DELETED SUCCESS'})        
        }
        else{
            res.status(StatusCodes.NOT_ACCEPTABLE).json({message:'YOU ARE NOT ALLOWED TO DELETE THIS POST'})        
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
} 

const reportpost = async (req,res)=>{
    const {_id,reportmsg}=req.body
    const userid = req.user._id
    try {
        const foundpost = await Post.findOne({_id})
        const allready_reported = foundpost.reports.find(({reportedby})=>reportedby == userid)
        if (allready_reported){
            res.status(StatusCodes.BAD_REQUEST).json({message:'YOU HAVE ALLREADY REPORTED THIS POST'})
        }else
        {
            await Post.findByIdAndUpdate({_id},{$push:{reports:{reportedby:userid,reportmsg}}})
            res.status(StatusCodes.OK).json({message:'POST REPORTED SUCCESS'})        
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:error})
    }
}

const newsfeed = async (req,res)=>{
    try {        
        const allposts = await Post.find({isDeleted:false,isBlocked:false}).select('-isDeleted -updatedAt -__v -reports')  //select must be in single qoute ''
        res.status(StatusCodes.OK).json({message:'NEWS FEED',allposts})   // it's better to destruct the post contents instead of selection    
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
}

const getprofilepost = async(req,res)=>{
    const {_id}=req.body
    try {
        const foundpost = await Post.findById({_id}).populate('createdby')
        const profposts = await Post.find({createdby:foundpost.createdby,isDeleted:false}).select('-createdby -isDeleted -isBlocked -updatedAt -__v -reports')
        res.status(StatusCodes.OK).json({message:'CREATOR PROFILE',Profile:{
            Username : foundpost.createdby.username,
            Email:foundpost.createdby.email,
            Phone:foundpost.createdby.phone,
            Location:foundpost.createdby.location
        },POSTS:profposts})            
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
}




module.exports={creatpost,updatepost,deletepost,newsfeed,getprofilepost,reportpost}