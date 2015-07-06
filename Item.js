var dialogueWindow = new Window("", CENTER, CENTER, false, [new Button("Y E S", 1), new Button("N O", 0)]);
//Item Object Constructor
var Items   = []; //Array of ALL items
var Weapons = []; //Array of weapon items
var Armour  = []; //Array of armour items
var Potions = []; //Array of potion items

var Potion = function(name, statName, val, duration)
{
	this.image = document.createElement("img");
	this.image.src = name + ".png";
	this.name = name;
	this.statToAlt = statName;
	this.value = val;
	if(duration != "undefined")
	{
		this.duration = duration;
	}
}

Potion.prototype.use = function()
{
	for(var i = 0; i < player.Stats.length; i++)
	{
		if(player.Stats[i].name === this.statToAlt)
		{
			player.Stats[i].amount += this.value;
			break;
		}
	}
}

/*
var Item = function (name, itemImage, stackable, eqp, use, q, amt, type)
{
	this.name = name;
	this.image = itemImage;
	this.amount = amt;
	this.itemOwner;
	this.equippable = eqp;
	this.useable = use;
	this.quest = q;
	this.stackable = stackable;
	this.type = type;
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

}
*/

Potions.push(new Potion("Health Potion", "Health", 50));
Potions.push(new Potion("Mana Potion", "Mana", 50));

/*
Weapons.push(new Item("Wooden Sword",   new ItemImage("woodensword.png"),   false, true, false, false, 1, "weapon"));
Weapons.push(new Item("Steel Dagger",   new ItemImage("shortDagger.png"),   false, true, false, false, 1, "weapon"));
Weapons.push(new Item("Steel Sword",    new ItemImage("SteelSword.png"),    false, true, false, false, 1, "weapon"));

Potions.push(new Item("Health Potion",  new ItemImage("HealthPotion.png"),  true, false, true,  false, 1, "potion"));
Potions.push(new Item("Mana Potion",    new ItemImage("ManaPotion.png"),    true, false, true,  false, 1, "potion"));

Armour.push(new Item("Bronze Armour",  new ItemImage("BronzeArmour.png"),  false, true, false, false,  1, "armour"));
Armour.push(new Item("Mithril Armour", new ItemImage("MithrilArmour.png"), false, true, false, false,  1, "armour"));
*/

Items = Items.concat(Potions);	//Concat all item types!!