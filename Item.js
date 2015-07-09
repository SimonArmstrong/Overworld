var dialogueWindow = new Window("", CENTER, CENTER, false, [new Button("Y E S", 1), new Button("N O", 0)]);
//Item Object Constructor
var Items   = []; //Array of ALL items
var Weapons = []; //Array of weapon items
var Armours  = []; //Array of armour items
var Potions = []; //Array of potion items
var Recipes = []; //Array of recipe items

var Potion = function(name, statName, val, cat, rarity)
{
	this.stackable = true;
	this.useable = true;
	this.category = cat;
	this.equippable = false;
	this.rarity = rarity;
	this.image = document.createElement("img");
	this.image.src = name + ".png";
	this.rImage = document.createElement("img");
	this.rImage.src = rarity + "_rare.png";
	this.name = name;
	this.statToAlt = statName;
	this.value = val;
	
	this.description = "Food / Potion";
	this.statDesc = statName + ": " + val;
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

var Weapon = function(name, atk, speed, job, cat, rarity)
{
	this.category = cat;
	this.rarity = rarity;
	this.job = job;
	this.attack = (atk * rarity);
	this.image = document.createElement("img");
	this.image.src = name + ".png";
	this.rImage = document.createElement("img");
	this.rImage.src = rarity + "_rare.png";
	this.name = name;
	
	this.description = this.category;
	this.statDesc = "Attack: " + atk;
}

Weapon.prototype.use = function()
{
	console.log("This item has no use!");
}

var Armour = function(name, def, speed, job, cat, rarity)
{
	this.category = cat;
	this.rarity = rarity;
	this.job = job;
	this.defense = (def * rarity);
	this.image = document.createElement("img");
	this.image.src = name + ".png";
	this.rImage = document.createElement("img");
	this.rImage.src = rarity + "_rare.png";
	this.name = name;
	
	this.health = new Stat("Health", 100, 0);
	this.mana = new Stat("Mana", 100, 0);
	this.speed = new Stat("Speed", 10, 0);
	
	this.description = this.category
	this.statDesc = "Defence: " + def;
}

Armour.prototype.use = function()
{
	console.log("This item has no use!");
}

var Recipe = function(name, itemA, itemB, rarity)
{
	this.itemB;
	this.itemA;
	this.result;
	for(var i = 0; i < Items.length; i++)
	{
		if(Items[i].name === itemA)
		{
			this.itemA = Items[i];
		}
	}
	for(var i = 0; i < Items.length; i++)
	{
		if(Items[i].name === itemB)
		{
			this.itemB = Items[i];
		}
	}
	for(var i = 0; i < Items.length; i++)
	{
		if(Items[i].name === name)
		{
			this.result = Items[i];
		}
	}
	this.name = name + " Recipe";
	this.image = document.createElement("img");
	this.image.src = "Recipe.png";
	this.rImage = document.createElement("img");
	this.rImage.src = rarity + "_rare.png";
	this.description = "Crafting Recipe";
	this.statDesc = "";
}

//Potion
Potions.push(new Potion("Health Potion", "Health", 80, "Potion", 1));
Potions.push(new Potion("Mana Potion", "Mana", 80, "Potion", 1));
Potions.push(new Potion("Health Cauldron", "Health", 100000, "Potion", 3));
Potions.push(new Potion("EXP potion", "Exp", 50, "Potion", 4));
Potions.push(new Potion("Fried Egg", "Health", 30, "Potion", 0));
Potions.push(new Potion("Hamburger", "Health", 40, "Potion", 0));
Potions.push(new Potion("Cheese Toastie", "Health", 50, "Potion", 0));

Weapons.push(new Weapon("Wooden Sword", 2, 1, "warrior", "Weapon", 1));
Weapons.push(new Weapon("Steel Sword", 4, 1, "warrior", "Weapon", 2));
Weapons.push(new Weapon("Iron Shield", 1, 1, "warrior", "Shield", 2));
Weapons.push(new Weapon("Defender", 1, 1, "warrior", "Shield", 3));
Weapons.push(new Weapon("Twig", 1, 1, "warrior", "Weapon", 3));
Weapons.push(new Weapon("Mithril Sword", 6, 1, "warrior", "Weapon", 3));
Weapons.push(new Weapon("Mithril Mace", 1, 1, "warrior", "Weapon", 4));;
Weapons.push(new Weapon("Arcane Rod", 1, 1, "wizard", "Weapon", 4));
Weapons.push(new Weapon("Twilight Shield", 4, 1, "warrior", "Shield", 4));
Weapons.push(new Weapon("Dark Sword", 9, 1, "warrior", "Weapon", 4));
Weapons.push(new Weapon("Light Sword", 9, 1, "warrior", "Weapon", 4));
Weapons.push(new Weapon("Calamity", 15, 1, "warrior", "Weapon", 4));

Armours.push(new Armour("Bronze Armour", 1, 1, "warrior", "Chest", 1));
Armours.push(new Armour("Iron Boots", 1, 1, "warrior", "Boots", 2));
Armours.push(new Armour("Horned Helmet", 1, 1, "warrior", "Helmet", 3));
Armours.push(new Armour("Mithril Armour", 1, 1, "warrior", "Chest", 4));
Armours.push(new Armour("Mithril Armour", 1, 1, "warrior", "Chest", 4));
Armours.push(new Armour("Wizard Hat", 1, 1, "warrior", "Helmet", 0));
Armours.push(new Armour("Wizard Hat", 1, 1, "warrior", "Helmet", 1));
Armours.push(new Armour("Wizard Hat", 1, 1, "warrior", "Helmet", 2));
Armours.push(new Armour("Wizard Hat", 1, 1, "warrior", "Helmet", 3));
Armours.push(new Armour("Wizard Hat", 1, 1, "warrior", "Helmet", 4));

Recipes.push(new Recipe("Calamity", "Dark Sword", "Light Sword", 4));

Items = Items.concat(Potions, Weapons, Armours, Recipes);	//Concat all item types!!

var devInv = new Inventory(25, 6, "D E V");
devInv.open = true;
devInv.position = new Vector2(canvas.width - devInv.scale.x - 4, 4);
devInv.unlimitedStock = true;
for(var i = 0; i < Items.length; i++)
{
	devInv.Add(Items[i], "nearest");
}
