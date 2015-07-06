var Keyboard = function() 
{

	var self = this;
	
	//KeyUp and KeyDown Event Listeners for the game
	window.addEventListener('keydown', function(evt){ self.onKeyDown(evt); }, false);
	window.addEventListener('keyup', function(evt){ self.onKeyUp(evt); }, false);
	
	this.keys = [];
	
	this.KEY_SPACE  = 32;
	this.KEY_UP     = 38;
	this.KEY_DOWN   = 40;
	this.KEY_LEFT   = 37;
	this.KEY_RIGHT  = 39;
	
	this.KEY_W 		= 87;
	this.KEY_A 		= 65;
	this.KEY_S 		= 83;
	this.KEY_D 		= 68;
	this.KEY_SHIFT  = 16;
	
	this.I 			= 73;
	this.M 			= 77;	
	this.P 			= 80;	
	this.Q 			= 81;	
	this.F 			= 70;
	this.E 			= 69;	
	
	this.ONE   		= 49;	
	this.TWO   		= 50;	
	this.THREE 		= 51;	
	this.FOUR  		= 52;
	this.FIVE  		= 53;
	this.SIX   		= 54;
	this.SEVEN 		= 55;
	this.EIGHT 		= 56;
	this.NINE  		= 57;
	this.ZERO  		= 48;
};

Keyboard.prototype.onKeyDown = function(evt) 
{
	this.keys[evt.keyCode] = true;
}

Keyboard.prototype.onKeyUp = function(evt) 
{
	this.keys[evt.keyCode] = false;
}

Keyboard.prototype.KeyDown = function(keyCode) 
{
	return this.keys[keyCode];
}

var Input = new Keyboard();