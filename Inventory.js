var Inventory = function()
{
	this.rows = 5;
	this.columns = 2;
	this.slots = [];
	this.open = false;
}

Inventory.prototype.draw = function()
{
	this.slots = [];
	for(var x = 0; x < this.rows; x++)
	{
		for(var y = 0; y < this.columns; y++)
		{
			this.slots.push(new Slot(new Vector2(2 + (34 * x), 2 + (34 * y))));
			this.slots[y].draw(1);
		}
		this.slots[x].draw(1);
	}
}