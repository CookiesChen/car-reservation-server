var apply_model = require('../model/apply_model')
var train_model = require('../model/train_model.js')

var msg = require('../model/msg')

var result = {status:true , msg: "", data: {}}


var controller = {

    // 获取同驾校教练列表
    getTrainer: function(req, res){
        console.log("### get Trainer");
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify({
                schoolId: req.session.schoolId
            }));
        })
        .then(apply_model.get_trainers)
        .then(function(data){
            result.status = true;
            result.msg = msg.GetTrainerSuccess;
            result.data = JSON.parse(data);
            res.send(result);
            res.end();
        })
        .catch(function(err){
            console.log(err);
            result.data = {};
            result.msg = msg.GetTrainerFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    },

    // 获取我的训练列表
    getMyTrains: function(req, res){
        console.log("### get my trains");
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify({
                account: req.session.userId
            }));
        })
        .then(train_model.get_mytrains)
        .then(function(data){
            result.status = true;
            result.msg = msg.GetTrainsSuccess;
            result.data = JSON.parse(data);
            res.send(result);
            res.end();
        })
        .catch(function(err){
            result.data = {};
            result.msg = msg.GetTrainsFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    },

    // 获取训练列表
    // 请求数据json格式 
    // { name }
    // 返回数据json格式
    // { 训练数组 }
    joinTrain: function(req, res){
        console.log("### join trains");
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify({
                name: req.body.name,
                trainee: req.session.userId
            }));
        })
        .then(train_model.check_trainee)
        .then(train_model.add_trainee)
        .then(function(data){
            result.status = true;
            result.msg = msg.JoinTrainSuccess;
            result.data = JSON.parse(data);
            res.send(result);
            res.end();
        })
        .catch(function(err){
            result.data = {};
            result.msg = msg.JoinTrainFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    }
}

module.exports = controller;