
var request = require('superagent');

request.get('http://localhost', function(err, res){
		console.log(res);					
	});