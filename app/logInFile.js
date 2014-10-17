var fs = require('fs');
var Log = require('./log');
var debug = require('./infrastructure/debug');

debug.write('Start!');

//var readLog = new Log('./samples/bpm input Sif with missing UHRA connector.csv');
var readLog = new Log('./samples/sample long message exception.csv');
//readLog = new Log('log.csv');

//readLog = new Log('log.csv');

readLog.on('end', function(data) {
	fs.writeFile('outcome.json', JSON.stringify(data, null, 4), function(err) {
	    if(err) {
	      debug.write(err);
	    } else {
	      debug.write("JSON saved");
	    }
	}); 	
});
