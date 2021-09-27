const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)

module.exports={
    creat_postValidationSchema :{
        body:Joi.object().required().keys({
            title:Joi.string().required(),
            desc:Joi.string().required()
        })
    },
    update_postValidationSchema :{
        body:Joi.object().required().keys({
            _id:Joi.objectId().required(),
            title:Joi.string().required(),
            desc:Joi.string().required()
        })
    },
    delete_postValidationSchema :{
        body:Joi.object().required().keys({
            _id:Joi.objectId().required()
        })
    },
    report_postValidationSchema :{
        body:Joi.object().required().keys({
            _id:Joi.objectId().required(),
            reportmsg:Joi.string().required()
        })
    }

}

