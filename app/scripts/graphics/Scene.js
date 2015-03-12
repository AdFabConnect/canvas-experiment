var Radar = require('./Radar'),
	Window = require('../utils/Window');

function Scene() {}

Scene.prototype.init = function(node) {
	this.canvas        = document.getElementById(node);
	this.canvas.height = Window.getHeight();
	this.canvas.width  = Window.getWidth();
	this.ctx           = this.canvas.getContext('2d');
	return this;
}

Scene.prototype.initRadar = function() {
	var radar = new Radar(this.ctx);
	radar.loop();
}

Scene.prototype.setHeight = function(height) {
	this.canvas.height = height;
}

Scene.prototype.setWidth = function(width) {
	this.canvas.width  = width;
}

module.exports = new Scene();