var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var pl = require('./parseLog');
var debug = require('./infrastructure/debug');

var ReadLines = function(fileName) {
	var input = fs.createReadStream(fileName);
	var remaining = '';
	var self = this;

	var logData = {
	    pipeline: '',
	    pipelineId: '',
	    fileName: '',
	    steps: [],
	    rollbackSteps: [],
	    start: '',
	    end: ''
	};

	input.on('data', function(data) {
		remaining += data;
    	var index = remaining.indexOf('\n');
		while (index > -1) {
			var line = remaining.substring(0, index);
			remaining = remaining.substring(index + 1);
			// line = line.replace('', '@@@');
			// debug.write(line);
			pl.processLine(line, logData);
			index = remaining.indexOf('\n');
    	}
	});

	input.on('end', function() {
		if(remaining.length > 0) {
			pl.processLine(remaining, logData);
		}

		self.emit('end', logData);
	});
}

// readLines.prototype.__proto__ = events.EventEmitter.prototype;
util.inherits(ReadLines, EventEmitter);
module.exports = ReadLines;

