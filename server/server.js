const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage}= require('./utils/msg');

const path_plan = path.join(__dirname,'../public');

var port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app); 
var io = socketIO(server);  

//server up middleware access to public
app.use(express.static(path_plan));

io.on('connection',function(socket){
    console.log('new user connection');  
    
    socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat App'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined')) ;
    
    
    socket.on('createMessage',function(msg,callback){
        console.log('createMessage:', msg);
        //io.emit can be used to send msg to everyone including sender
        io.emit('newMessage',generateMessage(msg.from,msg.text));
        callback('this is from the server');
        //emit to everyone but emitting socket
        // socket.broadcast.emit('newMessage',{
        //     from: msg.from,
        //     text: msg.text,
        //     createAt: new Date().getTime()
        // });
    });  

    socket.on('createLocationMessage',function(coords){
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longitude));
    })


    socket.on('disconnect',function(socket){
        console.log('user disconnected');
    });

    
    
});
 


//listen on port 3000
server.listen(port,function(){
    console.log(`server is up on port ${port}`);
});

