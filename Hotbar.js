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
				this.slots[i].items.splice( this.slots[i].items.length - 1, 1);
				
				if(this.slots[i].items.length === 0)
				{
					this.slots[i].items.push("undefined");
				}
				//this.slots[i].items[i] = "undefined";
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
			this.slots[i].exclusiveType = "Potion";
			context.fillText(i + 1, this.position.x + 8 + (34 * i), this.position.y + 34);
			
			if(this.slots[i].MouseOver())
			{
				this.highlightedSlot = this.slots[i];
				context.drawImage(hilightImage, this.slots[i].position.x, this.slots[i].position.y);
				
				if(dblClicked && this.slots[i].items[this.slots[i].items.length - 1].useable)
				{
					this.slots[i].items[this.slots[i].items.length - 1].use();
					dblClicked = false;
					this.Remove(i);
				}
				else if(clicked && this.slots[i].items[this.slots[i].items.length - 1] != "undefined" && selectedItem === "undefined")
				{
					selectedItemIndex = i;
					selectedItem = this.highlightedSlot.items[this.slots[i].items.length - 1];
					//this.slots[i].amount -= this.slots[i].item.amount;
					this.Remove(i);
				}
				else if(!clicked && this.slots[i].items[this.slots[i].items.length - 1] === "undefined" && this.slots[i].exclusiveType === selectedItem.category)
				{
					//this.highlightedSlot.item.amount += this.selectedItem.amount;
					this.highlightedSlot.items[this.slots[i].items.length - 1] = selectedItem;
					
					selectedItem = "undefined";
				}
				else if(!clicked && this.slots[i].items[this.slots[i].items.length - 1].stackable === true && selectedItem.stackable === true && selectedItem === this.highlightedSlot.items[this.slots[i].items.length - 1])
				{
					this.slots[i].items.push(selectedItem);
					selectedItem = "undefined";
				}
				else if(!clicked && this.slots[i].items[this.slots[i].items.length - 1] != "undefined" && selectedItem != "undefined")
				{
					if(this.slots[selectedItemIndex].items[this.slots[i].items.length - 1] === "undefined")
					{
						this.slots[selectedItemIndex].items[this.slots[i].items.length - 1] = this.highlightedSlot.items[this.slots[i].items.length - 1];
					}
					this.highlightedSlot.items[this.slots[i].items.length - 1] = selectedItem;
					selectedItem = "undefined";
					//this.selectedItem = this.highlightedSlot.item;
				}
				if(this.slots[i].items.length === 0)
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
			if(this.slots[9].items[this.slots[9].items.length - 1] != "undefined")
			{
				this.slots[9].items[this.slots[9].items.length - 1].use();
				this.Remove(9);
			}
		}
		if(Input.keys[Input.ONE] === true)
		{
			if(this.slots[0].items[this.slots[0].items.length - 1] != "undefined")
			{
				this.slots[0].items[this.slots[0].items.length - 1].use();
				this.Remove(0);
			}
		}
		if(Input.keys[Input.TWO] === true)
		{
			if(this.slots[1].items[this.slots[1].items.length - 1] != "undefined")
			{
				this.slots[1].items[this.slots[1].items.length - 1].use();
				this.Remove(1);
			}
		}
		if(Input.keys[Input.THREE] === true)
		{
			if(this.slots[2].items[this.slots[2].items.length - 1] != "undefined")
			{
				this.slots[2].items[this.slots[2].items.length - 1].use();
				this.Remove(2);
			}
		}
		if(Input.keys[Input.FOUR] === true)
		{
			if(this.slots[3].items[this.slots[3].items.length - 1] != "undefined")
			{
				this.slots[3].items[this.slots[3].items.length - 1].use();
				this.Remove(3);
			}
		}
		if(Input.keys[Input.FIVE] === true)
		{
			if(this.slots[4].items[this.slots[4].items.length - 1] != "undefined")
			{
				this.slots[4].items[this.slots[4].items.length - 1].use();
				this.Remove(4);
			}
		}
		if(Input.keys[Input.SIX] === true)
		{
			if(this.slots[5].items[this.slots[5].items.length - 1] != "undefined")
			{
				this.slots[5].items[this.slots[5].items.length - 1].use();
				this.Remove(5);
			}
		}
		if(Input.keys[Input.SEVEN] === true)
		{
			if(this.slots[6].items[this.slots[6].items.length - 1] != "undefined")
			{
				this.slots[6].items[this.slots[6].items.length - 1].use();
				this.Remove(6);
			}
		}
		if(Input.keys[Input.EIGHT] === true)
		{
			if(this.slots[7].items[this.slots[7].items.length - 1] != "undefined")
			{
				this.slots[7].items[this.slots[7].items.length - 1].use();
				this.Remove(7);
			}
		}
		if(Input.keys[Input.NINE] === true)
		{
			if(this.slots[8].items[this.slots[8].items.length - 1] != "undefined")
			{
				this.slots[8].items[this.slots[8].items.length - 1].use();
				this.Remove(8);
			}
		}
	}
}