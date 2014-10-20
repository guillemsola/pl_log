var express = require('express');
var path = require('path');
var fs = require('fs');
var Log = require('.././app/log');
var debug = require('.././app/infrastructure/debug');
var router = express.Router();

/* GET log . */
router.get('/', function(req, res) {
	var defaultFile = path.join(baseDir, 'samples', 'bpm input Sif with missing UHRA connector.csv');
	debug.write('Reading: ' + defaultFile);
	var readLog = new Log(defaultFile);

	readLog.on('end', function(data) { 
		res.send(data);
	}); 	
});

router.post('/upload', function (req, res, next) {
	console.log('Uploading file:' + req.files.file.path);

	var readLog = new Log(req.files.file.path);

	readLog.on('end', function(data) {
		fs.unlink(req.files.file.path, function (err) {
			if (err) throw err;
			debug.write('successfully deleted tmp file ' + req.files.file.path);
		});
		res.send(data);
	});
});

module.exports = router;