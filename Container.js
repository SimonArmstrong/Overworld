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
var commonChestLidImage = document.createElement("img");
var rareChestLidImage = document.createElement("img");
var greatChestLidImage = document.createElement("img");
var uniqueChestLidImage = document.createElement("img");
var legendaryChestLidImage = document.createElement("img");

var shadowImage = document.createElement("img");
shadowImage.src = "chestShadow.png";

commonChestImage.src 	    = "commonChest.png";
rareChestImage.src 		    = "rareChest.png";
greatChestImage.src		    = "greatChest.png";
uniqueChestImage.src	    = "uniqueChest.png";
legendaryChestImage.src     = "legendaryChest.png";

commonChestLidImage.src 	= "commonChestLid.png";
rareChestLidImage.src 		= "rareChestLid.png";
greatChestLidImage.src 		= "greatChestLid.png";
uniqueChestLidImage.src		= "uniqueChestLid.png";
legendaryChestLidImage.src	= "legendaryChestLid.png";

var Container = function(contents, vec_p, r)
{
	this.position = vec_p;
	this.scale = new Vector2(32, 32);
	this.contents = [];
	for(var i = 0; i < contents.length; i++)
	{
		this.contents.push(contents[i]);
	}
	this.opener = player;
	this.type = "Chest";
	this.rarity = r;
	this.image;
	this.closedImage;
	this.collider = new Collider(this.position.x, this.position.y, 32, 32);
	if(this.rarity >= 150)
	{
		this.closedImage = commonChestLidImage;
		this.image = commonChestImage;
		this.inventory = new Inventory(2, 3, "COMMON CHEST");
	}
	else if(this.rarity >= 60)
	{
		this.closedImage = rareChestLidImage;
		this.image = commonChestImage;
		this.inventory = new Inventory(2, 3, "RARE CHEST");
	}
	else if(this.rarity >= 15)
	{
		this.closedImage = greatChestLidImage;
		this.image = commonChestImage;
		this.inventory = new Inventory(2, 2, "GREAT CHEST");
	}
	else if(this.rarity >= 2)
	{
		this.closedImage = uniqueChestLidImage;
		this.image = commonChestImage;
		this.inventory = new Inventory(2, 1, "UNIQUE CHEST");
	}
	else
	{
		this.closedImage = legendaryChestLidImage;
		this.image = commonChestImage;
		this.inventory = new Inventory(1, 1, "LEGENDARY CHEST");	
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
	this.contents = [];
	this.inventory.position = new Vector2(this.position.x - (this.inventory.scale.x / 2) + (this.scale.x / 2), this.position.y - this.inventory.scale.y + 8);
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
	context.drawImage(shadowImage, this.position.x, this.position.y);
	context.drawImage(this.image, this.position.x, this.position.y);
	
	if(this.inventory.open === false)
	{
		context.drawImage(this.closedImage, this.position.x, this.position.y);
	}
	
	if(this.inventory.open === true && Input.keys[Input.F])
	{
		for(var i = 0; i < this.contents.length; i++)
		{
			player.inventory.Add(this.inventory.items[i], "nearest");
			this.inventory.Remove(i);
			this.inventory.newItemSlots = [];
		}
		this.contents = [];
		this.inventory.open = false;
	}
}