var express = require('express');
var app = express();

var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');

var port = 80;

var db = require('./db');
var api = require('./api');
var wechat =  require('./wechat');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());

app.use('/api', api);
app.use('/wechat', wechat);
app.get('/', function(req, res){  
  res.render('index.html');  
});

app.use(function(err, req, res, next){
	res.status(500).send("Error, ha ha ha, call me...");
});

app.listen(port, function(){
	console.log(' + app listening...');
});
