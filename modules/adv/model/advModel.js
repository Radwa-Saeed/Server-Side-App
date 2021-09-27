const mongoose = require("mongoose");
const advSchema = require("../schema/advSchema");
const Adv = mongoose.model('Adv',advSchema);
module.exports=Adv


