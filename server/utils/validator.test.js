const expect = require('expect');
const {isRealString} = require('./validator');

describe('isRealString',function(){
it('should reject non-string values',function(){
   var res = isRealString(98);

   expect(res).toBe(false);
});

it('should reject strings with only space',function(){
    var res = isRealString("    ");

    expect(res).toBe(false);

});

it('should allow string with non-space characters',function(){
    var res = isRealString("jhsg    fi875   ");
    expect(res).toBe(true);
});
  
});