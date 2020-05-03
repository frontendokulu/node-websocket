const http = require('http');
const socketio = require('socket.io');
const server = http.createServer((req,res) =>{
    res.end('heyoo');
});

server.listen(3000);

const io = socketio.listen(server);
io.on('connection', (socket) =>{
   socket.on('joinRoom',(data) =>{
        // console.log(data);
       socket.join(data.name, () => {
           //odada bulunan kişi sayısını bulur.
            let count = io.sockets.adapter.rooms[data.name].length;
           //socket kendi hariç odada bulunan herkese gönderir
          io.to(data.name).emit('new join',{count});

          // io odada bulunan herkese gönderir,
          // ilk durumda herkeste görünmez çünkü
          // diğerleri henüz odada değiller :)
          // io.to(data.name).emit('new join');
           socket.emit('log', {message : 'Odaya girdiniz.'});
      });

   });
});
