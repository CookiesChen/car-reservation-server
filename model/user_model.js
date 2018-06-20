//mongodb
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var conn = mongoose.connect('mongodb://127.0.0.1:27017/car');
var userSchema = new mongoose.Schema({
  _id : String,
  password : String
});

var User = mongoose.model('User',userSchema);

var result = {status:true, msg:" "};

var model = {
    add_user: function(data){
        var json_data = JSON.parse(data);
        var account = json_data.account;
        var password = json_data.password;
        var user = new User({
            _id: account,
            password: password
        });
        return new Promise(function(resolve, reject){
            user.save(err=>{
                if(err){
                    result.status = false;
                    result.msg = "Register Fail";
                }
                else{
                    result.status = true;
                    result.msg = "Register Success";
                }
                resolve(JSON.stringify(result));
            });
        });
    },

    find_user: function(data){
        var json_data = JSON.parse(data);
        var account = json_data.account;
        var password = json_data.password;
        var user = new User({
            _id: account,
            password: password
        });
        return new Promise(function(resolve, reject){
            User.findById(account, function(err, userToFind){
                if(userToFind == null){
                    result.status = false;
                    result.msg = "Login Fail";
                }
                else{
                    result.status = true;
                    result.msg = "Login Success";
                }
                resolve(JSON.stringify(result));
            });
        });
    }



}


module.exports = model