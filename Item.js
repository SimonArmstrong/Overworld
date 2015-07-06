var dialogueWindow = new Window("", CENTER, CENTER, false, [new Button("Y E S", 1), new Button("N O", 0)]);
//Item Object Constructor
var Item = function (name, itemImage, stackable, eqp, use, q)
{
	this.name = name;
	this.image = itemImage;
	this.amount = 1;
	this.equippable = eqp;
	this.useable = use;
	this.quest = q;
	this.stackable = stackable;
}

Item.prototype.drop = function()
{
	//draw the item on the floor at the player
	/*
	dialogueWindow.title = "D R O P ?";
	dialogueWindow.scale = new Vector2(100, 78);
	dialogueWindow.position = CENTER;
	dialogueWindow.show = true;
	if(dialogueWindow.option != "undefined")
	{
		return dialogueWindow.option;
	}
	*/
}

var Items   = []; //Array of ALL items
var Weapons = []; //Array of weapon items
var Armour  = []; //Array of armour items
var Potions = []; //Array of potion items

Weapons.push(new Item("Wooden Sword",   new ItemImage("woodensword.png"),   false, true, false, false));
Weapons.push(new Item("Steel Dagger",   new ItemImage("shortDagger.png"),   false, true, false, false));
Weapons.push(new Item("Steel Sword",    new ItemImage("SteelSword.png"),    false, true, false, false));

Potions.push(new Item("Health Potion",  new ItemImage("HealthPotion.png"),  true, false, true,  false));
Potions.push(new Item("Mana Potion",    new ItemImage("ManaPotion.png"),    true, false, true,  false));

Armour.push(new Item("Bronze Armour",  new ItemImage("BronzeArmour.png"),  false, true, false, false));
Armour.push(new Item("Mithril Armour", new ItemImage("MithrilArmour.png"), false, true, false, false));

Items = Items.concat(Weapons, Potions, Armour);	//Concat all item types!!