var COMMON = 60;
var RARE = 20;
var GREAT = 15;
var UNIQUE = 5;
var LEGENDARY = 1;

var commonChestImage = document.createElement("img");
var rareChestImage = document.createElement("img");
var greatChestImage = document.createElement("img");
var uniqueChestImage = document.createElement("img");
var legendaryChestImage = document.createElement("img");

commonChestImage.src = "commonChest.png";
rareChestImage.src = "rareChest.png";
greatChestImage.src = "greatChest.png";
uniqueChestImage.src = "uniqueChest.png";
legendaryChestImage.src = "legendaryChest.png";

var Container = function(contents, vec_p, r)
{
	this.position = vec_p;
	this.scale = new Vector2(32, 32);
	this.contents = [];
	for(var i = 0; i < contents.length; i++)
	{
		this.contents.push(contents[i]);
	}
	this.type = "Chest";
	this.rarity = r;
	this.image;
	this.collider = new Collider(this.position.x, this.position.y, 32, 32);
	switch(this.rarity)
	{
		case COMMON:
			this.image = commonChestImage;
			this.inventory = new Inventory(2, 2, "COMMON CHEST");
		break;
		case RARE:
			this.image = rareChestImage;
			this.inventory = new Inventory(2, 3, "RARE CHEST");
		break;
		case GREAT:
			this.image = greatChestImage;
			this.inventory = new Inventory(2, 4, "GREAT CHEST");
		break;
		case UNIQUE:
			this.image = uniqueChestImage;
			this.inventory = new Inventory(3, 4, "UNIQUE CHEST");
		break;
		case LEGENDARY:
			this.image = legendaryChestImage;
			this.inventory = new Inventory(5, 5, "LEGENDARY CHEST");
		break;	
	}
}

Container.prototype.Open = function()
{
	/*
	for(var i = 0; i < this.contents.length; i++)
	{
		//player.inventory.newItemSlots[i] = player.inventory.slots[i];
		player.inventory.Add(this.contents[i], "nearest");
	}
	this.contents = [];
	*/
	this.open = true;
	for(var i = 0; i < this.contents.length; i++)
	{
		this.inventory.Add(this.contents[i], "nearest");
	}
	this.inventory.position = this.position;
	this.inventory.open = true;
	return true;
}

Container.prototype.MouseOver = function()
{
	if(mousePosition.x >= this.position.x &&
	   mousePosition.x <= this.position.x + this.scale.x &&
	   mousePosition.y >= this.position.y &&
	   mousePosition.y <= this.position.y + this.scale.y)
	{
		return true;
	}
	else
	{
		return false;
	}
}
Container.prototype.Add = function(item)
{
	this.contents.push(item);
}

Container.prototype.draw = function()
{
	context.drawImage(this.image, this.position.x, this.position.y);
}