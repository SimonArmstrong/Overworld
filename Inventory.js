var hilightImage = document.createElement("img");
hilightImage.src = "highlight.png";

var Inventory = function()
{
	this.rows = 5;
	this.columns = 5;
	this.space = this.rows * this.columns;
	this.slots = [];
	this.open = false;
	this.scale = new Vector2(this.rows * 34 + 20, this.columns * 34 + 40);
	this.position = new Vector2(0, 0);
	this.highlightedSlot;
	for (var i = 0; i < this.space; i++)
	{
		this.slots.push(new Slot(new Vector2(0, 0)));
	}
}

Inventory.prototype.Add = function(item, index)
{
	if(index != "nearest")
	{
		for (var i = 0; i < this.space; i++)
		{
			if(i === index)
			{
				this.slots[i].item = item;
				//console.log("Added " + item.name + " to slot " + i)
				break;
			}
		}
	}
	else
	{
		for (var i = 0; i < this.space; i++)
		{
			if(this.slots[i].item === "undefined")
			{
				this.slots[i].item = item;
				//console.log("Added " + item.name + " to slot " + i)
				break;
			}
		}
	}
	//this.draw();
}

Inventory.prototype.draw = function()
{
	
	drawRect("#333", this.position, this.scale);
	context.fillStyle = "#fff";
	context.font = "12px Trebuchet MS";
	var title = "I N V E N T O R Y";
	context.fillText(title, this.position.x + (this.scale.x / 2) - (context.measureText(title).width / 2), this.position.y + 20);
	
	var i = -1;
	for(var y = 0; y < this.rows; y++)
	{
		for(var x = 0; x < this.columns; x++)
		{
			i++;
			this.slots[i].position = new Vector2(this.position.x + 10 + (34 * x), this.position.y + 30 + (34 * y));
			this.slots[i].draw(1);
			if(this.slots[i].MouseOver())
			{
				this.highlightedSlot = this.slots[i];
				context.drawImage(hilightImage, this.slots[i].position.x, this.slots[i].position.y);
			}
			//context.fillText(i, this.position.x + 4 + (34 * x), this.position.y + 4 + (34 * y));
			//console.log("slot " + (x + y) + "'s position is: " + "X: " + this.slots[y].position.x + " Y: " + this.slots[y].position.y);
		}
	}
}