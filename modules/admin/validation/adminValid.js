const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)


module.exports={
    superadmin_signinValidationSchema:{
        body:Joi.object().required().keys({
            email:Joi.string().required().email(),
            password:Joi.string().required()
        })
    },
    add_adminValidationSchema :{
        body:Joi.object().required().keys({
            username:Joi.string().required(),
            email:Joi.string().required().email(),
            password:Joi.string().required(),
            cpassword:Joi.string().required(),
            phone:Joi.number().required(),
            location:Joi.string().required(),
            role:Joi.string()
        })
    },
    delete_adminValidationSchema:{
        body:Joi.object().required().keys({
            _id:Joi.objectId().required()
        })
    },
    block_postValidationSchema:{
        body:Joi.object().required().keys({
            _id:Joi.objectId().required()
        })
    },
    block_userValidationSchema:{
        body:Joi.object().required().keys({
            _id:Joi.objectId().required()
        })
    }
}