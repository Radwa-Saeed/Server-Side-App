const { StatusCodes } = require("http-status-codes");
const Admin = require("../model/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../users/model/userModel");
const Post = require("../../posts/model/postModel");

// SUPER ADMIN ONLY

const super_admin_signin = async (req, res) => {
    const { email, password } = req.body
    try {
        const found = await Admin.findOne({ email, isDeleted: false })
        if (!found) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'INVALID EMAIL' })
        } else {
            const match = await bcrypt.compare(password, found.password)
            if (match) {
                const token = jwt.sign({ _id: found._id, role: found.role }, process.env.SECRET_KEY);
                res.status(StatusCodes.OK).json({
                    message: 'SIGNED IN SUCCESS', token, Profile: {
                        id: found._id,
                        username: found.username,
                        email: found.email,
                        phone: found.phone,
                        location: found.location
                    }
                });
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({ message: 'WRONG PASSWORD' })
            }
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: 'ERROR', error })
    }
}

const add_admin = async (req, res) => {
    const { username, email, password, cpassword, phone, location, role } = req.body
    try {
        const found = await Admin.findOne({ email, isDeleted: false })
        if (found) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'THIS EMAIL IS ALREADY EXIST' })
        }
        else {
            if (password == cpassword) {
                const newadmin = new Admin({ username, email, password, cpassword, phone, location, role })
                const admin = await newadmin.save()
                res.status(StatusCodes.CREATED).json({ message: 'NEW ADMIN CREATED SUCCESS' })
            }
            else {
                res.status(StatusCodes.BAD_REQUEST).json({ message: 'WRONG PASSWORD' })
            }
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: 'ERROR', error })
    }
}

const getall_admins = async (req, res) => {
    try {
        const alladmins = await Admin.find({ isDeleted: false })
        res.status(StatusCodes.OK).json({ message: 'ALL ADMINS', alladmins })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: 'ERROR', error })
    }
}

const delete_admin = async (req, res) => {
    const { _id } = req.body
    try {
        await Admin.findByIdAndUpdate({ _id }, { isDeleted: true })
        res.status(StatusCodes.OK).json({ message: 'DELETED SUCCESS' })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "ERROR", error })
    }
}

// ADMIN & SUPER ADMIN

const getallusers = async (req, res) => {
    try {
        const allusers = await User.find()
        res.status(StatusCodes.OK).json({ message: 'ALL USERS', allusers })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: 'ERROR',error })
    }
}

const getallposts = async (req,res)=>{
    try {
        const allposts = await Post.find()
        res.status(StatusCodes.OK).json({ message: 'ALL POSTS', allposts })        
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message:'ERROR', error })
    }
}

const review_reports = async(req,res)=>{
    const allreports = []
    try {
        const allposts = await Post.find()
        allposts.forEach(post => {
            if (post.reports.length && (post.isBlocked == false )){
                allreports.push({"post_id":post._id,"reports":post.reports}) 
            }
        });
        res.status(StatusCodes.OK).json({ message: 'ALL REPORTS', allreports })        
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message:'ERROR', error })   
    }
}

const block_post = async(req,res)=>{
    const {_id} = req.body
    try {
        await Post.findByIdAndUpdate({_id},{isBlocked:true})
        res.status(StatusCodes.OK).json({ message: `POST WITH ID ${_id} BLOCKED SUCCESS`})        
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message:'ERROR', error })   
    }
}

const block_user = async(req,res)=>{
    const {_id} = req.body
    try {
        await User.findByIdAndUpdate({_id},{isBlocked:true})
        res.status(StatusCodes.OK).json({ message: `USER WITH ID ${_id} BLOCKED SUCCESS`})        
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message:'ERROR', error })   
    }
}




module.exports = {
    super_admin_signin, add_admin, getall_admins, delete_admin
    , getallusers,getallposts,review_reports,block_post,block_user
}