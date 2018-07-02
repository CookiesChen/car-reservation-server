var allModel = require('../model/schema.js')

var Train = allModel.train;


var model = {

    add_train : function(data){
        var json_data = JSON.parse(data);
        var trainer = json_data.trainer;
        var name = json_data.name;
        var starttime = json_data.starttime;
        var endtime = json_data.endtime;
        var registtime = json_data.registtime;
        var train = new Train({
            trainees: [],
            name: name,
            trainer: trainer,
            starttime: starttime,
            endtime: endtime,
            registtime: registtime
        });
        return new Promise(function(resolve, reject){
            train.save(err=>{
                if(err) reject();
                else{
                    resolve(JSON.stringify({
                        trainees: [],
                        trainer: trainer,
                        starttime: starttime,
                        endtime: endtime,
                        registtime: registtime
                    }));
                }
            });
        });
    },

    get_train : function(data){
        var json_data = JSON.parse(data);
        var trainer = json_data.trainer;
        return new Promise(function(resolve, reject){
            Train.find({ trainer: trainer },function(err, trains){
                if(err) reject();
                else{
                    console.log(trains);
                    resolve(JSON.stringify(trains));
                }
            });
        });
    },

    add_trainee : function(data){
        var json_data = JSON.parse(data);
        var trainee = json_data.trainee;
        var name = json_data.name;
        return new Promise(function(resolve, reject){
            Train.findOneAndUpdate({ name: name },{$addToSet:{trainees: trainee}},function(err, traintoFind){
                if(err) reject();
                else{
                    resolve(JSON.stringify(traintoFind));
                }
            });
        });
    },

    get_mytrains : function(data){
        var json_data = JSON.parse(data);
        var account = json_data.account;
        return new Promise(function(resolve, reject){
            Train.find({trainees: account}).exec(function(err, trains){
                if(err) reject();
                else{
                    console.log(trains);
                    resolve(JSON.stringify(trains));
                }
            });
        });
    },


}


module.exports = model