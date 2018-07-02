var express = require('express');
var router = express.Router();
var user_controller = require('../controller/user')

router.post('/regist', user_controller.regist);
router.post('/login', user_controller.login);
router.post('/applytrainee', user_controller.apply);
router.post('/applytrainer', user_controller.apply);
router.get('/getapply', user_controller.getApply);
router.get('/getmyschools', user_controller.getMySchools);
router.post('/sentmessage', user_controller.sentMessage);
router.get('/getmessages', user_controller.getMessages);
router.get('/getallschools', user_controller.getAllSchools);

module.exports = router;
