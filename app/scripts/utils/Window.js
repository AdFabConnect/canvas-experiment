var Window = {
	height : window.innerHeight,
	width : window.innerWidth,
	setSize : function(){
		this.height = window.innerHeight;
		this.width  = window.innerWidth;
	},
	getHeight : function(){
		return this.height;
	},
	getWidth : function() {
		return this.width;
	}
}

module.exports = Window;