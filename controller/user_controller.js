var controller = {
    login: function (req, res) {
        console.log(req.body.account);
        console.log(req.body.password);
        console.log(req.body.phone);
        console.log(req.body.email);
        console.log(req.body.nickname);
        console.log(req.body.identity);
        console.log(req.body.identityId);
        res.end('login');
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