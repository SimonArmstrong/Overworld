var DIR_LEFT  = 0;
var DIR_UP    = 1;
var DIR_RIGHT = 2;
var DIR_DOWN  = 3;

//Image loads
var imageRight = document.createElement("img");
imageRight.src = "player_right.png";

var imageLeft = document.createElement("img");
imageLeft.src = "player.png";

//Animations
var IDLE_LEFT = 0;
var IDLE_RIGHT = 1;
var WALK_LEFT = 2;
var WALK_RIGHT = 3;
var ATTACK_LEFT = 4;

var Player = function()
{
	//Transform details
	this.scale = new Vector2(32, 32);
	this.position = new Vector2(CENTER.x - (this.scale.x / 2), CENTER.y - (this.scale.y / 2));
	this.collider = new Collider("player", this.position, this.scale);
	this.direction = DIR_LEFT;
	this.moving = false;
	this.ObjectType = "Entity";
	
	//Player Image
	this.sprite = new Sprite("player_anim.png");
	this.sprite.buildAnimation(4, 2, 32, 32, 0.1, [0]);
	this.sprite.buildAnimation(4, 2, 32, 32, 0.1, [4]);
	this.sprite.buildAnimation(4, 2, 32, 32, 0.1, 
								[1,2,3,2,1]);
	this.sprite.buildAnimation(4, 2, 32, 32, 0.1, 
								[5,6,7,6,5]);
	this.lsprite = new Sprite("player_anim_lower.png");
	this.lsprite.buildAnimation(4, 2, 32, 32, 0.1, [0]);
	this.lsprite.buildAnimation(4, 2, 32, 32, 0.1, [4]);
	this.lsprite.buildAnimation(4, 2, 32, 32, 0.1, 
								[1,2,3,2,1]);
	this.lsprite.buildAnimation(4, 2, 32, 32, 0.1, 
								[5,6,7,6,5]);
								
	//player Sword
	this.sSprite = new Sprite("player_anim_sword_Steel Sword.png");
	this.sSprite.buildAnimation(4, 2, 32, 32, 0.1, [0]);
	this.sSprite.buildAnimation(4, 2, 32, 32, 0.1, [4]);
	this.sSprite.buildAnimation(4, 2, 32, 32, 0.1, 
								[1,2,3,2,1]);
	this.sSprite.buildAnimation(4, 2, 32, 32, 0.1, 
								[5,6,7,6,5]);
								
	//player Shield
	this.shSprite = new Sprite("player_anim_shield_Iron Shield.png");
	this.shSprite.buildAnimation(4, 2, 32, 32, 0.1, [0]);
	this.shSprite.buildAnimation(4, 2, 32, 32, 0.1, [4]);
	this.shSprite.buildAnimation(4, 2, 32, 32, 0.1, 
								[1,2,3,2,1]);
	this.shSprite.buildAnimation(4, 2, 32, 32, 0.1, 
								[5,6,7,6,5]);
								
	for(var i = 0; i < 5; i++)
	{
		this.sprite.setAnimationOffset(i, -this.scale.x/2, -this.scale.y/2);
		this.sSprite.setAnimationOffset(i, -this.scale.x/2, -this.scale.y/2);
		this.shSprite.setAnimationOffset(i, -this.scale.x/2, -this.scale.y/2);
		this.lsprite.setAnimationOffset(i, -this.scale.x/2, -this.scale.y/2);
	}
	
	//Equipment
	this.equipment = new Equipment();
	this.hotbar = new Hotbar();
	
	//Stats
	this.inventory = new Inventory(5, 5, "I N V E N T O R Y");
	this.isDead = false;
	
	//Base
	this.strength = new Stat("STR", 5, 200);
	this.dexterity = new Stat("DEX", 5, 200);
	this.intelligence = new Stat("INT", 5, 200);
	this.luck = new Stat("LUK", 5, 200);
	
	//Vitals
	this.health = new Stat("Health", 100, 100);
	this.mana = new Stat("Mana", 100, 100);
	this.attack = new Stat("Attack", 1, 200);
	this.defence = new Stat("Defence", 1, 200);
	this.mAttack = new Stat("Magic Attack", 1, 200);
	this.accuracy = new Stat("Accuracy", 1, 200);
	this.speed = new Stat("Speed", 180, 250);
	
	//Level
	this.experience = new Stat("Exp", 0, 100);
	this.level = new Stat("Level", 1, 300)
	
	//Stat array
	this.Stats = [];
	this.bStats = [];
}

Player.prototype.input = function()
{
	if(player.isDead === false)
	{
		if(Input.KeyDown(Input.KEY_UP))
		{
			this.moving = true;
			this.direction = DIR_UP;
		}
		else if(Input.KeyDown(Input.KEY_DOWN))
		{
			this.moving = true;
			this.direction = DIR_DOWN;
		}
		else if(Input.KeyDown(Input.KEY_LEFT))
		{
			this.moving = true;
			this.direction = DIR_LEFT;
		}
		else if(Input.KeyDown(Input.KEY_RIGHT))
		{
			this.moving = true;
			this.direction = DIR_RIGHT;
		}
		else
		{
			this.moving = false;
		}
	}
	else
	{
		this.moving = false;
	}
		
	if(Input.keys[Input.I] === true && this.inventory.open === false)
	{
		this.inventory.open = true;
	}
	else if(Input.keys[Input.I] === true && this.inventory.open === true)
	{
		this.inventory.open = false;
	}
	
	if(Input.keys[Input.E] === true && this.equipment.open === false)
	{
		this.equipment.open = true;
	}
	else if(Input.keys[Input.E] === true && this.equipment.open === true)
	{
		this.equipment.open = false;
	}
	
	if(Input.keys[Input.SHIFT] === true)
	{
		
	}
}

Player.prototype.update = function(deltaTime)
{
	this.collider.position = new Vector2(this.position.x - 4, this.position.y + 12);
	this.collider.scale = new Vector2(8, 4);
	if(this.equipment.righthand != "undefined")
	{
		this.sSprite.image.src = "player_anim_sword_" + this.equipment.righthand.name + ".png";
	}
	if(this.equipment.lefthand != "undefined")
	{
		this.shSprite.image.src = "player_anim_shield_" + this.equipment.lefthand.name + ".png";
	}
	this.lsprite.update(deltaTime);
	this.sprite.update(deltaTime);
	this.sSprite.update(deltaTime);
	this.shSprite.update(deltaTime);
	
	
	if(this.direction === DIR_UP && this.moving)
	{
		this.position.y -= this.speed.maximum * deltaTime;
	}
	if(this.direction === DIR_DOWN && this.moving)
	{
		this.position.y += this.speed.maximum * deltaTime;
	}
	if(this.direction === DIR_LEFT && this.moving)
	{
		this.position.x -= this.speed.maximum * deltaTime;
		this.sprite.setAnimation(WALK_LEFT);
		this.sSprite.setAnimation(WALK_LEFT);
		this.shSprite.setAnimation(WALK_LEFT);
		this.lsprite.setAnimation(WALK_LEFT);
	}
	else if(this.direction === DIR_LEFT)
	{
		this.sprite.setAnimation(IDLE_LEFT); 
		this.sSprite.setAnimation(IDLE_LEFT);
		this.shSprite.setAnimation(IDLE_LEFT);
		this.lsprite.setAnimation(IDLE_LEFT);
	}
	if(this.direction === DIR_RIGHT && this.moving)
	{
		this.sprite.setAnimation(WALK_RIGHT);
		this.sSprite.setAnimation(WALK_RIGHT);
		this.shSprite.setAnimation(WALK_RIGHT);
		this.lsprite.setAnimation(WALK_RIGHT);
		this.position.x += this.speed.maximum * deltaTime;
	}
	else if(this.direction === DIR_RIGHT)
	{
		this.sprite.setAnimation(IDLE_RIGHT); 
		this.sSprite.setAnimation(IDLE_RIGHT);
		this.shSprite.setAnimation(IDLE_RIGHT);
		this.lsprite.setAnimation(IDLE_RIGHT);
	}
	
	this.Stats.push(this.level);
	this.Stats.push(this.experience);
	this.Stats.push(this.health);
	this.Stats.push(this.mana);
	this.Stats.push(this.attack);
	this.Stats.push(this.mAttack);
	this.Stats.push(this.accuracy);
	this.Stats.push(this.defence);
	this.Stats.push(this.speed);
	
	this.bStats.push(this.strength);
	this.bStats.push(this.dexterity);
	this.bStats.push(this.intelligence);
	this.bStats.push(this.luck);
	
	for(var i = 0; i < this.Stats.length; i++)
	{
		if(this.Stats[i].amount > this.Stats[i].maximum)
		{
			if(this.Stats[i].name === "Exp")
			{
				this.level.amount++;
				this.Stats[i].maximum = this.Stats[i].maximum + (this.Stats[i].maximum / 4);
				this.Stats[i].amount = 0;
				this.LevelUp();
			}
			else
			{
				this.Stats[i].amount = this.Stats[i].maximum;
			}
		}
		if(this.Stats[i].amount <= 0)
		{
			this.Stats[i].amount = 0;
		}
	}
}

Player.prototype.LevelUp = function()
{
	player.health.maximum += player.health.maximum / 2;
	player.mana.maximum += player.mana.maximum / 2;
}

Player.prototype.draw = function()
{
	if(player.isDead === false)
	{
		context.drawImage(shadowImage, this.position.x - 16, this.position.y - 14);
		if(this.equipment.rightHandSlot.items[0] != "undefined")
		{
			this.sSprite.draw(context, this.position.x, this.position.y);
		}
		this.lsprite.draw(context, this.position.x, this.position.y);
		this.sprite.draw(context, this.position.x, this.position.y);
		if(this.equipment.leftHandSlot.items[0] != "undefined")
		{
			this.shSprite.draw(context, this.position.x, this.position.y);
		}
	}
}

Player.prototype.drawUI = function()
{
	var UIposition = new Vector2(canvas.width / 4, 8);
	
	context.fillStyle = "#fff";
	context.font = "24px Trebuchet MS";
	context.fillText("LV. " + this.level.amount, UIposition.x - 128, UIposition.y + 24);
	drawRect("#333", new Vector2(UIposition.x - 20, UIposition.y), new Vector2(196, 32));
	context.font = "8px Verdana";
	
	context.fillStyle = "#fff";
	context.fillText("HP:", UIposition.x - 16, UIposition.y + 9);
	drawRect("#000", new Vector2(UIposition.x, UIposition.y + 2), new Vector2(128, 8));
	drawRect("#f00", new Vector2(UIposition.x + 2, UIposition.y + 4), new Vector2((this.health.amount / this.health.maximum) * 124, 5));
	context.fillStyle = "#fff";
	context.fillText(Math.floor(this.health.amount) + "/" + Math.floor(this.health.maximum), UIposition.x + 130, UIposition.y + 9);
	
	context.fillText("MP:", UIposition.x - 16, UIposition.y + 19);
	drawRect("#000", new Vector2(UIposition.x, UIposition.y + 12), new Vector2(128, 8));
	drawRect("#00f", new Vector2(UIposition.x + 1, UIposition.y + 14), new Vector2((this.mana.amount / this.mana.maximum) * 124 + 1, 5));
	context.fillStyle = "#fff";
	context.fillText(Math.floor(this.mana.amount) + "/" + Math.floor(this.mana.maximum), UIposition.x + 130, UIposition.y + 19);
	
	context.fillText("XP:", UIposition.x - 16, UIposition.y + 29);
	drawRect("#000", new Vector2(UIposition.x, UIposition.y + 22), new Vector2(128, 8));
	drawRect("#ff0", new Vector2(UIposition.x + 2, UIposition.y + 24), new Vector2((this.experience.amount / this.experience.maximum) * 124, 5));
	context.fillStyle = "#fff";
	context.fillText(Math.floor(this.experience.amount) + "/" + Math.floor(this.experience.maximum), UIposition.x + 130, UIposition.y + 29);
	
	player.hotbar.draw();
}

var player = new Player();