const { StatusCodes } = require("http-status-codes");
const Adv = require("../model/advModel");

const creatadv = async (req,res)=>{
    const {title,desc}=req.body
    try {
        const newadv = new Adv({title,desc})
        await newadv.save()
        res.status(StatusCodes.CREATED).json({message:`NEW ADV CREATED SUCCESS ${newadv}`})        
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:error})
    }
} 
const updateadv = async (req,res)=>{
    const {_id,title,desc}=req.body
    try {
        const found = await Adv.findOne({_id,isDeleted:false})
        if (found){
            await Adv.findByIdAndUpdate({_id},{title,desc})
            res.status(StatusCodes.OK).json({message:`ADV WITH ID ${_id} UPDATED SUCCESS`})        
        }
        else{
            res.status(StatusCodes.BAD_REQUEST).json({message:`ADV WITH ID ${_id} NOT FOUND`})        
        }
        }
    catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:error})
    }
} 
const deleteadv = async (req,res)=>{
    const {_id}=req.body
    try {
        const found = await Adv.findOne({_id,isDeleted:false})
        if (found){
            await Adv.findByIdAndUpdate({_id},{isDeleted:true})
            res.status(StatusCodes.OK).json({message:`ADV WITH ID ${_id} DELETED SUCCESS`}) 
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:`ADV WITH ID ${_id} NOT FOUND`})        
        }       
        }catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:error})
    }
} 

const getalladv = async (req,res)=>{
    try {        
        if(req.user.role == "admin" || req.user.role == "superadmin" ){
            const alladvs = await Adv.find({isDeleted:false})
            res.status(StatusCodes.OK).json({message:'ADVs',alladvs})   // it's better to destruct the post contents instead of selection    
        }
        else {
            const alladvs = await Adv.find({isDeleted:false}).select('-isDeleted -updatedAt -__v ')  //select must be in single qoute '' 
            res.status(StatusCodes.OK).json({message:'ADVs',alladvs})   // it's better to destruct the post contents instead of selection    
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:error})
    }
}



module.exports={creatadv,updateadv,deleteadv,getalladv}