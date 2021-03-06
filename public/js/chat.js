var socket = io();

function scrollToBottom(){
    var messages = jQuery('#messages');
    var newMessages = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollHeight = messages.prop('scrollHeight');
    var scrollTop = messages.prop('scrollTop');
    var newMessageHeight = newMessages.innerHeight();
    var previousMessageHeight = newMessages.prev().innerHeight();

    if(clientHeight+scrollTop+newMessageHeight+previousMessageHeight>= scrollHeight){
        messages.scrollTop(scrollHeight);
    }  
};

socket.on('connect',function(){
     var params = jQuery.deparam(window.location.search);

     socket.emit('join',params,function(err){
         if(err){
            alert(err);
            window.location.href = '/';
         }
            console.log("no error");
         
     });  
   // console.log("new user connected");

});

socket.on('disconnect',function(){
    console.log('disconnected from server');
});
        
socket.on('newMessage',function(msg){
    var time = moment(msg.createAt).format('h:mm a')
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
        text: msg.text,
        from: msg.from,
        createAt:time
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});
 
socket.on('updateUserList',function(users){
    var ol = jQuery('<ol></ol>');

  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
});

socket.on('newLocationMessage',function(data){
    var time = moment(data.createAt).format('h:mm a');  
    var template = jQuery('#location-template').html();
    var html = Mustache.render(template,{
        from:data.from,
        url:data.url,
        createAt:time
    });
  
    jQuery('#messages').append(html);
    scrollToBottom(); 
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