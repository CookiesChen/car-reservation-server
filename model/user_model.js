var allModel = require('../model/schema.js')

var User = allModel.user;


var model = {

    add_user: function(data){
        var json_data = JSON.parse(data);
        var account = json_data.account;
        var password = json_data.password;
        var phone = json_data.phone;
        var user = new User({
            _id: account,
            password: password,
            name : "",
            phone : phone,
            schoolId : "",
            role : "none"
        });
        return new Promise(function(resolve, reject){
            user.save(err=>{
                resolve(err);
            });
        });
    },

    find_user: function(data){
        var json_data = JSON.parse(data);
        var account = json_data.account;
        var password = json_data.password;
        return new Promise(function(resolve, reject){
            User.findById({_id:account,password:password}, function(err, userToFind){
                resolve(userToFind);
            });
        });
    },

    update_user : function(data){
        var json_data = JSON.parse(data);
        var account = json_data.account;
        return new Promise(function(resolve, reject){
            User.findByIdAndUpdate(account, json_data, function(err, doc){
                resolve(err);
            });
        });
    }


}


module.exports = model