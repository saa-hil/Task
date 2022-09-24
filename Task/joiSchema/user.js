let joi = require('joi');
let joiAuth = require('../middleware/joi');

const userSchema = (req,res,next) =>{
    const schema = joi.object().keys({
        first_name : joi.string().min(2).max(15),
        last_name : joi.string(),
        phone : joi.string().length(10).required(),
        email : joi.string().email(),
        password : joi.any().required(),
    });
    joiAuth.validateJoi(req,res,next,schema);
};

module.exports = { userSchema };