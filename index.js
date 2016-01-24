var express = require('express');
var bodyParser = require('body-parser');
var userList = require('./user-list.js');
var app     = express();


app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
  res.render('index');
});

app.post('/get_users', function(req, res){
  var screen_name = req.body.handle;

  var users = userList(res, screen_name);
});

var server = app.listen(3000, function(){
  console.log("Our application is running at http://localhost:3000/");
});
