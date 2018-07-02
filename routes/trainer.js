var express = require('express');
var router = express.Router();
var trainer_controller = require('../controller/trainer')

router.post('/registtrain', trainer_controller.registTrain);

module.exports = router;
