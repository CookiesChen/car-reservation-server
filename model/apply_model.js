var allModel = require('../model/schema.js')

var Apply = allModel.apply;


var model = {

    // 添加申请
    add_apply : function(data){
        var json_data = JSON.parse(data);
        var account = json_data.account;
        var schoolId = json_data.schoolId;
        var role = json_data.role;
        var mydate = new Date();
        var apply = new Apply({
            schoolId: schoolId,
            account: account,
            applytime: mydate,
            role: role,
            status: "wait"
        });
        return new Promise(function(resolve, reject){
            apply.save(err=>{
                if(err) reject();
                else{
                    resolve(JSON.stringify({
                        schoolId: schoolId,
                        account: account,
                        applytime: mydate,
                        role: role,
                        status: "wait"
                    }));
                }
            });
        });
    },

    // 接受申请
    accept_apply : function(data){
        var json_data = JSON.parse(data);
        var account = json_data.account;
        var schoolId = json_data.schoolId;
        var role = json_data.role;
        console.log(json_data.role);
        return new Promise(function(resolve, reject){
            Apply.update({account: account, schoolId: schoolId}, { status: "accept", role: role }, function(err){
                if(err) reject();
                else{
                    resolve(data);
                }
            });
        });
    },
    
    // 获得学校ID、申请时间列表
    get_apply : function(data){
        var json_data = JSON.parse(data);
        var account = json_data.account;
        var role = json_data.role;
        return new Promise(function(resolve, reject){
            Apply.find({ account: account }).populate('schoolId').exec(function(err, apply){
                if(err) reject(err);
                else{
                    var temp = new Array();
                    for(var i = 0; i < apply.length; i++){
                        var obj = {};
                        obj["school"] = apply[i].schoolId._id;
                        obj["email"] = apply[i].schoolId.email;
                        obj["phone"] = apply[i].schoolId.phone;
                        obj["status"] = apply[i].status;
                        obj["applytime"] = apply[i].applytime;
                        temp[i] = obj;
                    }
                    resolve(JSON.stringify(temp));
                }
            });
        });
    },

    // 获得我的驾校列表
    get_acceptschools : function(data){
        var json_data = JSON.parse(data);
        var account = json_data.account;
        var role = json_data.role;
        return new Promise(function(resolve, reject){
            Apply.find({ account: account, status: "accept"}).populate('schoolId').exec(function(err, schools){
                var temp = new Array();
                for(var i = 0; i < schools.length; i++){
                    var obj = {};
                    obj["school"] = schools[i].schoolId._id;
                    obj["email"] = schools[i].schoolId.email;
                    obj["phone"] = schools[i].schoolId.phone;
                    obj["applytime"] = schools[i].applytime;
                    temp[i] = obj;
                }
                resolve(JSON.stringify(temp));
            });
        });
    },

    // 获得教练
    get_trainers : function(data){
        var json_data = JSON.parse(data);
        var schoolId = json_data.schoolId;
        return new Promise(function(resolve, reject){
            Apply.find({ schoolId: schoolId, role: "trainer", status: "accept"}).populate('account').exec(function(err, trainers){
                var temp = [];
                for(var i = 0; i < trainers.length; i++){
                    var obj = new Object();
                    obj['account'] = trainers[i].account._id;
                    obj['name'] = trainers[i].account.name;
                    obj['schoolId'] = trainers[i].account.schoolId;
                    obj['phone'] = trainers[i].account.phone;
                    temp.push(obj);
                }
                resolve(JSON.stringify(temp));
            });
        });
    },

    // 获得教练
    get_trains : function(data){
        var json_data = JSON.parse(data);
        var schoolId = json_data.schoolId;
        return new Promise(function(resolve, reject){
            Apply.find({ schoolId: schoolId, role: "trainer", status: "accept"}).populate('account').exec(function(err, trainers){
                var temp = [];
                for(var i = 0; i < trainers.length; i++){
                    var obj = new Object();
                    obj['account'] = trainers[i].account._id;
                    obj['name'] = trainers[i].account.name;
                    obj['schoolId'] = trainers[i].account.schoolId;
                    obj['phone'] = trainers[i].account.phone;
                    temp.push(obj);
                }
                resolve(JSON.stringify(temp));
            });
        });
    }
}


module.exports = model