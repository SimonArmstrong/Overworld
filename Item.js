//Item Object Constructor
var Item = function (name, itemImage, stackable)
{
	this.name = name;
	this.image = itemImage;
	this.amount = 1;
	this.equippable = false;
	this.useable = false;
	this.quest = false;
	this.stackable = stackable;
}

var Items = [];

Items.push(new Item("Wooden Sword", new ItemImage("woodensword.png"), false));
Items.push(new Item("Steel Dagger", new ItemImage("shortDagger.png"), false));
Items.push(new Item("Steel Sword", new ItemImage("SteelSword.png"), false));
Items.push(new Item("Health Potion", new ItemImage("HealthPotion.png"), true));
Items.push(new Item("Mana Potion", new ItemImage("ManaPotion.png"), true));
Items.push(new Item("Bronze Armour", new ItemImage("BronzeArmour.png"), false));
Items.push(new Item("Mithril Armour", new ItemImage("MithrilArmour.png"), false));

