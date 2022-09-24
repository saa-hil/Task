const userModel = require('../models/user');
const nodemailer = require('nodemailer');
const assigned = [234, 345, 456, 567, 678, 789];
const bcrypt = require('../utils/bcrypt');
const jwt = require('../utils/jwt');

const generateUniquePin = () => {
    const highValue = 999;
    const lowValue = 100;
    const PIN = Math.floor(Math.random() * (highValue - lowValue + 1) + lowValue);
    if (assigned.includes(PIN)) {
        generateUniquePin();
    } else {
        return PIN;
    }
};

async function main(useremail, username) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'sahilnihar25@gmail.com',
            pass: 'stlwnkiyftgsgesw'
        }
    });
    let info = await transporter.sendMail({
        from: 'FAQ Management',
        to: useremail,
        subject: 'Welcome Message',
        text: `Hello ${username}, Welcome to the FAQ management , Thank you for registering.!`
    });
    console.log("Message sent to :", info.messageId);
    console.log("URL :", nodemailer.getTestMessageUrl(info));
}

const register = async (req, res) => {
    try {
        console.log(req.body);
        let user_object = {
            unique_pin: generateUniquePin(),
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
            password: await bcrypt.hashingPassword(req.body.password)
        }
        const user = userModel(user_object);
        await user.save();
        //nodemailer
        await main(user_object.email, user_object.first_name).catch(console.error);
        res.status(200).send({
            success: true,
            message: "User Registered successfully and mailed also"
        })
    } catch (err) {
        res.status(400).send({
            success: false,
            message: err.message
        })
    };
};

const login = async (req, res) => {
    console.log(req.body);
    let credentials = {
        email: req.body.email,
        password: req.body.password,
    };
    let user = await userModel.findOne({ email: credentials.email });
    console.log(user);
    if (!user) throw new Error('User not found');
    let checkUser = await bcrypt.comparePassword(credentials.password, user.password);
    if (!checkUser) throw new Error('Incorrect Password');
    const token = jwt.generateJWTToken(user._id);
    res.status(200).send({
        status: 200,
        success: true,
        message: "Login Successfully",
        token: token
    });
};

const changePassword = async (req, res) => {
    try {
        console.log("Req.user is", req.user);
        console.log("Req.body is", req.body);
        let pwCreds = {
            current_password: req.body.current_password,
            new_password: req.body.new_password,
            confirm_password: req.body.confirm_password
        }
        let checkUser = await bcrypt.comparePassword(pwCreds.current_password, req.user.password);
        if (!checkUser) throw new Error('Incorrect current password');
        if (pwCreds.current_password == pwCreds.new_password) {

            throw new Error('New Password must be different')

        } else {

            if (pwCreds.new_password != pwCreds.confirm_password) {

                throw new Error('confirm password is not same as new password');

            } else {
                    let user = req.user;
                    await userModel.findOneAndUpdate(user,{
                        password : await bcrypt.hashingPassword(pwCreds.new_password)
                    });
            }
        }
    } catch (err) {
        console.log(err);
    }

};



module.exports = { register, login, changePassword }