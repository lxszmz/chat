/**
 * Created by Administrator on 2016/4/22.
 */
window.onload=function(){

    var socket =io.connect();//创建socket
    socket.on('connect', function() {
        //连接到服务器后，显示昵称输入框
        document.getElementById('info').textContent = '请输入您的账号...';
        document.getElementById('nickWrapper').style.display = 'block';
        document.getElementById('nicknameInput').focus();
    });

    //登陆按钮点击事件,触发服务器的login信号
    var loginBtn = document.getElementById("loginBtn");
    loginBtn.addEventListener("click",function(){
        userName = document.getElementById('nicknameInput').value;
        socket.emit("login",userName);
        document.getElementById("loginWrapper").style.display="none";
    });

    //收到服务器发送的登陆事件
    var text = document.getElementsByClassName("top");
    socket.on("login",function(data){
        var p = document.createElement('p');
        p.textContent = data+"进入聊天室";
        text.item(0).appendChild(p);

    });

    //收到服务器的消息
    socket.on("msg",function(data){
        var p = document.createElement('p');
        p.textContent = data;
        text.item(0).appendChild(p);

    });

    var btn = document.getElementById("sendBtn");
    var oMsg= document.getElementsByTagName("textArea").item(0);
    btn.addEventListener("click",function(){
       socket.emit("msg",userName+":"+oMsg.value);
       oMsg.value="";
    });

}