var Inventory = function()
{
	this.space = 25;
	this.rows = Math.sqrt(this.space);
	this.columns = Math.sqrt(this.space);
	this.slots = [];
	this.open = false;
	for (var i = 0; i < this.space; i++)
	{
		this.slots.push(new Slot(new Vector2(0, 0)));
	}
}

Inventory.prototype.Add = function(item)
{
	for (var i = 0; i < this.space; i++)
	{
		if(this.slots[i].item === "undefined")
		{
			this.slots[i].item = item;
			console.log("Added " + item.name + " to slot " + i)
			break;
		}
	}
	
	this.draw();
}

Inventory.prototype.draw = function()
{
	//this.slots = [];
	var i = -1;
	for(var y = 0; y < this.rows; y++)
	{
		for(var x = 0; x < this.columns; x++)
		{
			i++;
			this.slots[i].position = new Vector2(10 + (34 * x), 10 + (34 * y));
			this.slots[i].draw(1);
			context.fillText(i, 10 + (34 * x), 10 + (34 * y));
			//console.log("slot " + (x + y) + "'s position is: " + "X: " + this.slots[y].position.x + " Y: " + this.slots[y].position.y);
		}
	}
}