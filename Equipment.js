var Equipment = function()
{
	this.position = new Vector2(100, 100);
	this.scale = new Vector2(128, 128 + 32);
	this.title = "E Q U I P M E N T";
	this.open = false;
	
	this.helmet;
	this.chest;
	this.lefthand;
	this.righthand;
	this.boots;
	
	this.helmetSlot = new Slot(new Vector2(this.position.x + 48, this.position.y + 32));
	this.chestSlot = new Slot(new Vector2(this.position.x + 48, this.position.y + 74));
	this.leftHandSlot = new Slot(new Vector2(this.position.x + 8, this.position.y + 74));
	this.rightHandSlot = new Slot(new Vector2(this.position.x + 88, this.position.y + 74));
	this.shoeSlot = new Slot(new Vector2(this.position.x + 48, this.position.y + 114));
	
	this.slots = [];
	this.slots.push(this.helmetSlot);
	this.slots.push(this.chestSlot);
	this.slots.push(this.leftHandSlot);
	this.slots.push(this.rightHandSlot);
	this.slots.push(this.shoeSlot);
	
	this.highlightedSlot;
	this.dragging = false;
}

Equipment.prototype.get = function()
{
	this.helmet = 	 this.helmetSlot.item;
	this.chest = 	 this.chestSlot.item;
	this.lefthand =  this.leftHandSlot.item;
	this.righthand = this.rightHandSlot.item;
	this.boots = 	 this.shoeSlot.item;
}


Equipment.prototype.MouseOver = function()
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

Equipment.prototype.Remove = function(index)
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
		for (var i = 0; i < this.slots.length; i++)
		{
			if(i === index)
			{
				this.slots[i].items.splice(this.slots[i].items.length - 1, 1);
				if(this.slots[i].items.length === 0)
				{
					this.slots[i].items.push("undefined");
				}
				break;
			}
		}
	}
}

Equipment.prototype.draw = function()
{
	this.helmetSlot.position      = new Vector2(this.position.x + 48, this.position.y + 32);
	this.chestSlot.position       = new Vector2(this.position.x + 48, this.position.y + 74);
	this.leftHandSlot.position    = new Vector2(this.position.x + 8, this.position.y + 74) ;
	this.rightHandSlot.position   = new Vector2(this.position.x + 88, this.position.y + 74);
	this.shoeSlot.position 		  = new Vector2(this.position.x + 48, this.position.y + 114);
	if(this.open)
	{
		drawRect("#333", this.position, this.scale);
		context.fillStyle = "#fff";
		context.font = "12px Trebuchet MS";
		context.fillText(this.title, this.position.x + (this.scale.x / 2) - (context.measureText(this.title).width / 2), this.position.y + 20);
		for(var i = 0; i < this.slots.length; i++)
		{
			this.slots[i].draw();
			
			if(this.slots[i].MouseOver())
			{
				this.highlightedSlot = this.slots[i];
				context.drawImage(hilightImage, this.slots[i].position.x, this.slots[i].position.y);
				
				if(clicked && this.slots[i].items[this.slots[i].items.length - 1] != "undefined" && selectedItem === "undefined")
				{
					selectedItemIndex = i;
					selectedItem = this.highlightedSlot.items[this.slots[i].items.length - 1];
					this.Remove(i);
				}
				else if(!clicked && this.slots[i].items[this.slots[i].items.length - 1] === "undefined" && this.slots[i].exclusiveType === selectedItem.category)
				{
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
				}
				if(this.slots[i].items.length === 0)
				{
					dblClicked = false;
					this.Remove(i);
				}
			}
		}
	}
}

Equipment.prototype.update = function()
{
	this.helmetSlot.exclusiveType = "Helmet";
	this.chestSlot.exclusiveType = "Chest";
	this.leftHandSlot.exclusiveType = "Shield";
	this.rightHandSlot.exclusiveType = "Weapon";
	this.shoeSlot.exclusiveType = "Boots";
	
	if(this.open)
	{
		if(this.MouseOver() && mouseDOWN === true && selectedItem === "undefined"){
			this.dragging = true;
		}
		else if(mouseUP === true)
		{
			this.dragging = false;
		}
		
		if(this.dragging)
		{
			this.position = new Vector2(mousePosition.x - (this.scale.x / 2), mousePosition.y - 16);
		}
		
		if(this.MouseOver() && dblClicked === true)
		{
			this.open = false;
			dblClicked = false;
		}
	}
	if(selectedItem != "undefined"){
		context.drawImage(selectedItem.image, mousePosition.x, mousePosition.y);
	}
}