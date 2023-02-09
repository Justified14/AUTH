const router = require('express').Router();
const requiredAuthProcess = require('../middleware/Auth')

const {register, login, signup, signin, dashboard, logout} = require('../controller/newUserCon');


router.post('/register', register);
router.post('/login', login);

router.get('/register',signup);
router.get('/login',signin);
router.get('/logout', logout)
router.get('/dashboard', requiredAuthProcess ,dashboard);

module.exports = router;
