goog.provide('namespace.project.Controller');
goog.require('namespace.project.Model');
goog.require('namespace.project.View');
goog.require('findzen.Log');


/**
 * Controller component of the Model View Controller implementation
 * @param {namespace.project.Model} model The data Model for this Controller
 * @param {namespace.project.View} view The View for this Controller
 * @constructor
 */
namespace.project.Controller = function( model, view ) {
	/**
	 * @type {namespace.project.Model}
	 */
	this.model = model;
	
	/**
	 * @type {namespace.project.View}
	 */
	this.view = view;
	
	// initialize
	this.init();
}


/**
 * Init
 */
namespace.project.Controller.prototype.init = function() {
	Log.status('Controller init');
}


/* EOF */