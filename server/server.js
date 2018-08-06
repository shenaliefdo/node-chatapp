const path = require('path');
const express = require('express');

const path_plan = path.join(__dirname,'../public');
//console.log(path_plan);

var port = process.env.PORT || 3000;

var app = express();

//server up middleware access to public
app.use(express.static(path_plan));


//listen on port 3000
app.listen(port,function(){
    console.log(`server is up on port ${port}`);
});

