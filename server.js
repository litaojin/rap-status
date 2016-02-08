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
app.get('/admin', function(req, res){	
	res.render('admin');	
});
app.get('/', function(req, res){  
  res.render('index');  
});

/*
app.use('/wechat', wechat(config, wechat.text(function (message, req, res, next) {
  // message为文本内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125035',
  // MsgType: 'text',
  // Content: 'http',
  // MsgId: '5837397576500011341' }

  console.log("A wechat message coming");
  //res.reply('Welcome to join, reply with: \n- 1: \n- 2: \n- 3: \n- 4:');

  db.status.find().toArray(function(err, docs){
      if(err) return next(err);
      str = "";
      str += "Sync on " + docs[0].LatestSync + '\n\n';
      for(var i in docs){
        str += docs[i].BranchName + " - " + docs[i].Last24hrCLs + " - " + docs[i].Last1wksCLs + ' CL '+ docs[i].LatestCL + '\n';
      }
      str += '\n'

      for(var i in docs){
        str += '== ' + docs[i].BranchName + ' ==\n';

        for(var j in docs[i].changes){
          str += docs[i].changes[j] + '\n\n';
        }
      }

      res.reply(str);
  }); 

})));
*/
app.use(function(err, req, res, next){
	res.status(500).send("Error");
});

app.listen(port, function(){
	console.log(' + app listening...');
});
