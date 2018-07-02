var user_model = require('../model/user_model.js')
var apply_model = require('../model/apply_model')
var school_model = require('../model/school_model.js')
var message_model = require('../model/message_model.js')

var msg = require('../model/msg')

// 返回数据格式
var result = {status:true, msg: "", data: {}}

var controller = {

    // 注册
    // 请求数据json格式 
    // { account, password, phone }
    regist: function (req, res) {
        console.log("### regist");
        var account = req.body.account;
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        }).then(user_model.add_user)
        .then(function(data){
            req.session.userId = account;
            result.status = true;
            result.msg = msg.RegistSuccess;
            result.data = JSON.parse(data);
            res.send(result);
            res.end();
        })
        .catch(function(err){
            result.data = {};
            result.msg = msg.RegistFail;
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
        var account = req.body.account;
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        }).then(user_model.find_user)
        .then(function(data){
            req.session.userId = account;
            req.session.schoolId = JSON.parse(data).schoolId;
            result.status = true;
            result.msg = msg.LoginSuccess;
            result.data = JSON.parse(data);
            res.send(result);
            res.end();
        })
        .catch(function(err){
            result.data = {};
            result.msg = msg.LoginFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    },

    // 申请身份
    // 请求数据json格式 
    // { schoolId }
    apply: function(req, res){
        console.log("### apply");
        return new Promise(function(resolve, reject){
            var role = (req.url == "/applytrainee") ? "trainee" : "trainer";
            resolve(JSON.stringify({
                account: req.session.userId,
                schoolId: req.body.schoolId,
                role: role
            }));
        })
        .then(apply_model.add_apply)
        .then(function(data){
            result.status = true;
            result.msg = msg.ApplySuccess;
            result.data = JSON.parse(data);
            res.send(result);
            res.end();
        })
        .catch(function(err){
            result.data = {};
            result.msg = msg.ApplyFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    },
    
    // 申请的驾校列表
    getApply: function(req, res){
        console.log("### get apply school");
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify({
                account: req.session.userId
            }));
        })
        .then(apply_model.get_apply)
        .then(function(data){
            data = JSON.parse(data);
            result.data = data;
            result.msg = msg.getApplySuccess;
            result.status = true;
            res.send(result);
            res.end();
        })
        .catch(function(err){
            console.log(err);
            result.data = {};
            result.msg = msg.getApplyFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    },

    // 我的驾校列表
    getMySchools: function(req, res){
        console.log("### get my school");
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify({
                account: req.session.userId
            }));
        })
        .then(apply_model.get_acceptschools)
        .then(function(data){
            data = JSON.parse(data);
            result.data = data;
            result.msg = msg.getApplySuccess;
            result.status = true;
            res.send(result);
            res.end();
        })
        .catch(function(err){
            result.data = {};
            result.msg = msg.getApplyFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    },

    // 驾校列表
    getAllSchools: function(req, res){
        console.log("### get all school");
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify({
                account: req.session.userId
            }));
        })
        .then(school_model.get_schools)
        .then(function(data){
            data = JSON.parse(data);
            result.data = data;
            result.msg = msg.GetSchoolsSuccess;
            result.status = true;
            res.send(result);
            res.end();
        })
        .catch(function(err){
            result.data = {};
            result.msg = msg.GetSchoolsFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    },

    // 发送消息
    // 请求数据json格式 
    // { to, content }
    sentMessage: function(req, res){
        console.log("### sent message");
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify({
                from: req.session.userId,
                to: req.body.to,
                content: req.body.content
            }));
        })
        .then(message_model.add_message)
        .then(function(data){
            data = JSON.parse(data);
            result.data = data;
            result.msg = msg.SentMessageSuccess;
            result.status = true;
            res.send(result);
            res.end();
        })
        .catch(function(err){
            console.log(err);
            result.data = {};
            result.msg = msg.SentMessageFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    },

    // 查看消息
    getMessages: function(req, res){
        console.log("### get Messages");
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify({
                to: req.session.userId
            }));
        })
        .then(message_model.get_messages)
        .then(function(data){
            data = JSON.parse(data);
            result.data = data;
            result.msg = msg.GetMessageSuccess;
            result.status = true;
            res.send(result);
            res.end();
        })
        .catch(function(err){
            result.data = {};
            result.msg = msg.GetMessageFail;
            result.status = false;
            res.send(result);
            res.end();
        });
    }
}

module.exports = controller;