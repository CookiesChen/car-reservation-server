var school_model = require('../model/school_model.js')
var apply_model = require('../model/apply_model')
var user_model = require('../model/user_model')

var result = {status:true, msg: "", data: {}}

var msg = require('../model/msg')

var controller = {

    // 注册驾校
    // 请求数据json格式 
    // { schoolId, phone, email }
    // 返回数据json格式
    registSchool: function (req, res) {
        console.log("### register school");
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        }).then(school_model.add_school)
        .then(function(data){
            result.status = true;
            result.msg = msg.RegistSchoolSuccess;
            result.data = JSON.parse(data);
            res.send(result);
            res.end();
        })
        .catch(function(err){
            console.log(err);
            result.data = {};
            result.msg = msg.RegistSchoolFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    },

    // 同意申请
    // 请求数据json格式 
    // { account}
    // 返回数据json格式
    acceptApply: function(req, res){
        console.log("### accept apply");
        return new Promise(function(resolve, reject){
            var temp = {};
            temp['role'] = (req.url == "/accepttraninee") ? "trainee" : "trainer"; 
            temp['account'] = req.body.account;
            temp['schoolId'] = req.session.schoolId;
            resolve(JSON.stringify(temp));
        })
        .then(user_model.modify_user)
        .then(apply_model.accept_apply)
        .then(apply_model.fail_apply)
        .then(function(data){
            data = JSON.parse(data);
            result.data = data;
            result.msg = msg.acceptSuceess;
            result.status = true;
            res.send(result);
            res.end();
        })
        .catch(function(err){
            result.data = {};
            result.msg = msg.acceptFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    }

}

module.exports = controller;