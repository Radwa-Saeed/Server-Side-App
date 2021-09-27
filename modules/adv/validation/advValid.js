const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)

module.exports={
    create_advValidationSchema :{
        body:Joi.object().required().keys({
            title:Joi.string().required(),
            desc:Joi.string().required()
        })
    },
    update_advValidationSchema :{
        body:Joi.object().required().keys({
            _id:Joi.objectId().required(),
            title:Joi.string().required(),
            desc:Joi.string().required()
        })
    },
    delete_advValidationSchema :{
        body:Joi.object().required().keys({
            _id:Joi.objectId().required()
        })
    },

}

