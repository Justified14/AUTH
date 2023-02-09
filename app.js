require("dotenv").config();
const express = require('express');
const app = express();
const PORT = 1001
const mongoose = require('mongoose');
const notFound = require('./middleware/notFound')
// const userRouter = require('./Route/userRouter')
const newRouter = require('./Route/newUserRou')
const cookieparser = require('cookie-parser')
mongoose.set('strictQuery', true);
app.set('view engine', 'ejs');

app.use(express.json());    
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.use(newRouter);



//error handlers
app.use(notFound)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`srver running on port ${PORT}....`);
        });
    } catch (error) {
        console.log(error)
    };
};

start();

