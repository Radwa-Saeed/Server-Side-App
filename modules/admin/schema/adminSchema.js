const mongoose= require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:String,required:true},
    location:{type:String,required:true},
    role:{type:String,default:'admin'},
    isDeleted:{type:Boolean,default:false}
},
{
    timestamps:true
})

adminSchema.pre('save',async function(next){
    this.password=await bcrypt.hash(this.password,7)
    next()
});

module.exports=adminSchema