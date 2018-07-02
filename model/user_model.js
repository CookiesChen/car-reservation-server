var allModel = require('../model/schema.js')
var User = allModel.user;


var model = {
    add_user: function(data){
        var json_data = JSON.parse(data);
        var account = json_data.account;
        var password = json_data.password;
        var phone = json_data.phone;
        var user = new User({
            account: account,
            password: password,
            name : "",
            phone : phone,
            schoolId : "",
            role : "none"
        });
        return new Promise(function(resolve, reject){
            user.save(err=>{
                if(err) reject();
                else{
                    resolve(JSON.stringify({
                        account: account,
                        name : "",
                        phone : phone,
                        schoolId : "",
                        role : "none"
                    }));
                }
            });
        });
    },

    find_user: function(data){
        var json_data = JSON.parse(data);
        var account = json_data.account;
        var password = json_data.password;
        return new Promise(function(resolve, reject){
            User.find({account:account, password:password}, function(err, userToFind){
                if(userToFind.length == 0) reject();
                else{
                    resolve(JSON.stringify({
                        account: account,
                        name : userToFind[0].name,
                        phone : userToFind[0].phone,
                        schoolId : userToFind[0].schoolId,
                        role : userToFind[0].role
                    }));
                }
            });
        });
    },

    get_users: function(data){
        var json_data = JSON.parse(data);
        return new Promise(function(resolve, reject){
            User.find({ account : {"$in" : json_data.users}}, function(err, users){
                resolve(JSON.stringify({users : users}));
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
    },

    modify_user: function(data){
        var json_data = JSON.parse(data);
        var account = json_data.account;
        return new Promise(function(resolve, reject){
            User.findByIdAndUpdate(account, {role: json_data.role, schoolId: json_data.schoolId}, function(err, doc){
                if(err) reject();
                else resolve(data);
            });
        });
    }
}


module.exports = model