var user_model = require('../model/user_model.js')
var applyTrainee_model = require('../model/applyTrainee_model.js')
var school_model = require('../model/school_model.js')

var result = {status:true, msg: ""}

var msg = {
    LoginSuccess: "Login success",
    LoginFailUser: "No this User",
    LoginFailPassword: "Wrong Password",
    RegistSuccess: "Regist success",
    RegistFail: "Account has been registed",
    ApplySuccess: "Apply success",
    ApplyFail: "Apply fail"
}

var controller = {

    // 登录
    // 请求数据json格式 
    // { account, password }
    // 返回数据json格式
    // { status, msg }
    login: function (req, res) {
        var password = req.body.password;
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        }).then(user_model.find_user)
        .then(function(data){
            if(data == null){
                result.status = false;
                result.msg = msg.LoginFailUser;
            }
            else{
                result.status = (data.password == password) ? true : false;
                result.msg = (data.password == password) ? msg.LoginSuccess : msg.LoginFailPassword;
            }
            res.send(result);
            console.log("### Login");
            res.end();
        }).catch();
    },

    // 注册
    // 请求数据json格式 
    // { account, password, phone }
    // 返回数据json格式
    // { status, msg }
    regist: function (req, res) {
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        }).then(user_model.add_user)
        .then(function(err){
            result.status = err ? false : true;
            result.msg = err ? msg.RegistFail : msg.RegistSuccess;
            res.send(result);
            console.log("### register");
            res.end();
        }).catch();
    },

    // 成为学员
    // 请求数据json格式 
    // { account , schoolId }
    // 返回数据json格式
    // { status, msg }
    becomeTrainee: function(req, res){
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        })
        .then(applyTrainee_model.add_applytrainee)
        .then(function(err){
            result.status = err ? false : true;
            result.msg = err ? msg.ApplyFail : msg.ApplySuccess;
            res.send(result);
            console.log("### Apply to be Trainee");
            res.end();
        })
        .catch();
    },

    // 学员申请的驾校列表
    // 请求数据json格式 
    // { account }
    // 返回数据json格式
    // { status, 学校数组 }
    getApplySchool: function(req, res){
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        })
        .then(applyTrainee_model.get_applyschools)
        .then(school_model.find_school)
        .then(function(data){
            res.send(data);
            console.log("### Trainee get apply school");
            res.end();
        })
        .catch();
    } 
}

module.exports = controller;