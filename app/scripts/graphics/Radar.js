var Circle = require('./Circle'),
	Window = require('../utils/Window');

requestAnimation = function(callback){
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ) { window.setTimeout(callback, 1000 / 60); }
}();

function Radar(ctx) {
	this.canvas           = document.getElementById('canvas');
	this.trail            = document.getElementById('trails');
	this.ctx              = ctx;
	this.ctx.lineCap      = 'round';
	this.circles          = [];
	this.circlesCount     = 200;
	this.speed            = 3;
	this.trailChecked     = this.trail.checked;
	this.createCircles();

	this.canvas.addEventListener('mousedown', this.createCircle.bind(this), false);
	this.trail.addEventListener('change', this.handleTrailChange.bind(this), false);
}

Radar.prototype.createCircles = function() {
	var count = this.circlesCount;
	while(count--) {
		var newX = Window.getWidth()/2,
			newY = Window.getHeight()/2+(count*2);

		this.circles.push(new Circle(this.ctx, newX, newY));
	}
}

Radar.prototype.createCircle = function(event) {
	var newX = event.pageX,
		newY = event.pageY;

	this.circles.push(new Circle(this.ctx, newX, newY));
}

Radar.prototype.handleTrailChange = function() {
	this.trailChecked = this.trail.checked;
}


Radar.prototype.loop = function() {
	requestAnimation(this.loop.bind(this));

	if(this.trailChecked) {
		this.ctx.fillStyle = 'rgba(0,0,0,.1)';
		this.ctx.fillRect(0, 0, Window.getWidth(), Window.getHeight());
	} else {
		this.ctx.clearRect(0, 0, Window.getWidth(), Window.getHeight());
	}

	var i = this.circles.length;
	while(i--) {
		var 
			circle           = this.circles[i],
			updateCount      = this.speed;

		while(updateCount--) {
			circle.update();
			circle.draw();
		}
	}
}

module.exports = Radar;