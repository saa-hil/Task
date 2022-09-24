const faqCat = require('../models/category');

const getCat = async(req,res) =>{
    try{
        const get = await faqCat.find({ isDeleted : false });
        res.status(200).json({
            success : true,
            categories : get
        })
    }catch(err){
        res.status(400).send({
            success : false,
            message : err.message
        })
    }
};

const addCategory = async (req,res) => {
    try{
        const cat_obj = {
            user_id : req.user._id,
            category_name : req.body.category_name
        }
        const category = faqCat(cat_obj);
        await category.save();
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

const editCategory = async (req,res) => {
    try{
        let body = {
            category_name : req.body.category_name
        }
        let update = await faqCat.findOneAndUpdate({ user_id : req.user._id} ,{
            category_name : body.category_name
        });
        res.status(200).send({
            success : true,
            message : "Category Updated"
        });
    }catch(err){
        res.status(400).send({
            success : false,
            message : err.message
        });
    };
};

const deleteCategory = async (req,res) => {
    try{
        let body = {
            category_name : req.body.category_name
        }
        await faqCat.findOneAndUpdate({ user_id : req.user._id, category_name : body.category_name },{
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
}


module.exports = { getCat, addCategory, editCategory, deleteCategory }