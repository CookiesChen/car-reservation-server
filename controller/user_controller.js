var user_model = require('../model/user_model.js')
var apply_model = require('../model/apply_model')
var school_model = require('../model/school_model.js')

var message = require('../model/message.js')

// 返回数据格式
var result = {status:true, msg: "", data: {}}

var controller = {

    // 注册
    // 请求数据json格式 
    // { account, password, phone }
    regist: function (req, res) {
        console.log("### regist");
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        }).then(user_model.add_user)
        .then(function(data){
            result.status = true;
            result.msg = message.RegistSchoolSuccess;
            result.data = JSON.parse(data);
            res.send(result);
            res.end();
        })
        .catch(function(err){
            result.data = {};
            result.msg = message.RegistSchoolFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    },
    
    // 登录
    // 请求数据json格式 
    // { account, password }
    login: function (req, res) {
        console.log("### login");
        var password = req.body.password;
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        }).then(user_model.find_user)
        .then(function(data){
            result.status = true;
            result.msg = message.LoginSuccess;
            result.data = JSON.parse(data);
            res.send(result);
            res.end();
        })
        .catch(function(err){
            result.data = {};
            result.msg = message.LoginFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    },

    // 申请身份
    // 请求数据json格式 
    // { account , schoolId }
    apply: function(req, res){
        console.log("### apply");
        return new Promise(function(resolve, reject){
            var role = (req.url == "/applytrainee") ? "trainee" : "trainer";
            resolve(JSON.stringify({
                account: req.body.account,
                schoolId: req.body.schoolId,
                role: role
            }));
        })
        .then(apply_model.add_apply)
        .then(function(data){
            result.status = true;
            result.msg = message.ApplySuccess;
            result.data = JSON.parse(data);
            res.send(result);
            res.end();
        })
        .catch(function(err){
            result.data = {};
            result.msg = message.ApplyFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    },
    
    // 申请的驾校列表
    // 请求数据json格式 
    // { account }
    getApply: function(req, res){
        console.log("### get apply school");
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        })
        .then(apply_model.get_apply)
        .then(function(data){
            data = JSON.parse(data);
            console.log(data);
            result.data = data;
            result.msg = message.getApplySuccess;
            result.status = true;
            res.send(result);
            res.end();
        })
        .catch(function(err){
            console.log(err);
            result.data = {};
            result.msg = message.getApplyFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    },

    // 我的驾校列表
    // 请求数据json格式 
    // { account }
    getMySchools: function(req, res){
        console.log("### get school");
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        })
        .then(apply_model.get_acceptschools)
        .then(function(data){
            data = JSON.parse(data);
            result.data = data;
            result.msg = message.getApplySuccess;
            result.status = true;
            res.send(result);
            res.end();
        })
        .catch(function(err){
            result.data = {};
            result.msg = message.getApplyFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    },

    // 驾校列表
    // 请求数据json格式 
    // { account }
    getAllSchools: function(req, res){
        console.log("### get school");
        return new Promise(function(resolve, reject){
            resolve();
        })
        .then(school_model.get_schools)
        .then(function(data){
            data = JSON.parse(data);
            result.data = data;
            result.msg = message.GetSchoolsSuccess;
            result.status = true;
            res.send(result);
            res.end();
        })
        .catch(function(err){
            result.data = {};
            result.msg = message.GetSchoolsFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    }
}

module.exports = controller;