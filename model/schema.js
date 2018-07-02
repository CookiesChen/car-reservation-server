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
        role: String
        // none    未定
        // trainee 学员
        // trainer 教练
        // admin   管理员
    })),
    
    school: mongoose.model('School', new mongoose.Schema({
        _id : String,
        phone : String,
        email : String

    })),

    apply:  mongoose.model('apply', new mongoose.Schema({
        schoolId :{ type: String, ref: 'School'},
        account : { type: String, ref: 'User'},
        applytime : Date,
        role : String,
        status: String
        // accept  通过
        // wait    审核中
        // reject  被拒绝
    })),


    train: mongoose.model('train', new mongoose.Schema({
        trainer : {type: String, ref: 'User'},
        trainees : [{type: String, ref: 'User'}],
        schoolId: {type: String, ref: 'School'},
        name: { type: String, unique: true},
        starttime : Date,
        endtime : Date,
        registtime : Date
        // accept  通过
        // wait    审核中
        // reject  被拒绝
    })),

    message: mongoose.model('Message', new mongoose.Schema({
        from : String,
        to : String,
        time : Date,
        content : String,
        finish: Boolean
        // true 已读
        // false 未读
    }))

}

module.exports = model