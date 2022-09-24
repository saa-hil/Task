const jwt = require('jsonwebtoken');
const secretkey = 'JWTSecretKey'

const generateJWTToken = (id) =>{
    const token = jwt.sign({ sub : id },secretkey,{ expiresIn : '1d' });
    return token;
};

const verifyJWTToken = (token) =>{
    const verifyToken = jwt.verify(token,secretkey);
    return verifyToken;
};

module.exports = { generateJWTToken, verifyJWTToken };
