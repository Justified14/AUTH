const router = require('express').Router();

const {register, login, signup, signin, dashboard} = require('../controller/newUserCon');


router.post('/register', register);
router.post('/login', login);

router.get('/register',signup);
router.get('/login',signin);
router.get('/dashboard',dashboard);

module.exports = router;
