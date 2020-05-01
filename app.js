const http = require('http');
const socketio = require('socket.io');
const server = http.createServer((req, res) =>{
   res.end('o amk nodemon unu global kurunca sorun kalmadı');
});

server.listen(3000);

//sunucuya gelen istekleri dinlemek için yazıldı.
//sunucuya her istek geldiğinde aktif bir bağlantı açılacak
const io = socketio.listen(server);


//Kullanıcı 'connection' yaptığında işlemi yakala
//socket içinde bağlantı yapan kullanıcının bilgileri bulunur.
io.sockets.on('connection',(socket) =>{
   console.log('kullanıcı bağlandı');

   //client'dan selamVer mesajı geldi
   //gelen mesaj karşılandı
   //console birşeyler yazıldı.
   socket.on('selamVer',() =>{
      console.log('client isteği karşılandı');
   });
   setTimeout(() =>{
      socket.emit('merhaba de');
   },1000);


   //socket 'disconnect' olduğunda kullanıcı ayrıldı yazsın :)
   socket.on('disconnect', () =>{
      console.log('Kullanıcı ayrıldı')
   });

});