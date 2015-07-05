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
		clicked = !clicked;
	}
	canvas.addEventListener('mousedown', mouseDown);
	canvas.addEventListener('mouseup', mouseDown);
}

var slotImage = document.createElement("img");
slotImage.src = "slot.png";

var Slot = function(vec_p)
{
	this.item = "undefined";
	this.image = slotImage;
	this.size = new Vector2(32, 32);
	this.position = vec_p;
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

Slot.prototype.draw = function(style)	// Style = 1: Draw Image		Style = 0: Draw rectangle
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
		context.drawImage(this.image, this.position.x, this.position.y);
		if(this.item != "undefined")
			context.drawImage(this.item.image.icon, this.position.x, this.position.y);
	}
}