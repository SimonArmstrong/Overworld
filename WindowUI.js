var Button = function(title, val)
{
	this.title = title;
	this.scale = new Vector2(0, 0);
	this.position = new Vector2(0, 0);
	this.show = false;
	this.value = val;
}

Button.prototype.MouseOver = function()
{
	if(mousePosition.x >= this.position.x &&
	   mousePosition.x <= this.position.x + this.scale.x &&
	   mousePosition.y >= this.position.y &&
	   mousePosition.y <= this.position.y + this.scale.y)
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
	if(this.MouseOver())
	{
		drawRect("#555", this.position, this.scale);
		context.fillStyle = "#fff";
		context.font = "12px Trebuchet MS";
		context.fillText(this.title, this.position.x + (this.scale.x / 2) - (context.measureText(this.title).width / 2), this.position.y + (this.scale.y / 2));
	}
	else
	{
		drawRect("#444", this.position, this.scale);
		context.fillStyle = "#fff";
		context.font = "12px Trebuchet MS";
		context.fillText(this.title, this.position.x + (this.scale.x / 2) - (context.measureText(this.title).width / 2), this.position.y + (this.scale.y / 2));
	}
}

var Window = function(title, vec_s, vec_p, show, buttons)
{
	this.scale = vec_s;
	this.position = vec_p;
	this.title = title;
	
	this.show = show;
	this.dragging = false;
	this.buttons = buttons;
	this.option = "undefined";
}

Window.prototype.MouseOver = function()
{
	if(mousePosition.x >= this.position.x &&
	   mousePosition.x <= this.position.x + this.scale.x &&
	   mousePosition.y >= this.position.y &&
	   mousePosition.y <= this.position.y + 24)
	{
		return true;
	}
	else
	{
		return false;
	}
}

Window.prototype.draw = function()
{
	if(this.show)
	{
		drawRect("#333", this.position, this.scale);
		context.fillStyle = "#fff";
		context.font = "12px Trebuchet MS";
		context.fillText(this.title, this.position.x + (this.scale.x / 2) - (context.measureText(this.title).width / 2), this.position.y + 20);
		for(var i = 0; i < this.buttons.length; i++)
		{
			this.buttons[i].position = new Vector2(this.position.x + 4, this.position.y + 32 + ((this.buttons[i].scale.y + 2) * i));
			this.buttons[i].scale = new Vector2(this.scale.x - 8, 20);
			this.buttons[i].draw();
			if(this.buttons[i].MouseOver() && clicked)
			{
				this.option = this.buttons[i].value;
			}
		}
	}
}

Window.prototype.update = function()
{
	if(this.MouseOver() && clicked === true){
		this.dragging = true;
	}
	else if(!clicked)
	{
		this.dragging = false;
	}
	
	if(this.dragging)
	{
		this.position = new Vector2(mousePosition.x - (this.scale.x / 2), mousePosition.y - 16);
	}
	if(this.option != "undefined")
	{
		this.show = false;
	}
}

