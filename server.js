//服务器及页面响应部分
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server); //引入socket.io模块并绑定到服务器
app.use('/', express.static(__dirname ));
server.listen(8090);
console.log("服务器已经开启>>>>");
var sockets = [];
io.on('connection', function (socket) {
   sockets.push(socket);
    //登陆
    socket.on("login",function(data){
        console.log(data+"进入聊天室");
        sockets.forEach(function(item){
            item.emit("login",data);
        });

    });

    //消息
    socket.on("msg",function(data){
        sockets.forEach(function(item){
            item.emit("msg",data);
        });
    });

});

