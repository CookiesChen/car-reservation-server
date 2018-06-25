var school_model = require('../model/school_model.js')
var apply_model = require('../model/apply_model')
var user_model = require('../model/user_model')

var result = {status:true, msg: "", data: {}}

var message = require('../model/message.js')

var controller = {

    // 注册驾校
    // 请求数据json格式 
    // { schoolId } 待完善
    // 返回数据json格式
    // { status, msg }
    registSchool: function (req, res) {
        console.log("### register school");
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        }).then(school_model.add_school)
        .then(function(data){
            result.status = true;
            result.msg = message.RegistSuccess;
            result.data = JSON.parse(data);
            res.send(result);
            res.end();
        })
        .catch(function(err){
            console.log(err);
            result.data = {};
            result.msg = message.RegistFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    },

    // 同意申请
    // 请求数据json格式 
    // { account, schoolId}
    // 返回数据json格式
    // { status, msg }
    acceptApply: function(req, res){
        console.log("### accept apply");
        return new Promise(function(resolve, reject){
            var temp = req.body;
            temp['role'] = (req.url == "/accepttraninee")? "trainee" : "trainer"; 
            resolve(JSON.stringify(temp));
        })
        .then(user_model.modify_user)
        .then(apply_model.accept_apply)
        .then(function(data){
            data = JSON.parse(data);
            result.data = data;
            result.msg = message.acceptSuceess;
            result.status = true;
            res.send(result);
            res.end();
        })
        .catch(function(err){
            console.log(err);
            result.data = {};
            result.msg = message.acceptFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    }

}

module.exports = controller;