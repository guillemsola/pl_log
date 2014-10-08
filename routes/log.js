var express = require('express');
var Log = require('.././app/log');
var router = express.Router();

/* GET log . */
router.get('/', function(req, res) {
	var readLog = new Log('log.csv');

	readLog.on('end', function(data) { 
		res.send(data);
	}); 	
});

module.exports = router;
