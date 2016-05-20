var express = require('express');
var app = express();

var PORT = 3000;


app.use(express.static(__dirname + './../client'));

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(PORT, function(){
  console.log('swordsGame listening on port', PORT);
})