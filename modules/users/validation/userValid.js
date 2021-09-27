const Joi = require("joi");

module.exports={
    sign_upValidationSchema:{
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
    sign_inValidationSchema:{
        body:Joi.object().required().keys({
            email:Joi.string().required().email(),
            password:Joi.string().required()
        })
    },
    update_profileValidationSchema:{
        body:Joi.object().required().keys({
            username:Joi.string(),
            email:Joi.string().email(),
            phone:Joi.number(),
            location:Joi.string(),
            role:Joi.string()
        })
    },
    update_passwordValidationSchema:{
        body:Joi.object().required().keys({
            oldpassword:Joi.string(),
            newpassword:Joi.string(),
            cpassword:Joi.string(),
        })
    }
}