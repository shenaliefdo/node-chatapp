var generateMessage = function(from,text){
    return {
        from,
        text,
        CreateAt: new Date().getTime()
    };
};

var generateLocationMessage = function(from,latitude,longitude){
    return {
        from,
        url:`https://www.google.com/maps?q=${latitude},${longitude}`,
        CreateAt: new Date().getTime()
    }
}

module.exports = {generateMessage,generateLocationMessage};