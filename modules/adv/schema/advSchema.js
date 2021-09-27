const mongoose = require("mongoose");
const advSchema = new mongoose.Schema({
    title:{type:String,required:true},
    desc:{type:String,required:true},
    isDeleted:{type:Boolean,default:false},
},
{
    timestamps:true
})

module.exports=advSchema
