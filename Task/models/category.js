const mongoose = require('mongoose');

const faqCategory = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    category_name : {
        type : String,
        unique : true
    },
    isDeleted : { //Soft Delete
        type : Boolean,
        default : false,
        deletedAt : Date | null
    }
});

module.exports = new mongoose.model('categories',faqCategory);