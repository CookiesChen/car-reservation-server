var express = require('express');
var router = express.Router();
var controller = require('../controller/user_controller.js')

/* GET home page. */
router.get('/', controller.login);
router.get('/regist', controller.regist);
router.get('/login',controller.login);
router.get('/logout',controller.logout);

module.exports = router;
