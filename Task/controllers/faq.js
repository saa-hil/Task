const faq = require('../models/faq');
const faqCat = require('../models/category');

const getFAQ = async(req,res) =>{
    try{
        let getFAQ = await faq.find({ isDeleted : false });
        res.status(200).json({
            success : true,
            categories : getFAQ
        })
    }catch(err){
        res.status(400).send({
            success : false,
            message : err.message
        })
    }
};

const createFAQ = async(req,res) =>{
    try{
        let cat = await faqCat.findOne({ user_id : req.user._id });
        let FAQbody = {
            cat_id : cat._id,
            user_id : req.user._id,
            question : req.body.question,
            answer : req.body.answer,
        }
        let FAQ = faq(FAQbody);
        await FAQ.save();
        res.status(200).send({
            success : true,
            message : "Category Added"
        })
    }catch(err){
        res.status(400).send({
            success : false,
            message : err.message
        })
    }
};

const editFAQ = async(req,res) =>{
    try{
        let body = {
            question : req.body.question,
            answer : req.body.answer
        };
        await faq.findOneAndUpdate({ user_id : req.user._id },{
            question : body.question,
            answer : body.answer
        });
        res.status(200).send({
            success : true,
            message : "FAQ Updated"
        });
    }catch(err){
        res.status(400).send({
            success : false,
            message : err.message
        })
    }
};

const deleteFAQ = async(req,res) =>{
    try{
        let body = {
            question : req.body.question
        };
        await faq.findOneAndUpdate({ user_id : req.user._id , question : body.question },{
            isDeleted : true
        });
        res.status(200).send({
            success : true,
            message : "Deleted"
        });
    }catch(err){
        res.status(400).send({
            success : false,
            message : err.message
        });
    }
};

module.exports = { getFAQ, createFAQ,editFAQ ,deleteFAQ }