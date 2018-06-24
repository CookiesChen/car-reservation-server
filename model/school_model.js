var allModel = require('../model/schema.js')

var School = allModel.school;


var model = {

    find_school: function(data){
        var json_data = JSON.parse(data);
        return new Promise(function(resolve, reject){
            School.find({ _id : {"$in" : json_data.schools}}, function(err, schools){
                resolve(JSON.stringify({schools : schools, time: json_data}));
            });
        });
    },

    add_school : function(data){
        var json_data = JSON.parse(data);
        var schoolId = json_data.schoolId;
        var school = new School({
            _id : schoolId,
            phone : "",
            email : "",
            trainees: []
        });
        return new Promise(function(resolve, reject){
            school.save(err=>{
                console.log(1);
                resolve(err);
            });
        });
    },

    add_trainee : function(data){
        var json_data = JSON.parse(data);
        var schoolId = json_data.schoolId;
        var account = json_data.account;
        return new Promise(function(resolve, reject){
            School.collection.update({ "_id" : schoolId },{ "$push" : { trainees : account}}, function(err){
                resolve(err);
            });
        });
    },

    add_trainer : function(data){
        var json_data = JSON.parse(data);
        var schoolId = json_data.schoolId;
        var account = json_data.account;
        return new Promise(function(resolve, reject){
            School.collection.update({ "_id" : schoolId },{ "$push" : { trainers : account}}, function(err){
                resolve(err);
            });
        });
    }
}


module.exports = model