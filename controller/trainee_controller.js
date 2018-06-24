var apply_model = require('../model/apply_model')
var user_model = require('../model/user_model.js')

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
        .then(user_model.get_users)
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
    }

}

module.exports = controller;