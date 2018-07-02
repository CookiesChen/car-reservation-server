var express = require('express');
var router = express.Router();
var app = express();

var user = require('./user');
var trainee = require('./trainee');
var trainer = require('./trainer');
var school = require('./school');

const whiteList = {
    post: {
      '/user/login': true,
      '/user/regist': true,
      '/school/registschool': true
    }
}

router.use('/*', (req, res, next)=>{
    console.log(req.session);
    if(!whiteList.post[req.originalUrl]){
        if(!req.session.userId){
            res.send({
                status: false, 
                msg: "Please log in", 
                data: {}
            });
            res.end();
            return;
        }
    }
    next();
});

router.use('/user', user);
router.use('/trainee', trainee);
router.use('/trainer', trainer);
router.use('/school', school);


module.exports = router;
