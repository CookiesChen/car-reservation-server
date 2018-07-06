var express = require('express');
var router = express.Router();
var trainee_controller = require('../controller/trainee')

router.post('/jointrain', trainee_controller.joinTrain);
router.get('/gettrainer', trainee_controller.getTrainer);
router.get('/getmytrains', trainee_controller.getMyTrains);
router.get('/getclassmate', trainee_controller.getClassmate);
router.post('/gettrainsbyid', trainee_controller.getTrainsById);

module.exports = router;
