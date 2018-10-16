let express = require('express'),
    router = express.Router();

let authController = require('../controllers/authController.js');

/**
 * (POST Method)
 */
// SignUp
router.post('/signup', authController.signup);

//SignIn
//router.post('/signin', authenticationController.signin);

module.exports = router;