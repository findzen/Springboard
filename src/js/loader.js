goog.basePath = './';
goog.provide('namespace.project');
goog.require('namespace.project.App');
goog.require('findzen.Log');


/**
 *	Loader
 */
$(document).ready(function() {
	
	if(goog.DEBUG) {
		// Log output to DOM
		$('body').append(
			'<button onclick="Log.dump()" style="margin-top:20px; position:relative">LOG DUMP</button>' +
			'<pre id="output" style="color:black"></pre>'
		);
	}
	
	Log.enableOutputToDOM($('#output'));
	Log.status('document.ready');
	
	// initialize application
	new namespace.project.App();
	
});