goog.provide('namespace.project.App');
goog.require('namespace.project.Model');
goog.require('namespace.project.View');
goog.require('namespace.project.Controller');
goog.require('findzen.Log');


/**
 * Application
 * @constructor
 */
namespace.project.App = function() {
	
	/**
	 * @type {namespace.project.Model}
	 */
	this.model;
	
	/**
	 * @type {namespace.project.View}
	 */
	this.view;
	
	/**
	 * @type {namespace.project.Controller}
	 */
	this.controller;
	
	// initialize
	this.init();
	
}


/**
 * Init
 */
namespace.project.App.prototype.init = function() {
	
	Log.status( 'App init' );
	
	var	data 	= {},
		dom 	= {};

	this.model		= new namespace.project.Model( data );
	this.view		= new namespace.project.View( dom );
	this.controller	= new namespace.project.Controller( this.model, this.view );

	if( goog.DEBUG ) {
		window.model 		= this.model;
		window.controller 	= this.controller;
		window.view 		= this.view;
	}
	
}


/* EOF */