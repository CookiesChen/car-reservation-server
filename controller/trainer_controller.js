var train_model = require('../model/train_model')
var user_model = require('../model/user_model.js')

var message = require('../model/message.js')

var result = {status:true , msg: "", data: {}}


var controller = {

    // 获取同驾校教练列表
    // 请求数据json格式 
    // { account(教练账号), name(训练名字), starttime(训练起始时间), endtime(训练起结束时间), registtime }
    // 返回数据json格式
    // { 教练数组 }
    registTrain: function(req, res){
        console.log("### regist train");
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        })
        .then(train_model.add_train)
        .then(function(data){
            result.status = true;
            result.msg = message.RegistTrainSuccess;
            result.data = JSON.parse(data);
            res.send(result);
            res.end();
        })
        .catch(function(err){
            result.data = {};
            result.msg = message.RegistTrainFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    },

    // 获取训练列表
    // 请求数据json格式 
    // { schoolId }
    // 返回数据json格式
    // { 训练数组 }
    getTrains: function(req, res){
        console.log("### get Trains");
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        })
        .then(apply_model.get_trainers)
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
    }
}

module.exports = controller;