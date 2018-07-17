var express = require('express');
var router = express.Router();
var school_controller = require('../controller/school')


router.post('/registschool', school_controller.registSchool);
router.get('/getwait', school_controller.getwait);
router.post('/accepttraninee', school_controller.acceptApply);
router.post('/accepttraniner', school_controller.acceptApply);

module.exports = router;
