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
            time: mydate,
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
                        time: mydate,
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
            Apply.find({ account: account },function(err, apply){
                if(err) reject();
                else{
                    var temp = {applytimes: [], schoolIds: []};
                    for(var i = 0; i < apply.length; i ++){
                        temp.schoolIds[i] = apply[i].schoolId;
                        temp.applytimes[i]  = apply[i].time;
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
            Apply.find({ account: account, status: "accept"},function(err, schools){
                var temp = { schoolIds: [] };
                for(var i = 0; i < schools.length; i ++){
                    temp.schoolIds[i] = schools[i].schoolId;
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
            Apply.find({ schoolId: schoolId, role: "trainer", status: "accept"},function(err, trainers){
                var temp = { users: [] };
                for(var i = 0; i < trainers.length; i ++){
                    temp.users[i] = trainers[i].account;
                }
                console.log(trainers);
                resolve(JSON.stringify(temp));
            });
        });
    }
}


module.exports = model