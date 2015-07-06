var hilightImage = document.createElement("img");
hilightImage.src = "highlight.png";
var newItemImage = document.createElement("img");
newItemImage.src = "newItem.png";

var selectedItemIndex = "";
var selectedItem = "undefined";

var Inventory = function(rows, columns, title)
{
	this.title = title;
	this.dragging = false;
	this.rows = rows;
	this.columns = columns;
	this.space = this.rows * this.columns;
	this.slots = [];
	this.open = false;
	this.scale = new Vector2(this.columns * 34 + 20, this.rows * 34 + 40);
	this.position = new Vector2(0, 0);
	this.highlightedSlot;
	this.newItemSlots = [];
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
				this.newItemSlot = this.slots[i];
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
				if(this.slots[i].item === this.slots[i].item && this.slots[i].item.stackable)
				{
					//this.slots[i].amount += this.slots[i].amount;
				}
				this.slots[i].item = item;
				this.newItemSlots.push(this.slots[i]);
				//console.log("Added " + item.name + " to slot " + i)
				break;
			}
		}
	}
	//this.draw();
}

Inventory.prototype.Remove = function(index)
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

Inventory.prototype.draw = function()
{
	if(this.open)
	{	
		drawRect("#333", this.position, this.scale);
		context.fillStyle = "#fff";
		context.font = "12px Trebuchet MS";
		context.fillText(this.title, this.position.x + (this.scale.x / 2) - (context.measureText(this.title).width / 2), this.position.y + 20);
		
		var i = -1;
		for(var y = 0; y < this.rows; y++)
		{
			for(var x = 0; x < this.columns; x++)
			{
				i++;
				this.slots[i].position = new Vector2(this.position.x + 11 + (34 * x), this.position.y + 30 + (34 * y));
				this.slots[i].draw(1);
				if(this.slots[i].MouseOver())
				{
					this.highlightedSlot = this.slots[i];
					context.drawImage(hilightImage, this.slots[i].position.x, this.slots[i].position.y);

					if(this.slots[i].item != "undefined")
					{
						this.newItemSlots[i] = "undefined";
					}
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
				//context.fillText(i, this.position.x + 4 + (34 * x), this.position.y + 4 + (34 * y));
				//console.log("slot " + (x + y) + "'s position is: " + "X: " + this.slots[y].position.x + " Y: " + this.slots[y].position.y);
				if(this.slots[i] === this.newItemSlots[i] && this.newItemSlots.length > 0 && this.newItemSlots[i] != undefined)
				{
					context.drawImage(newItemImage, this.slots[i].position.x, this.slots[i].position.y);
				}
			}
		}
	}
}

Inventory.prototype.MouseOver = function()
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

Inventory.prototype.update = function()
{
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
	var ind = -1;
	for(var y = 0; y < this.rows; y++)
	{
		for(var x = 0; x < this.columns; x++)
		{
			ind++;
			if(this.slots[ind].item.stackable)
			{
				context.fillText(this.slots[ind].item.amount, this.position.x + 12 + (34 * x), this.position.y + 61 + (34 * y));
			}
		}
	}
	if(selectedItem != "undefined"){
		context.drawImage(selectedItem.image.icon, mousePosition.x, mousePosition.y);
	}
}