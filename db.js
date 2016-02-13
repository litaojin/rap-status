var mongodb = require('mongodb').MongoClient;

var db_host = '127.0.0.1';
var db_port = 27017;;
var db_name = 'status';
var db_user = 'guest'
var db_passwd = '12345678'


mongodb.db_url = 'mongodb://' + db_user + ':' + db_passwd + '@' + db_host + ':' + db_port + '/' + db_name;
console.log(' + Connecting... ' + mongodb.db_url);
mongodb.connect(mongodb.db_url, function(err, db){
	if(err){
		console.dir(err);
		throw err;
	}

	console.log(' + DB connectted');

	mongodb.status = db.collection('status');
	mongodb.wkload_desc = db.collection('wkload_desc');
	mongodb.wkload = db.collection('wkload');
});

module.exports = mongodb;