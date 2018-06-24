var allModel = require('../model/schema.js')

var Train = allModel.train;


var model = {

    add_train : function(data){
        var json_data = JSON.parse(data);
        var traineeId = json_data.account;
        var trainerId = json_data.trainerId;
        var mydate = new Date();
        var train = new Train({
            traineeId: traineeId,
            trainerId: trainerId,
            time: mydate,
            status: "wait"
        });
        return new Promise(function(resolve, reject){
            train.save(err=>{
                resolve(err);
            });
        });
    },

    update_train : function(data){
        var json_data = JSON.parse(data);
        var traineeId = json_data.account;
        var trainerId = json_data.trainerId;
        return new Promise(function(resolve, reject){
            Train.update({traineeId: traineeId, trainerId: trainerId}, { status: "accept" }, function(err){
                resolve(err);
            });
        });
    },

    get_train : function(data){
        var json_data = JSON.parse(data);
        var account = json_data.account;
        var role = json_data.role;
        return new Promise(function(resolve, reject){
            Train.find({ account: account, role: role },function(err, schools){
                var temp = { schools: [], time: [], status: [] };
                for(var i = 0; i < schools.length; i ++){
                    temp.schools[i] = schools[i].schoolId;
                    temp.time[i] = schools[i].time;
                    temp.status[i] = schools[i].status;
                }
                resolve(JSON.stringify(temp));
            });
        });
    }


}


module.exports = model