const http = require('http');
const socketio = require('socket.io');

const server = http.createServer((req, res) =>{
    res.end('heyoo');
});

server.listen(3000);

const io = socketio.listen(server);

io.sockets.on('connect',(socket) =>{
    console.log('Kullanıcı Bağlandı');

    socket.on('new-user', (data) =>{
       socket.broadcast.emit('user', {name : data.name});
    });

    socket.on('disconnect',() =>{
       console.log('Kullanıcı Ayrıldı');
    });
});