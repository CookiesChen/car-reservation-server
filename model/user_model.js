//mongodb
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var conn = mongoose.connect('mongodb://127.0.0.1:27017/car');
var userSchema = new mongoose.Schema({
  _id : String,
  password : String
});

var User = mongoose.model('User',userSchema);

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
                resolve(err);
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
                resolve(userToFind);
            });
        });
    }



}


module.exports = model