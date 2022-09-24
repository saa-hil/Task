const mongoose = require('mongoose');

const User = mongoose.Schema({
    unique_pin : {
        type : Number,
    },
    first_name : {
        type : String,
    },
    last_name : {
        type : String,
    },
    phone : {
        type : Number,
    },
    email : {
        type : String,
        unique : true
    },
    password : {
        type : String
    },
    old_password :{
        type : Array
    }
});

module.exports = new mongoose.model('users',User);