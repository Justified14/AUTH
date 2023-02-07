//email type of string, unique required, validate, 
//password 
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

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

//writing a function that prtotects our users information before we save
//mongoose hooks
//generates a salt and hash  using the salt

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt);
    next();

});

module.exports = mongoose.model('User', userSchema);