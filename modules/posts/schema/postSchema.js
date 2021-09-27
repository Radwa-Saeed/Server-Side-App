const mongoose = require("mongoose");
const postsSchema = new mongoose.Schema({
    title:{type:String,required:true},
    desc:{type:String,required:true},
    createdby:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    reports:[{
        reportedby:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
        reportmsg:{type:String}
    }],
    isDeleted:{type:Boolean,default:false},
    isBlocked:{type:Boolean,default:false}
},
{
    timestamps:true
})

module.exports=postsSchema
