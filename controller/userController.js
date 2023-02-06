const User = require('../model/user')
const bcrypt = require('bcrypt')

const register = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
       return res.status(400).json({success:false, message: "Please Provide necessary information"})
    }

    const userExist = await User.findOne({email: email})

    if(userExist) {
        return res.status(200).json({success:false, message: "Email has been used" })
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);


    try {
        const user = await User.create({email, password: hashedPassword});
        res.status(201).json({success:true, data: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error})
    }
};

const login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
       return res.status(400).json({success:false, message: "Please Provide necessary information"})
    }
    
    const user = await User.findOne({email})
    if (!user) {
        return res.status(400).json({success:false, message: 'Email not found, Please try again'})
    }

    const authenticated = user.email === email && (await bcrypt.compare(password, user.password));

    if (authenticated) {
        user.password = ''
       return res.status(200).json({success: true, data: user})   
     }else {
        return res.status(401).json({success: false, message: 'Invalid email or password' })
     }
};

module.exports = {register, login}