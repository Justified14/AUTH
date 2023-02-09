const Users = require('../model/user');
const bcrypt = require('bcrypt');
const handleErrors = require('../middleware/handleError')
const jwt = require('jsonwebtoken');



const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"})
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
        res.status(400).json({success: false, errors});
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
                //token set
                const token = generateToken(user._id)
                res.cookie('jwt', token, {maxAge: 60 * 60 * 1000})
              return  res.status(200).json({success:true, data: user})
            }
            throw Error('Invalid email or password')
        }
        throw Error('User not registered yet')   
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({success: false, errors});
    }
}

const signup = (req, res) => {
    res.status(200).render('signup', {title: 'Signup'})
};

const signin = (req, res) => {
    res.status(200).render('login', {title: 'Login'})
};


const dashboard = (req, res) => {
    res.status(200).render('dashboard', {title: 'Dashboard'})
};


const logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1000})
    res.redirect('/login')
};

module.exports = {register, login, signin, signup, dashboard, logout};