var user_model = require('../model/user_model.js')

var controller = {
    login: function (req, res) {
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        }).then(user_model.find_user)
        .then(function(data){
            res.send(JSON.parse(data));
            console.log("### Login");
            res.end();
        }).catch();
    },

    regist: function (req, res) {
        return new Promise(function(resolve, reject){
            resolve(JSON.stringify(req.body));
        }).then(user_model.add_user)
        .then(function(data){
            res.send(JSON.parse(data));
            console.log("### register");
            res.end();
        }).catch();
    }
}

module.exports = controller;