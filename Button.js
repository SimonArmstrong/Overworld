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

var Button = function(item, vec_p)
{
	this.item = item;
	this.image = document.createElement("img");
	this.image.src = "Button.png";
	this.size = new Vector2(64, 64);
	this.position = vec_p;
}

Button.prototype.MouseOver = function()
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

Button.prototype.draw = function()
{
	context.fillStyle = "#000";
	//context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
	context.drawImage(this.image, this.position.x, this.position.y);
	context.fillStyle = "#fff";
	context.drawImage(this.item.icon, this.position.x + 14, this.position.y + 14);
	//context.fillText(this.item.name, this.position.x, this.position.y + 22, this.size.x, this.size.y);
	//context.fillText("$" + this.item.cost, this.position.x + 12, this.position.y + 44, this.size.x, this.size.y);
}