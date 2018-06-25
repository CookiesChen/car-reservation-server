var allModel = require('../model/schema.js')

var Message = allModel.message;


var model = {

    add_message : function(data){
        var json_data = JSON.parse(data);
        var from = json_data.account;
        var to = json_data.to;
        var message = new Message({
            from : from,
            to : to,
            time : new Date(),
            content : content,
            finish: false
        });
        return new Promise(function(resolve, reject){
            message.save(err=>{
                if(err) reject();
                else{
                    resolve(JSON.stringify({
                        from : from,
                        to : to,
                        time : time,
                        content : content,
                        finish: false
                    }));
                }
            });
        });
    },

    get_messages : function(data){
        var json_data = JSON.parse(data);
        var to = json_data.to;
        return new Promise(function(resolve, reject){
            Message.find({ to: to },function(err, messages){
                if(err) reject();
                else{
                    resolve(JSON.stringify({messages: messages}));
                }
            });
        });
    }

}


module.exports = model