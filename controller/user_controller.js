var user_model = require('../model/user_model.js')
var apply_model = require('../model/apply_model')
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
    // { status, user }
    login: function (req, res) {
        var password = req.body.password;
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        }).then(user_model.find_user)
        .then(function(data){
            var temp = {status:true, user:{}};
            temp.status = (data == null)? false: true;
            temp.user = data;
            temp.user.password = "";
            res.send(temp);
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

    // 申请身份
    // 请求数据json格式 
    // { account , schoolId , role('trainee' or 'trainer') }
    // 返回数据json格式
    // { status, msg }
    apply: function(req, res){
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        })
        .then(apply_model.add_apply)
        .then(function(err){
            result.status = err ? false : true;
            result.msg = err ? msg.ApplyFail : msg.ApplySuccess;
            res.send(result);
            console.log("### Apply");
            res.end();
        })
        .catch();
    },

    // 申请的驾校列表
    // 请求数据json格式 
    // { account, role }
    // 返回数据json格式
    // { 学校数组 }
    getApply: function(req, res){
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        })
        .then(apply_model.get_apply)
        .then(school_model.find_school)
        .then(function(data){
            data = JSON.parse(data);
            var times = data.time;
            var schools = data.schools;
            for(var i = 0; i < times.schools.length; i++){
                for(var j = 0; j < times.schools.length; j++){
                    if(times.schools[i] == schools[j]._id){
                        (schools[j])['time'] = times.time[i];
                        (schools[j])['status'] = times.status[i];
                        break;
                    }
                }
            }
            res.send({schools:schools,status:true});
            console.log("### Trainee get apply school");
            res.end();
        })
        .catch();
    },

    // 我的驾校列表
    // 请求数据json格式 
    // { account, role }
    // 返回数据json格式
    // { 学校数组 }
    getSchools: function(req, res){
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        })
        .then(apply_model.get_acceptschools)
        .then(school_model.find_school)
        .then(function(data){
            data = JSON.parse(data);
            var schools = data.schools;
            res.send({schools:schools,status:true});
            console.log("### Trainee get apply school");
            res.end();
        })
        .catch();
    }
}

module.exports = controller;