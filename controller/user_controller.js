var controller = {
    login: function (req, res) {
        console.log('登陆');
        res.end();
    },

    regist: function (req, res) {
        console.log('注册');
        res.end();
    },

    logout: function (req,res){
        console.log('登出');
        res.end();
    }
}

module.exports = controller;