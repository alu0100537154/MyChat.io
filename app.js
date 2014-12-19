var express = require("express");
app = express();

var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = {};
var port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
    socket.on('new user', function(data, callback){
        if (data in users){
            callback(false);
        }else{
            callback(true);
            /*console.log('Datos del cliente\n');
            console.log(data);
            console.log('\n');*/
            socket.username = data;
            /*console.log('Variable Socket\n');
            console.log(socket);*/
            users[socket.username] = socket;
            /*console.log('Hash de usuarios\n')
            console.log(users[socket.name]);*/
            //socket.broadcast.emit("add user", 'conectado', 'El usuario ' + data + ' se ha conectado');
            console.log(data);
            io.emit('add user', data);
            io.emit('usernames', Object.keys(users));
        }
    });

    socket.on('chat message', function(data, callback){
        var msg = data.trim();
        if(msg.substr(0,3) === 's/ '){
            msg = msg.substr(3);
            var ind = msg.indexOf(' ');
            if(ind !== -1){
                var name = msg.substring(0 ,ind);
                var msg = msg.substring(ind + 1);
                if (name in users){
                    users[name].emit('secret', {msg: msg, nick: socket.username});
                    users[socket.username].emit('secret', {msg: msg, nick: socket.username});
                    console.log("Emitiendo el mensaje secreto desde " + socket.username + " a " + name);
                } else {
                    callback('Introduzca un usuario valido');
                }
            } else{
                callback("Error: no puede enviar un mensaje vacio");
            }
        }
        else{
            io.sockets.emit('chat message', {msg: msg, nick: socket.username});
        }
    });

    socket.on('disconnect', function(data){
        if (!socket.username) return;
        delete users[socket.username];
        io.emit('user disconnect');
        io.emit('usernames', Object.keys(users));
    })

});

http.listen(port, function(){
  console.log('Server listening on port ' + port);
  console.log('MyChat.io is rinning!!!');
});