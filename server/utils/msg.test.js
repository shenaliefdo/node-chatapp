var expect = require('expect');
var {generateMessage} = require('./msg');

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