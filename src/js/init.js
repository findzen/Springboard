/**
 * 
 * Init
 *
 */
;(function ( $, window, document, undefined ) {

	/**
	 * Change to false for production
	 * @const {boolean}
	 */
	var DEBUG = true;

	/**
	 *	Init
	 */
	$( document ).ready(function() {
		Log.enabled = DEBUG;
		Log.status( 'document.ready' );

		// initialize application
		var app = new namespace.project.App();
	
		if ( DEBUG ) {
			// Log output to DOM
			$( 'body' ).append(
				'<button onclick="toggleLog()" style="margin-top:20px; position:relative;">LOG</button>' +
				'<button onclick="Log.dump()" style="margin-top:20px; position:relative;">DUMP</button>' +
				'<pre id="output" style="color: black; height: 300px; overflow: auto; display:none; position: absolute; bottom: 0pt; right: 0pt; width:600px;"></pre>'
			);
		
			window.toggleLog = function() {
				$( '#output' ).toggle();
			};
		
			Log.enableOutputToDOM( $( '#output' ) );
		
			window.model 		= app.model;
			window.controller 	= app.controller;
			window.view 		= app.view;
		}
	});

})( jQuery, window, document );

/* EOF */