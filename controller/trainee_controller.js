var apply_model = require('../model/apply_model')
var train_model = require('../model/train_model.js')

var message = require('../model/message.js')

var result = {status:true , msg: "", data: {}}


var controller = {

    // 获取同驾校教练列表
    // 请求数据json格式 
    // { schoolId }
    // 返回数据json格式
    // { 教练数组 }
    getTrainer: function(req, res){
        console.log("### get Trainer");
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        })
        .then(apply_model.get_trainers)
        .then(function(data){
            result.status = true;
            result.msg = message.GetTrainerSuccess;
            result.data = JSON.parse(data);
            res.send(result);
            res.end();
        })
        .catch(function(err){
            result.data = {};
            result.msg = message.GetTrainerFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    },

    // 获取训练列表
    // 请求数据json格式 
    // { account }
    // 返回数据json格式
    // { 训练数组 }
    getMyTrains: function(req, res){
        console.log("### get Trains");
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        })
        .then(train_model.get_mytrains)
        .then(function(data){
            result.status = true;
            result.msg = message.GetTrainsSuccess;
            result.data = JSON.parse(data);
            res.send(result);
            res.end();
        })
        .catch(function(err){
            result.data = {};
            result.msg = message.GetTrainsFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    },

    // 获取训练列表
    // 请求数据json格式 
    // { name, account }
    // 返回数据json格式
    // { 训练数组 }
    joinTrain: function(req, res){
        console.log("### join trains");
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        })
        .then(train_model.add_trainee)
        .then(function(data){
            result.status = true;
            result.msg = message.JoinTrainSuccess;
            result.data = JSON.parse(data);
            res.send(result);
            res.end();
        })
        .catch(function(err){
            console.log(err);
            result.data = {};
            result.msg = message.JoinTrainFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    }
}

module.exports = controller;