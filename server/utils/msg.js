var generateMessage = function(from,text){
    return {
        from,
        text,
        CreateAt: new Date().getTime()
    };
};

module.exports = {generateMessage};