var DIR_LEFT  = 0;
var DIR_UP    = 1;
var DIR_RIGHT = 2;
var DIR_DOWN  = 3;

//Image loads
var imageRight = document.createElement("img");
imageRight.src = "player_right.png";

var imageLeft = document.createElement("img");
imageLeft.src = "player.png";

var Player = function()
{
	//Transform details
	this.scale = new Vector2(32, 32);
	this.position = new Vector2(CENTER.x - (this.scale.x / 2), CENTER.y - (this.scale.y / 2));
	this.collider = new Collider("player", this.position, this.scale);
	this.direction = DIR_LEFT;
	this.moving = false;
	this.ObjectType = "Entity";
	
	//Image
	this.image = imageLeft;
	
	//Equipment
	this.equipment = new Equipment();
	this.hotbar = new Hotbar();
	
	//Stats
	this.inventory = new Inventory(5, 5, "I N V E N T O R Y");
	this.health = new Stat("Health", 100, 100);
	this.mana = new Stat("Mana", 100, 100);
	this.speed = new Stat("Speed", 180, 250);
	this.Stats = [];
}

Player.prototype.input = function()
{
	if(Input.KeyDown(Input.KEY_W))
	{
		this.moving = true;
		this.direction = DIR_UP;
	}
	else if(Input.KeyDown(Input.KEY_S))
	{
		this.moving = true;
		this.direction = DIR_DOWN;
	}
	else if(Input.KeyDown(Input.KEY_A))
	{
		this.moving = true;
		this.direction = DIR_LEFT;
	}
	else if(Input.KeyDown(Input.KEY_D))
	{
		this.moving = true;
		this.direction = DIR_RIGHT;
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
}

Player.prototype.update = function(deltaTime)
{
	if(this.direction === DIR_UP && this.moving)
	{
		this.position.y -= this.speed.amount * deltaTime;
	}
	if(this.direction === DIR_DOWN && this.moving)
	{
		this.position.y += this.speed.amount * deltaTime;
	}
	if(this.direction === DIR_LEFT && this.moving)
	{
		this.position.x -= this.speed.amount * deltaTime;
		this.image = imageLeft;
	}
	if(this.direction === DIR_RIGHT && this.moving)
	{
		this.image = imageRight;
		this.position.x += this.speed.amount * deltaTime;
	}
	this.Stats.push(this.health);
	this.Stats.push(this.mana);
	this.Stats.push(this.speed);
	
	for(var i = 0; i < this.Stats.length; i++)
	{
		if(this.Stats[i].amount > this.Stats[i].maximum)
		{
			this.Stats[i].amount = this.Stats[i].maximum;
		}
		if(this.Stats[i].amount <= 0)
		{
			this.Stats[i].amount = 0;
		}
	}
}

Player.prototype.draw = function()
{
	context.drawImage(this.image, this.position.x, this.position.y);
}

Player.prototype.drawUI = function()
{
	var healthWidth = this.health.maximum;
	drawRect("#000", new Vector2(canvas.width / 4, 6), new Vector2(128, 8));
	drawRect("#f00", new Vector2(canvas.width / 4 + 2, 8), new Vector2((this.health.amount / this.health.maximum) * 124, 5));
	var manaWidth = this.mana.maximum;
	drawRect("#000", new Vector2(canvas.width / 4, 16), new Vector2(128, 8));
	drawRect("#00f", new Vector2(canvas.width / 4 + 2, 18), new Vector2((this.mana.amount / this.mana.maximum) * 124, 5));
	player.hotbar.draw();
}

var player = new Player();