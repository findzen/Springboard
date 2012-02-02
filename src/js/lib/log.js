/**
 * Log.js debugging tool
 * 
 */
var Log = window.Log = {};

/**
 * window shortcut
 * @param {*} msg
 */
window.log = function(msg) {
	Log._output(arguments, Log._levels.LOG);
};

/**
 * @param {*} msg
 * @public
 */
Log.info = function(msg) {
	Log._output(arguments, Log._levels.INFO);
};

/**
 * @param {*} msg
 * @public
 */
Log.status = function(msg) {
	Log._output(arguments, Log._levels.STATUS);
};

/**
 * @param {*} msg
 * @public
 */
Log.debug = function(msg) {
	Log._output(arguments, Log._levels.DEBUG);
};

/**
 * @param {*} msg
 * @public
 */
Log.warn = function(msg) {
	Log._output(arguments, Log._levels.WARNING);
};

/**
 * @param {*} msg
 * @public
 */
Log.error = function(msg) {
	Log._output(arguments, Log._levels.ERROR);
};

/**
 * @public
 */
Log.dump = function() {
	var consoleRef = window.top.consoleRef;

	consoleRef = window.open('','logdump');
	consoleRef.document.writeln('<html><head><title>Log</title></head><body bgcolor=white onLoad="self.focus()">' + '<pre>' + Log._getHistory() + '</pre></body></html>');
	consoleRef.document.close();
};

/**
 * @public
 */
Log.enableLogFile = function() {
	Log._toFile = true;
	Log.info( Log._getInfo() );
};

/**
 * @param {Object} dom
 * @public
 */
Log.enableOutputToDOM = function(dom) {
	Log._dom = dom ? $(dom) : $('body');
};

/**
 * @public
 */
Log.dumpToFile = function() {
	Log._logToFile( Log._getHistory() );
};

/**
 * @type {Array}
 * @private
 */
Log._history = [];

/**
 * @type {boolean}
 * @private
 */
Log._toFile = false;

/**
 * @type {Object.<string, string>}
 • @const
 * @private
 */
Log._levels = {
	LOG:		'LOG',
	INFO: 		'INFO',
	STATUS:		'STATUS',
	DEBUG: 		'DEBUG',
	WARNING:	'WARNING',
	ERROR: 		'ERROR'
};

/**
 * @param {*} args
 * @param {string=} level 
 * @private
 */
Log._output = function(args, level) {
	var msg 	= args ? level + '\t:: ' + Array.prototype.join.call(args, ' ') : level,
		levels 	= Log._levels,
		method;

	Log._history.push(msg);

	switch(level) {
		case levels.STATUS:
		case levels.INFO:
			method = 'info';
			break;

		case levels.ERROR:
			method = 'error';
			break;

		case levels.WARNING:
			method = 'warn';
			break;

		case levels.DEBUG:
			method = 'debug';
			break;

		default:
			method = 'log';
	}

	Log._delegate(method, args);

	if(Log._toFile)
		Log._logToFile(msg);
	
	if(Log._dom)
		Log._logToDOM(msg);
};

/**
 * @param {string} method
 * @param {*} args
 * @private
 */
Log._delegate = function(method, args) {
	if(typeof window.console != 'undefined') {
		// IE 6-8 doesn't support hasOwnProperty on console so we have to "borrow" the method from Object's prototype
		var hasOwnProperty = Object.prototype.hasOwnProperty, 
			func;

		// try to apply chosen method if it exists, fall back to log if necessary
		if( hasOwnProperty.call(window.console, method) ) {
			func = window.console[method];
		} else if( hasOwnProperty.call(window.console, 'log') ) {
			func = window.console.log;
		} else {
			return;
		}

		if( func['apply'] ) {
			func.apply(null, args);
		} else {
			func(Array.prototype.join.call(args, ' '));
		}
	}
};

/**
 * @param {string} msg
 * @private
 */
Log._logToFile = function(msg) {
	$.ajax({
	  url: 'Log.php?msg=' + encodeURIComponent(msg)
	});
};

/**
 * @param {string} msg
 * @private
 */
Log._logToDOM = function(msg) {
	Log._dom.append(msg + '<br>');
};

/**
 * @private
 */
Log._getInfo = function() {
	var info = '-------------\n',
		navigator = window.navigator;

	for(var i in navigator) {
	    if(typeof navigator[i] == 'string' || typeof navigator[i] == 'boolean') {
	        info += i + ': ' + navigator[i] + '\n';
	    }
	}

	return info;
};

/**
 * @private
 */
Log._getHistory = function() {
	var output 	= Log._getInfo(),
		history	= Log._history,
		i;

	// todo: array join would be faster here...
	for(i in history) 
		output += history[i] + '\n';
	
	return output;
};

/* EOF */