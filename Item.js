//Item Object Constructor
var Item = function (name, cost, damage, defense, type, icon)
{
	this.name = name; 
	this.cost = cost;
	this.damage = damage;
	this.defense = defense;
	this.bought = false;
	this.icon = document.createElement("img");
	this.icon.src = icon;
	this.type = type;
} 

//Database of Items
var items = [];

items.push(new Item ("Cloth Rag", 15, 0, 3, "Armour", "placeHolderArmour.png"));
items.push(new Item ("Leather Coat", 22, 0, 6, "Armour", "placeHolderArmour.png"));
items.push(new Item ("Chainmail", 35, 0, 13, "Armour", "placeHolderArmour.png"));
items.push(new Item ("Iron Armour", 50, 0, 25, "Armour", "placeHolderArmour.png"));

items.push(new Item("Cloth Pants", 12, 0, 2, "Armour", "placeHolderArmour.png"));
items.push(new Item("Leather Pants", 20, 0, 4, "Armour", "placeHolderArmour.png"));
items.push(new Item("Chain Pants", 32, 0, 11, "Armour", "placeHolderArmour.png"));
items.push(new Item("Iron Leggings", 45, 0, 20, "Armour", "placeHolderArmour.png"));

items.push(new Item("Cloth Hat", 10, 0, 1, "Armour", "placeHolderArmour.png"));
items.push(new Item("Leather Hat", 18, 0, 3, "Armour", "placeHolderArmour.png"));
items.push(new Item("Chain Helmet", 30, 0, 10, "Armour", "placeHolderArmour.png"));
items.push(new Item("Iron Helmet", 43, 0, 15, "Armour", "placeHolderArmour.png"));

items.push(new Item("Footwraps", 5, 0, 1, "Armour", "placeHolderArmour.png"));
items.push(new Item("Leather Boots", 10, 0, 2, "Armour", "placeHolderArmour.png"));
items.push(new Item("Chain Boots", 20, 0, 7, "Armour", "placeHolderArmour.png"));
items.push(new Item("Iron Boots", 35, 0, 13, "Armour", "placeHolderArmour.png"));

items.push(new Item("Wooden Sword", 20, 5, 0, "Weapon", "woodensword.png"));
items.push(new Item ("Stone Sword", 35, 10, 0, "Weapon", "stonesword.png"));
items.push(new Item("Bronze Sword", 50, 16, 0, "Weapon", "bronzesword.png"));
items.push(new Item ("Steel Sword", 100, 25, 0, "Weapon", "placeHolderWeapon.png"));
items.push(new Item("Developer Sword", 0, 2000, 0, "Weapon", "developersword.png"));
