var Hotbar = function()
{
	this.position = new Vector2(canvas.width / 2, 0);
	this.scale = new Vector2(128, 128 + 32);
	this.open = true;
	
	this.space = 10;
	this.slots = [];
	this.keys =  []
	for(var i = 0; i < this.space; i++)
	{
		this.slots.push(new Slot(new Vector2(this.position.x + 2 + (34 * i), this.position.y + 8)));
	}
	this.highlightedSlot;
	this.dragging = false;
}

Hotbar.prototype.MouseOver = function()
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

Hotbar.prototype.Remove = function(index)
{
	if(index === "all")
	{
		for (var i = 0; i < this.space; i++)
		{
			this.slots.splice(0, i);
			break;
		}
	}
	else
	{
		for (var i = 0; i < this.space; i++)
		{
			if(i === index)
			{
				this.slots[i].item = "undefined";
				//console.log("Added " + item.name + " to slot " + i)
				break;
			}
		}
	}
	//this.draw();
}

Hotbar.prototype.draw = function()
{
	if(this.open)
	{
		for(var i = 0; i < this.slots.length; i++)
		{
			this.slots[i].draw();
			context.fillText(i + 1, this.position.x + 8 + (34 * i), this.position.y + 34);
			
			if(this.slots[i].MouseOver())
			{
				this.highlightedSlot = this.slots[i];
				context.drawImage(hilightImage, this.slots[i].position.x, this.slots[i].position.y);
				
				if(dblClicked && this.slots[i].item.useable)
				{
					if(this.slots[i].item.amount >= 1)
					{
						this.slots[i].item.use();
						dblClicked = false;
						this.slots[i].item.amount --;
					}
				}
				else if(clicked && this.slots[i].item != "undefined" && selectedItem === "undefined")
				{
					selectedItemIndex = i;
					selectedItem = this.highlightedSlot.item;
					//this.slots[i].amount -= this.slots[i].item.amount;
					this.Remove(i);
				}
				else if(!clicked && this.slots[i].item === "undefined")
				{
					//this.highlightedSlot.item.amount += this.selectedItem.amount;
					this.highlightedSlot.item = selectedItem;
					
					selectedItem = "undefined";
				}
				else if(!clicked && this.slots[i].item.stackable === true && selectedItem.stackable === true && selectedItem === this.highlightedSlot.item)
				{
					this.slots[i].item.amount += selectedItem.amount;
					selectedItem = "undefined";
				}
				else if(!clicked && this.slots[i].item != "undefined" && selectedItem != "undefined")
				{
					this.slots[selectedItemIndex].item = this.highlightedSlot.item;
					this.highlightedSlot.item = selectedItem;
					selectedItem = "undefined";
					//this.selectedItem = this.highlightedSlot.item;
				}
				if(this.slots[i].item.amount === 0)
				{
					dblClicked = false;
					this.Remove(i);
				}
			}
			else if(!clicked && (mousePosition.x <= this.position.x ||
				mousePosition.x >= this.position.x + this.scale.x ||
				mousePosition.y <= this.position.y ||
				mousePosition.y >= this.position.y + this.scale.y))
			{
				//if(selectedItem != "undefined"){selectedItem.drop();}
				//selectedItem = "undefined";
			}
		}
		if(Input.keys[Input.ZERO] === true)
		{
			if(this.slots[9].item != "undefined")
				this.slots[9].item.use();
		}
		if(Input.keys[Input.ONE] === true)
		{
			if(this.slots[0].item != "undefined")
				this.slots[0].item.use();
		}
		if(Input.keys[Input.TWO] === true)
		{
			if(this.slots[1].item != "undefined")
				this.slots[1].item.use();
		}
		if(Input.keys[Input.THREE] === true)
		{
			if(this.slots[2].item != "undefined")
				this.slots[2].item.use();
		}
		if(Input.keys[Input.FOUR] === true)
		{
			if(this.slots[3].item != "undefined")
				this.slots[3].item.use();
		}
		if(Input.keys[Input.FIVE] === true)
		{
			if(this.slots[4].item != "undefined")
				this.slots[4].item.use();
		}
		if(Input.keys[Input.SIX] === true)
		{
			if(this.slots[5].item != "undefined")
				this.slots[5].item.use();
		}
		if(Input.keys[Input.SEVEN] === true)
		{
			if(this.slots[6].item != "undefined")
				this.slots[6].item.use();
		}
		if(Input.keys[Input.EIGHT] === true)
		{
			if(this.slots[7].item != "undefined")
				this.slots[7].item.use();
		}
		if(Input.keys[Input.NINE] === true)
		{
			if(this.slots[8].item != "undefined")
				this.slots[8].item.use();
		}
		
	}
}