var express = require('express');
var router = express.Router();
var user_controller = require('../controller/user_controller.js')
var school_controller = require('../controller/school_controller.js')


router.get('/regist', user_controller.regist);
router.get('/login', user_controller.login);
router.post('/regist', user_controller.regist);
router.post('/login', user_controller.login);
router.post('/applytrainee', user_controller.becomeTrainee);
router.post('/getapplyschool', user_controller.getApplySchool);
router.post('/registschool', school_controller.registSchool);
router.post('/accepttraninee', school_controller.acceptTrainee);

module.exports = router;
