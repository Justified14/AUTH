require("dotenv").config();
const express = require('express');
const app = express();
const PORT = 1001
const mongoose = require('mongoose');
const notFound = require('./middleware/notFound')
const userRouter = require('./Route/userRouter')
mongoose.set('strictQuery', true);


app.use(express.json());

app.use(userRouter)

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