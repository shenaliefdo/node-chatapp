var socket = io();

socket.on('connect',function(){
    console.log('connected to server');
    
    socket.emit('createMessage',{
        to:'Tyler',
        text:'hi bubs' 
    });  
});

socket.on('disconnect',function(){
    console.log('disconnected from server');
});
       
socket.on('newMessage',function(msg){
    console.log('new message:',msg);
});
  
