var Inventory = function()
{
	this.space = 10;
	this.rows = 5;
	this.columns = 5;
	this.slots = [];
	this.open = false;
}

Inventory.prototype.draw = function()
{
	this.slots = [];
	for (var i = 0; i < this.space; i++)
	{
		this.slots.push(new Slot());
	}

	for(var x = 0; x < this.columns; x++)
	{
		for(var y = 0; y < this.rows; y++)
		{
			this.slots[y].draw(1, new Vector2(10 + (34 * x), 10 + (34 * y)));
		}
	}
}