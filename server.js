var express = require('express');
var app = express();
var fs = require('fs');

function readJsonFileSync(filepath, req, res){
    var file = fs.readFileSync(filepath, 'utf8');
    res.send(file);
}

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname+'/bower_components/'));
app.get('/patients', function(req, res, next){
  var path = __dirname + '/stats.json';
  readJsonFileSync(path, req, res)
});

app.listen(3040);
console.log('Listening on port 3040...');
