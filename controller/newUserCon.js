const Users = require('../model/user');
const bcrypt = require('bcrypt');


const handleErrors = (err) => {
    //err messages err codes - 11000
    let errors = {email: "", password: ""};
    if (err.code === 11000) {
        errors.email = 'Email is already in use'
        return errors
    }
    if (err.message === 'User not registered yet'){
        errors.email = 'This Email has not been registered'
        return errors
    }
    if (err.message === 'Invalid email or password'){
        errors.email = 'Invalid Email or Password'
        errors.password = 'Invalid Email or Password'
        return errors
    }
    if (err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    };

    return errors;
};


const register = async (req, res) => {
    const {email, password} = req.body;
    try {

        //protect users infor
        //create the user on the database
        const user = await Users.create({email, password});
        res.status(201).json({success:true, data:user});
        
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({errors});
    }
};

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({success:false, message: "Please Provide necessary information"})
        }
        //email is registered
        const user = await Users.findOne({email});
        if (user) {
            const authenticated = await bcrypt.compare(password, user.password)
            if (authenticated) {
              return  res.status(200).json({success:true, data: user})
            }
            throw Error('Invalid email or password')
        }
        throw Error('User not registered yet')   
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({errors});
    }
};

const signup = (req, res) => {
    res.status(200).render('signup', {title: 'Signup'})
};

const signin = (req, res) => {
    res.status(200).render('login', {title: 'Login'})
};


const dashboard = (req, res) => {
    res.status(200).render('dashboard', {title: 'Dashboard'})
};

module.exports = {register, login, signin, signup, dashboard};