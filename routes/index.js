var express = require('express');
var router = express.Router();
var controller = require('../controller/user_controller.js')

// 路由跳转到控制模块
router.post('/', controller.login);
router.post('/regist', controller.regist);
router.post('/login',controller.login);
router.post('/logout',controller.logout);

module.exports = router;
