var user_model = require('../model/user_model.js')

var result = {status:true, msg: ""}

var msg = {
    LoginSuccess: "Login success",
    LoginFailUser: "No this User",
    LoginFailPassword: "Wrong Password",
    RegistSuccess: "Regist success",
    RegistFail: "Account has been registed"
}

var controller = {
    login: function (req, res) {
        var account = req.body.account;
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
    }
}

module.exports = controller;