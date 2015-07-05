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

var Container = function(contents, vec_p)
{
	this.position = vec_p;
	this.contents = [];
	for(var i = 0; i < contents.length; i++)
	{
		this.contents.push(contents[i]);
	}
	this.type = "Chest";
	this.rarity = COMMON;
	this.image;
	this.collider = new Collider(this.position.x, this.position.y, 32, 32);
	switch(this.rarity)
	{
		case COMMON:
			this.image = commonChestImage;
		break;
		case RARE:
			this.image = rareChestImage;
		break;
		case GREAT:
			this.image = greatChestImage;
		break;
		case UNIQUE:
			this.image = uniqueChestImage;
		break;
		case LEGENDARY:
			this.image = legendaryChestImage;
		break;	
	}
}

Container.prototype.Open = function()
{
	for(var i = 0; i < this.contents.length; i++)
	{
		player.inventory.Add(this.contents[i], "nearest");
	}
	this.contents = [];
	return true;
}

Container.prototype.Add = function(item)
{
	for(var i = 0; i < this.contents.length; i++)
	{
		this.contents[i] = item;
	}
}

Container.prototype.MouseOver = function()
{
	if(mousePosition.x >= this.position.x &&
	   mousePosition.x <= this.position.x + 32 &&
	   mousePosition.y >= this.position.y &&
	   mousePosition.y <= this.position.y + 32)
	{
		return true;
	}
	else
	{
		return false;
	}
}

Container.prototype.draw = function()
{
	if(this.contents.length > 0)
	{
		context.drawImage(this.image, this.position.x, this.position.y);
	}
}