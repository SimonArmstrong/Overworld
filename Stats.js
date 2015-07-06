var Vitals = function(hp, mp, exp)
{
	this.maxHealth = hp;
	this.health = hp;
	
	this.maxMana = mp;
	this.mana = mp;
	
	this.expToLevel = exp;
	this.exp = exp;
}

Vitals.prototype.update = function()
{
	this.health = this.health;
	this.mana = this.mana;
	this.exp = this.exp;
}

Vitals.prototype.Set = function(hp, mp, exp)
{
	this.maxHealth = hp;
	this.maxMana = mp;
	this.expToLevel = exp;
}

//

var Stats = function(atk, def, spd)
{
	this.attack = atk;
	this.defense = def;
	this.speed = spd;
}

Stats.prototype.Set = function(atk, def, spd)
{
	this.attack = atk;
	this.defense = def;
	this.speed = spd;
}

Stats.prototype.update = function()
{
	this.attack = this.attack;
	this.defense = this.defense;
	this.speed = this.speed;
}