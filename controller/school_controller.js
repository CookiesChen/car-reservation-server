var school_model = require('../model/school_model.js')
var apply_model = require('../model/apply_model')

var result = {status:true, msg: ""}

var msg = {
    RegistSuccess: "Regist school success",
    RegistFail: "School's name has been registed",
    AcceptSuccess: "Accept trainee success",
    AcceptFail: "Accept trainee fail",
}

var controller = {

    // 注册驾校
    // 请求数据json格式 
    // { schoolId } 待完善
    // 返回数据json格式
    // { status, msg }
    registSchool: function (req, res) {
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        }).then(school_model.add_school)
        .then(function(err){
            result.status = err ? false : true;
            result.msg = err ? msg.RegistFail : msg.RegistSuccess;
            res.send(result);
            console.log("### register school");
            res.end();
        }).catch();
    },

    // 同意学员申请
    // 请求数据json格式 
    // { account, schoolId, role}
    // 返回数据json格式
    // { status, msg }
    acceptTrainee: function(req, res){
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        })
        .then(apply_model.update_apply)
        .then(function(err){
            result.status = err ? false : true;
            result.msg = err ? msg.AcceptFail : msg.AcceptSuccess;
            res.send(result);
            console.log("### accept trainee");
            res.end();
        }).catch();
    },

    // 同意教练申请
    // 请求数据json格式 
    // { account, schoolId, role}
    // 返回数据json格式
    // { status, msg }
    acceptTrainer: function(req, res){
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        })
        .then(apply_model.update_apply)
        .then(function(err){
            result.status = err ? false : true;
            result.msg = err ? msg.AcceptFail : msg.AcceptSuccess;
            res.send(result);
            console.log("### accept trainer");
            res.end();
        }).catch();
    }
}

module.exports = controller;