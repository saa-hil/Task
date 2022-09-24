const bcrypt = require('bcrypt');

const hashingPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);
    return hashPassword;
}

const comparePassword = async (passwordAttempt,hashedPassword) =>{
    return bcrypt.compare(passwordAttempt,hashedPassword);
};

module.exports = { hashingPassword , comparePassword };