var router = require('express').Router();
var db = require('./db');
var wechat = require('wechat');

/*
var config = {
  token: 'coffeeme',
    appid: 'wx0b91e5a4b445edb0',
    encodingAESKey: 'g3FCrTgdIHEpyhaBjV195nsMPGvCjuP63a58dTchRHO'
};
*/
/* 737411942@qq.com 
var config = {
  token: 'coffeeme',
  appid: 'wxf750276bde09abf6'  
};
*/

var config = {
  token: 'instant',
  appid: 'wx273ac5b9393da6a5'  
};

var help_str = "Reply:\n '#'' for details check-in\n 'a' for branch check-in\n 'w' for open bug"
router.use('/iap', wechat(config, wechat.text(function (message, req, res, next) {
  // message为文本内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125035',
  // MsgType: 'text',
  // Content: 'http',
  // MsgId: '5837397576500011341' }

  //res.reply('Welcome to join, reply with: \n- 1: \n- 2: \n- 3: \n- 4:');

  console.dir(message);
  str = '';

  if(message.Content === 'a'){
    console.log('a');

    db.status.find().toArray(function(err, docs){
      if(err) return next(err);

      str += "Sync on " + docs[0].LatestSync + '\n\n';
      for(var i in docs){
        str += docs[i].BranchName + " - " + docs[i].Last24hrCLs + " - " + docs[i].Last1wksCLs + '\n CL '+ docs[i].LatestCL + ' @ ' + docs[i].LatestSubmitDate + '\n\n';
      }
      str += '\n'      

      for(var i in docs){
        str += '== ' + docs[i].BranchName + ' ==\n';

        for(var j in docs[i].changes){
          //str += docs[i].changes[j] + '\n\n';
        }
      }
      res.reply(str);
    }); 

  }
  else if(message.Content === 'w'){
    console.log('w');

    db.wkload.find().toArray(function(err, docs){
      if(err) return next(err);
      
      for(var i in docs){
        str += docs[i].text + " " + docs[i].text2 + " : " + docs[i].sum + '\n';
      }
      
      res.reply(str);
    }); 

  }
  else if(isNaN(Number(message.Content)) == false) {
    console.log(Number(message.Content));

    db.status.find().toArray(function(err, docs){
      if(err) return next(err);

      var i1 = Number(message.Content);

      if(i1 < docs.length){
        str += docs[i1].BranchName + " latest @ " + docs[i1].LatestSubmitDate + '\n';

        for(var j in docs[i1].changes){
          str += docs[i1].changes[j] + '\n\n';
        }      
        res.reply(str);
      }
      else{
        res.reply('Wrong release #'); 
      }      
    });
  } 
  else {
    console.log('others');
    str = 'IAP Release Status\n';

    db.status.find().toArray(function(err, docs){
      if(err) return next(err);
      
      str += "latest sync @ " + docs[0].LatestSync + '\n#) branch - 24hrs - 1 wk\n\n';

      for(var i in docs){        
        str += i + ') ' + docs[i].BranchName + " - " + docs[i].Last24hrCLs + " - " + docs[i].Last1wksCLs + '\n CL '+ docs[i].LatestCL + ' @ ' + docs[i].LatestSubmitDate + '\n\n';
      }

      str += help_str;
      
      res.reply(str);
    }); 
  }
  
})));

module.exports = router;