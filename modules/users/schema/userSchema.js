const mongoose = require("mongoose");
const bcrypt = require('bcrypt'); // to hash the password
const jwt = require("jsonwebtoken"); //to encrypt the phone

const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:String,required:true},
    location:{type:String,required:true},
    role:{type:String,default:'user'},
    isDeleted:{type:Boolean,default:false},
    isBlocked:{type:Boolean,default:false}
},
{
    timestamps:true
})

userSchema.pre('save',async function(next){
    this.password=await bcrypt.hash(this.password,7)
    this.phone= jwt.sign(this.phone,'shhhhh')
    next()
});
// userSchema.pre('findByIdAndUpdate',async function(next){
//     this.password=await bcrypt.hash(this.password,7)
//     next()
// });

module.exports=userSchema


