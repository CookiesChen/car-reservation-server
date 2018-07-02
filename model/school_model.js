var allModel = require('../model/schema.js')

var School = allModel.school;


var model = {

    
    get_schools: function(){
        return new Promise(function(resolve, reject){
            School.find(function(err, schools){
                if(err) reject()
                else{
                    resolve(JSON.stringify({
                        schools: schools
                    }));
                }
            });
        });
    },

    add_school : function(data){
        var json_data = JSON.parse(data);
        var schoolId = json_data.schoolId;
        var phone = json_data.phone;
        var email = json_data.email;
        var school = new School({
            _id : schoolId,
            phone : phone,
            email : email
        });
        return new Promise(function(resolve, reject){
            school.save(err=>{
                if(err) reject(err);
                else{
                    resolve(JSON.stringify({
                        schoolId : schoolId,
                        phone : phone,
                        email : email
                    }));
                }
            });
        });
    }
}


module.exports = model