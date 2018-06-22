var allModel = require('../model/schema.js')

var applyTrainee = allModel.applytrainee;


var model = {

    add_applytrainee : function(data){
        var json_data = JSON.parse(data);
        var account = json_data.account;
        var schoolId = json_data.schoolId;
        var apply = new applyTrainee({
            schoolId : schoolId,
            traineeId : account
        });
        return new Promise(function(resolve, reject){
            apply.save(err=>{
                resolve(err);
            });
        });
    },

    get_applyschools : function(data){
        var json_data = JSON.parse(data);
        var account = json_data.account;
        return new Promise(function(resolve, reject){
            applyTrainee.find({ traineeId : account},function(err, schools){
                var temp = { schools: [] };
                for(var i = 0; i < schools.length; i ++){
                    temp.schools[i] = schools[i].schoolId;
                }
                resolve(JSON.stringify(temp));
            });
        });
    }

}


module.exports = model