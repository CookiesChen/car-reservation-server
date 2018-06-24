var allModel = require('../model/schema.js')

var Apply = allModel.apply;


var model = {

    add_apply : function(data){
        var json_data = JSON.parse(data);
        var account = json_data.account;
        var schoolId = json_data.schoolId;
        var role = json_data.role;
        var mydate = new Date();
        var apply = new Apply({
            schoolId : schoolId,
            account : account,
            time : mydate,
            role : role
        });
        return new Promise(function(resolve, reject){
            apply.save(err=>{
                resolve(err);
            });
        });
    },

    delete_apply : function(data){
        var json_data = JSON.parse(data);
        var account = json_data.account;
        var schoolId = json_data.schoolId;
        var role = json_data.role;
        return new Promise(function(resolve, reject){
            Apply.deleteOne({account:account, schoolId:schoolId, role}, function(err){
                resolve(data);
            });
        });
    },

    get_applyschools : function(data){
        var json_data = JSON.parse(data);
        var account = json_data.account;
        var role = json_data.role;
        return new Promise(function(resolve, reject){
            Apply.find({ account: account, role: role },function(err, schools){
                var temp = { schools: [], time : [] };
                for(var i = 0; i < schools.length; i ++){
                    temp.schools[i] = schools[i].schoolId;
                    temp.time[i] = schools[i].time;
                }
                resolve(JSON.stringify(temp));
            });
        });
    }

}


module.exports = model