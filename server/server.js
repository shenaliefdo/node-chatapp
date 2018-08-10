const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const path_plan = path.join(__dirname,'../public');

var port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app); 
var io = socketIO(server);  

//server up middleware access to public
app.use(express.static(path_plan));

io.on('connection',function(socket){
    console.log('new user connection');  
    
    socket.emit('newMessage',{
        from:'shenalie',
        text:'hey, whats going on.',
        createAt: 124 
    });
    
    socket.on('createMessage',function(msg){
        console.log('createMessage:', msg);
        io.emit('newMessage',{
            from: msg.from,
            text: msg.text,
            createAt: new Date().getTime()
        });
    });  

    socket.on('disconnect',function(socket){
        console.log('user disconnected');
    });

    
});



//listen on port 3000
server.listen(port,function(){
    console.log(`server is up on port ${port}`);
});

