//Item Object Constructor
var Item = function (name, itemImage)
{
	this.name = name;
	this.image = itemImage;
	this.equippable = false;
	this.useable = false;
	this.quest = false;
	this.stackable = true;
}

var Items = [];

Items.push(new Item("Wooden Sword", new ItemImage("woodensword.png")));