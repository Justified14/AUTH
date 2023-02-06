//email type of string, unique required, validate, 
//password 
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const { isEmail } = require('validator');

const userSchema = new schema({
    email:{
        type: String,
        required: [true, 'Please provide a valid email'],
        unique: [true, 'This email is already in use'],
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please provide a valid password'],
        minlength: [5, 'The minimum password length is 5']
        
    },
},
{timestamps: true});

module.exports = mongoose.model('User', userSchema);