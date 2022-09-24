const mongoose = require('mongoose');

const FAQ = mongoose.Schema({
    cat_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'categories'
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    question : {
        type : String
    },
    answer : {
        type : String
    },
    isDeleted : { //Soft Delete
        type : Boolean,
        default : false,
        deletedAt : Date | null
    }
});

module.exports = new mongoose.model('faq',FAQ);