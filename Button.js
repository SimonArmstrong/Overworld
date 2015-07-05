{	// *** Mouse Inputs ***
var mousePosition = new Vector2(0, 0);
var money = 100;

function mouseMove(e)
{
	mousePosition = new Vector2(e.clientX, e.clientY);
}
canvas.addEventListener('mousemove', mouseMove);

var clicked = false;

function mouseDown(e)
{
	clicked = true;
}
canvas.addEventListener('mousedown', mouseDown);
}

var Slot = function()
{
	this.item = "undefined";
	this.image = document.createElement("img");
	this.image.src = "slot.png";
	this.size = new Vector2(32, 32);
}

Slot.prototype.MouseOver = function()
{
	if(mousePosition.x >= this.position.x &&
	   mousePosition.x <= this.position.x + this.size.x &&
	   mousePosition.y >= this.position.y &&
	   mousePosition.y <= this.position.y + this.size.y)
	{
		return true;
	}
	else
	{
		return false;
	}
}

Slot.prototype.draw = function(style, vec_p)	// Style = 1: Draw Image		Style = 0: Draw rectangle
{
	if(style === 0 || style === "undefined")
	{
		context.fillStyle = "#fff";
		context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
		//context.fillText(this.item.name, this.position.x, this.position.y + 22, this.size.x, this.size.y);
	}
	else
	{
		context.fillStyle = "#fff";
		context.drawImage(this.image, vec_p.x, vec_p.y);
	}
}