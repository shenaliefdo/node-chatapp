// const path = require('path');
// const http = require('http');
// const express = require('express');
// const socketIO = require('socket.io');
// const {generateMessage,generateLocationMessage}= require('./utils/msg');
// const {isRealString}=require('./utils/validator'); 
// const {Users} = require('./utils/users');  

// const path_plan = path.join(__dirname,'../public');

// var port = process.env.PORT || 3000;

// var app = express();
// var server = http.createServer(app); 
// var io = socketIO(server); 
// var user = new Users(); 

// //server up middleware access to public
// app.use(express.static(path_plan));

// io.on('connection',function(socket){
//     console.log('new user connection');  
    
    
    
//     socket.on('join',function(params,callback){
        
//         if(!isRealString(params.name) || !isRealString(params.room)){
//             return  callback('name and room name are required');
//         }
//         socket.join(params.room);
//         user.removeUser(socket.id);
//         user.addUser(socket.id, params.name,params.room);
        
//         io.to(params.room).emit('updateUserList',user.getUserList(params.room));
        

//         socket.emit('newMessage',generateMessage('Admin',`Welcome to the Chat Room: ${params.room}  `));

//         socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin','New User Joined')) ;
//         callback();
//     });


    
//     socket.on('createMessage',function(msg,callback){
//         console.log('createMessage:', msg);
//         //io.emit can be used to send msg to everyone including sender
//         io.emit('newMessage',generateMessage(msg.from,msg.text));
//         callback('this is from the server');
//         //emit to everyone but emitting socket
//         // socket.broadcast.emit('newMessage',{
//         //     from: msg.from,
//         //     text: msg.text,
//         //     createAt: new Date().getTime()
//         // });
//     });  

//     socket.on('createLocationMessage',function(coords){
//         io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longitude));
//     })


//     socket.on('disconnect', () => {
//         var users = user.removeUser(socket.id);
    
//         if (users) {
//           io.to(users.room).emit('updateUserList', user.getUserList(users.room));
//           io.to(users.room).emit('newMessage', generateMessage('Admin', `${users.name} has left.`));
//         }
//       });

      
    
// });
 


// //listen on port 3000
// server.listen(port,function(){
//     console.log(`server is up on port ${port}`);
// });



const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/msg');
const {isRealString} = require('./utils/validator');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));  
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});