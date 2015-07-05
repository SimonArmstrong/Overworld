var Inventory = function()
{
	this.space = 10;
	this.slots = [];
}

Inventory.prototype.draw = function()
{
	for(var x = 0; x <= this.space / 2; x++)
	{
		for(var y = 0; y <= this.space / 2; y++)
		{
			//draw the slots
			if(this.slots[x][y].item != "undefined")
			{
				//draw ItemImage.normal in that slot
			}
		}
	}
}