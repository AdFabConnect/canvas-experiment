var React = require('react'),
	Scene = require('../graphics/Scene'),
	Window = require('../utils/Window');

var Application = React.createClass({
	getInitialState : function() {
		return {
			windowHeight : Window.getHeight(),
			windowWidth : Window.getWidth()
		}
	},
	handleResize : function() {
		Window.setSize();
		this.setState({
			windowHeight : Window.getHeight(),
			windowWidth : Window.getWidth()
		});
		this.scene.setHeight(this.state.windowHeight);
		this.scene.setWidth(this.state.windowWidth);
	},
	componentDidMount : function() {
		this.scene = Scene.init('canvas', this.state.windowHeight, this.state.windowWidth);
		this.scene.initRadar();
		window.addEventListener('resize', this.handleResize);
	},
	componentWillUnmount : function() {
		window.removeEventListener('resize', this.handleResize);
	},
	render : function() {
		return(
			<div>
				<div className="panel">
					<p>Controls</p>
					<label>Trails : <input type="checkbox" id="trails" defaultChecked /></label>
				</div>
				<canvas id="canvas"></canvas>
			</div>
		)
	}
});

module.exports = Application;