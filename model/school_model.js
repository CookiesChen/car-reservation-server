var allModel = require('../model/schema.js')

var School = allModel.school;


var model = {

    find_school: function(data){
        var json_data = JSON.parse(data);
        console.log(data);
        return new Promise(function(resolve, reject){
            School.find({ _id : {"$in" : json_data.schools}}, function(err, schools){
                resolve(schools);
            });
        });
    },

    add_school : function(data){
        var json_data = JSON.parse(data);
        var schoolId = json_data._id;
        var school = new School({
            _id : schoolId,
            phone : "",
            email : "",
            trainees: []
        });
        return new Promise(function(resolve, reject){
            school.save(err=>{
                resolve(err);
            });
        });
    }

}


module.exports = model