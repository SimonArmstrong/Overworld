var hilightImage = document.createElement("img");
hilightImage.src = "highlight.png";
var newItemImage = document.createElement("img");
newItemImage.src = "newItem.png";

var selectedItemIndex = "";
var selectedItem = "undefined";

var Inventory = function(rows, columns, title)
{
	this.title = title;
	this.unlimitedStock = false;
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
				this.slots[i].items.push(item)
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
			if(this.slots[i].items[this.slots[i].items.length - 1] === "undefined")
			{
				if(this.slots[i].items[this.slots[i].items.length - 1] === this.slots[i].items[this.slots[i].items.length - 1] && this.slots[i].items[this.slots[i].items.length - 1].stackable)
				{
					//this.slots[i].amount += this.slots[i].amount;
				}
				this.slots[i].items[this.slots[i].items.length - 1] = item;
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
	if(!this.unlimitedStock)
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
}

Inventory.prototype.draw = function()
{
	if(this.open)
	{	
		drawRect("#333", this.position, this.scale);
		drawRect("#222", this.position, new Vector2(this.scale.x, 24));
		context.fillStyle = "#fff";
		context.font = "12px Trebuchet MS";
		context.fillText(this.title, this.position.x + (this.scale.x / 2) - (context.measureText(this.title).width / 2), this.position.y + 16);
		
		if(selectedItemIndex === "undefined")
		{
			for(var i = 0; i < this.slots.length; i++)
			{
				if(this.slots[i].item[this.slots[i].items.length - 1] === "undefined")
				{
					selectedItemIndex = i;
				}
			}
		}
		
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

					if(this.slots[i].items[this.slots[i].items.length - 1] != "undefined")
					{
						this.newItemSlots[i] = "undefined";
						drawRect("#333", new Vector2(this.position.x - 108, this.slots[i].position.y), new Vector2(100, 100));
						drawRect("#222", new Vector2(this.position.x - 108, this.slots[i].position.y), new Vector2(100, 44));
						context.drawImage(this.slots[i].items[this.slots[i].items.length - 1].image, this.position.x - 74, this.slots[i].position.y + 2);
						context.font = "12px Trebuchet MS";
						context.fillStyle = "#fff";
						context.fillText(this.slots[i].items[this.slots[i].items.length - 1].name, this.position.x - (context.measureText(
						this.slots[i].items[this.slots[i].items.length - 1].name).width / 2) - 57, this.slots[i].position.y + 42)
						context.fillStyle = "#888";
						context.fillText(this.slots[i].items[this.slots[i].items.length - 1].description, this.position.x - (context.measureText(
						this.slots[i].items[this.slots[i].items.length - 1].description).width / 2) - 57, this.slots[i].position.y + 56)
						context.fillText(this.slots[i].items[this.slots[i].items.length - 1].statDesc, this.position.x - (context.measureText(
						this.slots[i].items[this.slots[i].items.length - 1].statDesc).width / 2) - 57, this.slots[i].position.y + 88)
					}
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
						this.Remove(i);
					}
					else if(!clicked && this.slots[i].items[this.slots[i].items.length - 1] === "undefined")
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
			var ind = -1;
		for(var y = 0; y < this.rows; y++)
		{
			for(var x = 0; x < this.columns; x++)
			{
				ind++;
				if(this.slots[ind].items.length > 0)
				{
					if(this.slots[ind].items[this.slots[ind].items.length - 1] != "undefined")
					{
						if(this.slots[ind].items[this.slots[ind].items.length - 1].stackable === true)
						{
							context.fillText(this.slots[ind].items.length, this.position.x + 12 + (34 * x), this.position.y + 61 + (34 * y));
						}
					}
				}
			}
		}
	}
	if(selectedItem != "undefined"){
		context.drawImage(selectedItem.image, mousePosition.x, mousePosition.y);
	}
}