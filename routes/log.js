var express = require('express');
var Log = require('.././app/log');
var router = express.Router();

/* GET log . */
router.get('/', function(req, res) {
	// var readLog = new Log('./samples/bpm output SRF with GV ok.csv');
	var readLog = new Log('./samples/spm input Sif rejected in SPM.csv');

	readLog.on('end', function(data) { 
		res.send(data);
	}); 	
});

router.post('/upload', function (req, res, next) {
	console.log('Post done:');
    console.log(req.files.file.path);

var readLog = new Log(req.files.file.path);

	readLog.on('end', function(data) { 
		res.send(data);
	});
});

module.exports = router;