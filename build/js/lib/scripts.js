/**
 * 
 * Log.js debugging tool
 * Author: Justin Taylor
 *
 */
;(function( $, window, document, undefined ) {

	var Log = window.Log = {};

	/**
	 * @type {boolean}
	 * @public
	 */
	Log.enabled = true;
	
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
		if(!Log.enabled) {
			return false;
		}
		
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

})( jQuery, window, document );

/* EOF *//*

 JS Signals <http://millermedeiros.github.com/js-signals/>
 Released under the MIT license
 Author: Miller Medeiros
 Version: 0.7.1 - Build: 244 (2011/11/29 12:33 PM)
*/
(function(g){function f(a,b,d,h,c){this._listener=b;this._isOnce=d;this.context=h;this._signal=a;this._priority=c||0}function e(a,b){if(typeof a!=="function")throw Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}",b));}var c={VERSION:"0.7.1"};f.prototype={active:!0,params:null,execute:function(a){var b;this.active&&this._listener&&(a=this.params?this.params.concat(a):a,b=this._listener.apply(this.context,a),this._isOnce&&this.detach());return b},detach:function(){return this.isBound()?
this._signal.remove(this._listener):null},isBound:function(){return!!this._signal&&!!this._listener},getListener:function(){return this._listener},_destroy:function(){delete this._signal;delete this._listener;delete this.context},isOnce:function(){return this._isOnce},toString:function(){return"[SignalBinding isOnce:"+this._isOnce+", isBound:"+this.isBound()+", active:"+this.active+"]"}};c.Signal=function(){this._bindings=[];this._prevParams=null};c.Signal.prototype={memorize:!1,_shouldPropagate:!0,
active:!0,_registerListener:function(a,b,d,c){var e=this._indexOfListener(a);if(e!==-1){if(a=this._bindings[e],a.isOnce()!==b)throw Error("You cannot add"+(b?"":"Once")+"() then add"+(!b?"":"Once")+"() the same listener without removing the relationship first.");}else a=new f(this,a,b,d,c),this._addBinding(a);this.memorize&&this._prevParams&&a.execute(this._prevParams);return a},_addBinding:function(a){var b=this._bindings.length;do--b;while(this._bindings[b]&&a._priority<=this._bindings[b]._priority);
this._bindings.splice(b+1,0,a)},_indexOfListener:function(a){for(var b=this._bindings.length;b--;)if(this._bindings[b]._listener===a)return b;return-1},has:function(a){return this._indexOfListener(a)!==-1},add:function(a,b,d){e(a,"add");return this._registerListener(a,!1,b,d)},addOnce:function(a,b,d){e(a,"addOnce");return this._registerListener(a,!0,b,d)},remove:function(a){e(a,"remove");var b=this._indexOfListener(a);b!==-1&&(this._bindings[b]._destroy(),this._bindings.splice(b,1));return a},removeAll:function(){for(var a=
this._bindings.length;a--;)this._bindings[a]._destroy();this._bindings.length=0},getNumListeners:function(){return this._bindings.length},halt:function(){this._shouldPropagate=!1},dispatch:function(a){if(this.active){var b=Array.prototype.slice.call(arguments),d=this._bindings.length,c;if(this.memorize)this._prevParams=b;if(d){c=this._bindings.slice();this._shouldPropagate=!0;do d--;while(c[d]&&this._shouldPropagate&&c[d].execute(b)!==!1)}}},forget:function(){this._prevParams=null},dispose:function(){this.removeAll();
delete this._bindings;delete this._prevParams},toString:function(){return"[Signal active:"+this.active+" numListeners:"+this.getNumListeners()+"]"}};typeof define==="function"&&define.amd?define("signals",[],c):typeof module!=="undefined"&&module.exports?module.exports=c:g.signals=c})(this);