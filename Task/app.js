const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const connection = require('./config/db');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');


app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(userRouter);

app.get('/',(req,res)=>{
    res.send("Welcome to the task");
});

app.listen(PORT,()=>{
    console.log(`connected to the port ${PORT}`);
});