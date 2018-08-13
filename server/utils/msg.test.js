var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./msg');

describe('generateMessage',function(){
it('should generate correct message object',function(){
    var from = 'shenalie';
    var text = 'HOLA';
    var msg = generateMessage(from,text);

    expect(msg.CreateAt).toBeA('number');
    expect(msg.from).toBe('shenalie');
    expect(msg.text).toBe('HOLA');

});
  
});

describe('generateLocationMessage',function(){
    it('should generate correct location object',function(){
        var from ='Shenalie';
        var lat = 43.6454875;
        var long = -79.3902167;

        var location = generateLocationMessage(from,lat,long);
        expect(location.CreateAt).toBeA('number');
        expect(location.from).toBe('Shenalie');
        expect(location.url).toBe(`https://www.google.com/maps?q=43.6454875,-79.3902167`);
    });
});