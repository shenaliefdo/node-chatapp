var socket = io();

socket.on('connect',function(){
    console.log('connected to server');
    
    // socket.emit('createMessage',{
    //     to:'Tyler',
    //     text:'hi bubs' 
    // });  
});

socket.on('disconnect',function(){
    console.log('disconnected from server');
});
        
socket.on('newMessage',function(msg){
    console.log('new message:',msg);
    var li = jQuery('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);

    jQuery('#messages').append(li);
});
 

jQuery('#msg-form').on('submit',function(E){
    E.preventDefault();
    socket.emit('createMessage',{
        from:'User',
        text: jQuery('[name=msg]').val()
    },function(){
        
    });
});
