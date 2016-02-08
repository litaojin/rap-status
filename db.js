var mongodb = require('mongodb').MongoClient;

var db_host = 'localhost';
var db_port = 27017;;
var db_name = 'status';


mongodb.db_url = 'mongodb://' + db_host + ':' + db_port + '/' + db_name;
console.log(' + DB connecting...');
mongodb.connect(mongodb.db_url, function(err, db){
	if(err){
		console.dir(err);
		throw err;
	}

	console.log(' + DB connectted');

	mongodb.status = db.collection('status');
	mongodb.wkload = db.collection('wkload');
});

module.exports = mongodb;