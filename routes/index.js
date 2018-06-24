var express = require('express');
var router = express.Router();
var user_controller = require('../controller/user_controller.js')
var school_controller = require('../controller/school_controller.js')

// 用户
router.post('/regist', user_controller.regist);
router.post('/login', user_controller.login);
router.post('/apply', user_controller.apply);
router.post('/getapply', user_controller.getApply);
router.post('/getschools', user_controller.getSchools);

// 管理员
router.post('/registschool', school_controller.registSchool);

// 驾校
router.post('/accepttraninee', school_controller.acceptTrainee);
router.post('/accepttraniner', school_controller.acceptTrainer);

// 教练


module.exports = router;
