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
 
socket.on('newLocationMessage',function(data){
    console.log(`${data.url}`);
    var li = jQuery('<li></li>');
    var a = jQuery('<a target ="_blank">My Current Location:</a>'); 
    li.text(`${data.from}: `);
    a.attr('href',data.url);
    li.append(a); 
    jQuery('#messages').append(li);
});

jQuery('#msg-form').on('submit',function(E){
    E.preventDefault();
    socket.emit('createMessage',{
        from:'User',
        text: jQuery('[name=msg]').val()
    },function(){
        jQuery('[name=msg]').val('');
    });
});

var locationButton = jQuery('#location');  
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('geolocation not supported by your browser');   
    }

    locationButton.attr('disabled','disabled').text('sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('send location');
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude:position.coords.longitude

        });
    },function(){
        locationButton.removeAttr('disabled');
        alert('unable to fetch location');
    });
})