var router = require('express').Router();
var db = require('./db');

router.get('/status/clean', function(req, res){
	db.status.remove();
	res.status(200).end();
	console.log('Clean');	
});

router.post('/status', function(req, res, next){
	console.dir(req.body);
	db.status.insert(req.body, {w:1}, function(err, doc) {		
		if(err) return next(err);

		if(doc === 1) {
        	res.status(200).json(doc);
        }else{
        	res.status(401).json({name: 'UpdateError', message:'Update failed'});
        }			
	});	
});
router.get('/wkload/clean', function(req, res){
	db.wkload.remove();
	res.status(200).end();
	console.log('Clean');	
});

router.post('/wkload', function(req, res, next){
	console.dir(req.body);
	db.wkload.insert(req.body, {w:1}, function(err, doc) {		
		if(err) return next(err);

		if(doc === 1) {
        	res.status(200).json(doc);
        }else{
        	res.status(401).json({name: 'UpdateError', message:'Update failed'});
        }			
	});	
});

module.exports = router;