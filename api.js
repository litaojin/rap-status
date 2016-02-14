var router = require('express').Router();
var db = require('./db');

router.get('/status', function(req, res){
	db.status.find().toArray(function(err, docs){
    	if(err) return next(err);

      	res.status(200).json(docs);      
    }); 
});
router.get('/wkload', function(req, res){
	db.wkload.find().toArray(function(err, docs){
    	if(err) return next(err);

      	res.status(200).json(docs);      
    }); 
});
router.get('/wkload_desc', function(req, res){
	db.wkload_desc.find().toArray(function(err, docs){
    	if(err) return next(err);

      	res.status(200).json(docs);      
    }); 
});

module.exports = router;