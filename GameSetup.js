var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");


//Common Pixel Positions
var TOP_LEFT 		= new Vector2(0,				 				0);
var TOP 			= new Vector2(canvas.width / 2, 				0);
var TOP_RIGHT		= new Vector2(0, 					canvas.height);
var LEFT 			= new Vector2(0, 				  canvas.height/2);
var CENTER 			= new Vector2(canvas.width / 2, canvas.height / 2);
var RIGHT 			= new Vector2(canvas.width, 	canvas.height / 2);
var BOTTOM_LEFT 	= new Vector2(canvas.width,					    0);
var BOTTOM 			= new Vector2(canvas.width, 	canvas.height / 2);
var BOTTOM_RIGHT 	= new Vector2(canvas.width, 		canvas.height);

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

// This function will return the time in seconds since the function 
// was last called
// You should only call this function once per frame
function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

		// Find the delta time (dt) - the change in time since the last drawFrame
		// We need to modify the delta time to something we can use.
		// We want 1 to represent 1 second, so if the delta is in milliseconds
		// we divide it by 1000 (or multiply by 0.001). This will make our 
		// animations appear at the right speed, though we may need to use
		// some large values to get objects movement and rotation correct
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
		// validate that the delta is within range
	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}

function drawRect(color, vec_p, vec_s)
{
	if(color === "undefined")
	{
		context.fillStyle = "#fff";
		context.fillRect(vec_p.x, vec_p.y, vec_s.x, vec_s.y);
	}
	else
	{
		context.fillStyle = color;
		context.fillRect(vec_p.x, vec_p.y, vec_s.x, vec_s.y);
	}
}

function States()
{
	(function() {
	  var onEachFrame;
	  if (window.requestAnimationFrame) {
		onEachFrame = function(cb) {
		  var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
		  _cb();
		};
	  } else if (window.mozRequestAnimationFrame) {
		onEachFrame = function(cb) {
		  var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
		  _cb();
		};
	  } else {
		onEachFrame = function(cb) {
		  setInterval(cb, 1000 / 60);
		}
	  }
	  
	  window.onEachFrame = onEachFrame;
	})();

	window.onEachFrame(run);
}