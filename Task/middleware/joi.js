const validateJoi = (req,res,next,schema) => {
    const { error } = schema.validate(req.body);
    if(error){
        return res.status(200).send({ statuscode : 400, success : false, message : error.message });
    }else{
        next();
    }
}

module.exports = { validateJoi };