var school_model = require('../model/school_model.js')

var result = {status:true, msg: ""}

var msg = {
    RegistSuccess: "Regist school success",
    RegistFail: "School's name has been registed"
}

var controller = {

    // 注册
    // 请求数据json格式 
    // { schoolId }
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
    }
}

module.exports = controller;