const userModel = require('../models/user');
const verify = require('../utils/jwt');

const tokenAuth = async (req,res,next) => {
    try{
        // console.log(req.headers);
        if(req.headers.authorization == undefined){
            return res.status(400).json({
                message : 'User unauthorized'
            })
        }else{
            const token = req.headers.authorization.split(" ")[1];
            if(token){
                const verifyToken = verify.verifyJWTToken(token);
                const findUser = await userModel.findOne({ _id : verifyToken.sub });
                // console.log(findUser); //got
                if(!findUser){
                    throw new Error('Validation Error');
                }
                req.user = findUser;
                next();
            }else{
                return res.status(400).json({
                    status : 400,
                    success : false,
                    message : 'Not Authorized'
                });
            }
        }
    }catch(err){
        console.log(err);
    }
};

module.exports = { tokenAuth };