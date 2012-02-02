// Change to false for production
window.DEBUG = true;

/**
 *	Init
 */
$(document).ready(function() {
	
	if(window.DEBUG) {
		// Log output to DOM
		$('body').append(
			'<button onclick="Log.dump()" style="margin-top:20px; position:relative">LOG DUMP</button>' +
			'<pre id="output" style="color:black"></pre>'
		);
		
		Log.enableOutputToDOM($('#output'));
	}
	
	Log.status('document.ready');
	
	// initialize application
	new namespace.project.App();
	
});