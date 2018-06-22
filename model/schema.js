var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var conn = mongoose.connect('mongodb://127.0.0.1:27017/car');

var model = {

    user : mongoose.model('User', new mongoose.Schema({
        _id : String,
        password : String,
        name : String,
        phone : String,
        schoolId: String,

        status : Boolean, 
        //是否已经申请

        role: String
        // none    未定
        // trainee 学员
        // trainer 教练
        // admin   管理员
    })),
    
    school: mongoose.model('School', new mongoose.Schema({
        _id : String,
        // 名字作为主码
        phone : String,
        email : String,
        trainees:[{
            _id : String,
            name : String,
            phone : String
        }]

    })),

    applytrainee:  mongoose.model('applyTrainee', new mongoose.Schema({
        schoolId : String,
        traineeId : String
    }))
}

module.exports = model