const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/FAQ',{
    useNewUrlParser : true,
    autoIndex : true
})
.then(()=>{
    console.log("connected to DB")
}).catch((err)=>{
    console.log(err);
});

let connection = mongoose.connection;

module.exports = connection;
