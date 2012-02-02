goog.provide('namespace.project.View');
goog.require('findzen.Log');


/**
 * View component of the Model View Controller implementation
 * @param {Object} dom References to DOM objects used in this view
 * @constructor
 */
namespace.project.View = function( dom ) {
	
	/**
	 * @type {Object}
	 */
	this.dom = dom;
	
	// initialize
	this.init();
	
}


/**
 * Init
 */
namespace.project.View.prototype.init = function() {
	
	Log.status('View init');
	
}

/* EOF */