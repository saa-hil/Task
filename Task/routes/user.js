const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const joi = require('../joiSchema/user');
const jWtAuth = require('../middleware/tokenAuth');
const faqCat = require('../controllers/faqCat');
const faq = require('../controllers/faq');

//User
router.post('/registerUser',joi.userSchema,user.register);
router.post('/login',user.login);
router.post('/changePassword',jWtAuth.tokenAuth,user.changePassword);

//FAQ-Category
router.get('/getCategory',jWtAuth.tokenAuth,faqCat.getCat);
router.post('/addCategory',jWtAuth.tokenAuth,faqCat.addCategory);
router.put('/editCategory',jWtAuth.tokenAuth,faqCat.editCategory);
router.delete('/deleteCategory',jWtAuth.tokenAuth,faqCat.deleteCategory);

//FaQ
router.get('/getFAQ',jWtAuth.tokenAuth,faq.getFAQ);
router.post('/addFAQ',jWtAuth.tokenAuth,faq.createFAQ);
router.put('/editFAQ',jWtAuth.tokenAuth,faq.editFAQ);
router.delete('/deleteFAQ',jWtAuth.tokenAuth, faq.deleteFAQ);


module.exports = router; 