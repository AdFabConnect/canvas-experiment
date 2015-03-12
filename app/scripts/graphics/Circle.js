var Window = require('../utils/Window');

var rand = function(rMi, rMa){return ~~((Math.random()*(rMa-rMi+1))+rMi);}

function Circle(ctx, newX, newY) {
	this.ctx         = ctx;
	this.initProperties(newX, newY);
}

Circle.prototype.initProperties = function(newX, newY) {
	var 
		distX = (Window.getWidth()/2) - newX,
		distY = (Window.getHeight()/2) - newY,
		dist  = Math.sqrt(distX * distX + distY * distY),
		angle = Math.atan2(distY, distX);

	this.x          = newX;
	this.y          = newY;
	this.lastX      = newX;
	this.lastY      = newY;
	this.hue        = 0;
	this.colorAngle = 0;
	this.angle      = angle - Math.PI/2;
	this.size       = rand(1,3)/2;
	this.centerX    = Window.getWidth()/2;
	this.centerY    = Window.getHeight()/2;
	this.radius     = dist;
	this.speed      = (rand(5,10)/1000)*(dist/750)+.015,
	this.alpha      = 1 - Math.abs(dist)/Window.getWidth();
}

Circle.prototype.draw = function() {
	this.ctx.strokeStyle = 'hsla('+ this.colorAngle +', 100%, 50%, 1)';
	this.ctx.lineWidth = this.size;
	this.ctx.beginPath();
	this.ctx.moveTo(this.lastX, this.lastY);
	this.ctx.lineTo(this.x, this.y);
	this.ctx.stroke();
}

Circle.prototype.update = function() {
	var 
		newX   = this.x,
		newY   = this.y,
		x1     = Window.getWidth()/2,
		y1     = Window.getHeight()/2,
		x2     = newX,
		y2     = newY,
		rise   = y1 - y2,
		run    = x1 - x2,
		slope  = -(rise/run),
		radian = Math.atan(slope),
		angleH = Math.floor(radian*(180/Math.PI));

	this.lastX = this.x;
	this.lastY = this.y;

	if(x2 < x1 && y2 < y1){angleH += 180;}		
	if(x2 < x1 && y2 > y1){angleH += 180;}		
	if(x2 > x1 && y2 > y1){angleH += 360;}		
	if(y2 < y1 && slope =='-Infinity'){angleH = 90;}		
	if(y2 > y1 && slope =='Infinity'){angleH = 270;}		
	if(x2 < x1 && slope =='0'){angleH = 180;}
	if(isNaN(angleH)){angleH = 0;}
	
	this.colorAngle = angleH;

	this.x = this.centerX + Math.sin(this.angle*-1) * this.radius;
	this.y = this.centerY + Math.cos(this.angle*-1) * this.radius;
	
	this.angle += this.speed;
}

module.exports = Circle;