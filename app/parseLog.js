var moment = require('moment');
var debug = require('./infrastructure/debug');

function Step(order) {
	this.order = order,
	this.command = {},
	this.messages = [],
	this.start = '',
	this.end = '',
    this.hasError = false,

	this.addLog = function (message) {
		this.messages.push(message);
	}
}

var currentStep;
var partialLine = '';

function processLine(line, data) {

// line = line.replace('""', 'quotes');

    if(partialLine !== '') {
        // debug.write('carry');
        line += partialLine;
    // debug.write(line);
    }
    var fields = escape(line).split( /"(.*?)";?/g );

    if(fields.length === 15 ) {
        var entry = {
            //time: moment(fields[1], 'DD/MM/YYYY, HH:mm:ss:SSS').format(),
            time: fields[1],
            level: fields[3],
            message: escape(fields[5]),
            details: fields[7],
            type: fields[9]
        }

        if(partialLine !== '') {
            debug.write(partialLine);
        }

        partialLine = '';
    }
    else {
    //     debug.write('partialLine');
    // debug.write(fields.length);
    // debug.write(line);
    // debug.write(escape(line));
    // debug.write(fields);
        partialLine = line;
        return;
    }

    if( /Begin execution pipeline.*/.test(entry.message)) {
        debug.write('Detected pipeline');
    	//data.pipelineId = entry.message.substring(26, 58);
    	data.pipelineId = entry.message.split( /([0-9A-F]{32})/ )[1];
    	data.pipeline = entry.message.split( /from type: (.*);$/ )[1];
    	data.start = entry.time;
    }
    else if( /Begin execution step.*/.test(entry.message)) {
    	debug.write('Detected new step');
    	currentStep = new Step();
    	currentStep.start = entry.time;
    	currentStep.order = entry.message.split( /with order: ([0-9]*)$/)[1];
    	// TODO get step number order
    }
    else if( /End step \d+ execution.*/.test(entry.message)) {
    	debug.write('End of step.')
    	if(currentStep !== undefined) {
    		currentStep.end = entry.time;
            if ( /End step \d+ execution with errors.*/.test(entry.message))
            {
                debug.write('Detected step with error.')
                currentStep.hasError = true;
            }
    		data.steps.push(currentStep);
    	};
    }
    else if( /Command: .+/.test(entry.message)) {
    	currentStep.command = entry.message.split( /Name: (.*)$/ )[1];
    }
    else if( entry.message === 'MESSAGE') {
    	debug.write('Skipping header');
    }
    else if( /Begin rollback.*/.test(entry.message)) {
    	debug.write('Detected rollback steps');
    	currentStep = new Step();
    	currentStep.start = entry.time;
    	currentStep.order = entry.message.split( /Order: ([0-9]*)$/)[1];
    }
    else if( /End rollback.*/.test(entry.message)) {
    	debug.write('End of rollback step.')
    	if(currentStep !== undefined) {
    		currentStep.end = entry.time;
    		data.rollbackSteps.push(currentStep);
    	};	
    }
    else if(currentStep !== undefined) {
    	currentStep.addLog(entry.message)
    };
}

// TODO is that needed?
function escape(str) {
    // debug.write(str) \\"
    return str
    // TODO loop and replace over ;""; matches until not found
      .replace(/(?:;\"\")/g, ';" "')
      // .replace(';"";', ';" ";')
      .replace(/[\"]{2}/g, '*')
      // .replace(/[\\]/g, '\\\\')
      // .replace(/[\/]/g, '\\/')
      // .replace(/[\b]/g, '\\b')
      // .replace(/[\f]/g, '\\f')
      // .replace(/[\n]/g, '\\n')
      .replace(/[\r]/g, '\\r')
      .replace(/[\t]/g, '\\t')
    ; };

module.exports.processLine = processLine;
