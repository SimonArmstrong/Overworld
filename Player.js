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
	
	//Stats
	this.inventory = new Inventory(5, 5, "I N V E N T O R Y");
	this.Stats = new Stats(0, 0, 180);
	this.Vitals = new Vitals(100, 100, 100);
	
	//Equipment
	//this.equipment = new Equipment();
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
}

Player.prototype.update = function(deltaTime)
{
	if(this.direction === DIR_UP && this.moving)
	{
		this.position.y -= this.Stats.speed * deltaTime;
	}
	if(this.direction === DIR_DOWN && this.moving)
	{
		this.position.y += this.Stats.speed * deltaTime;
	}
	if(this.direction === DIR_LEFT && this.moving)
	{
		this.position.x -= this.Stats.speed * deltaTime;
		this.image = imageLeft;
	}
	if(this.direction === DIR_RIGHT && this.moving)
	{
		this.image = imageRight;
		this.position.x += this.Stats.speed * deltaTime;
	}
}

Player.prototype.draw = function()
{
	context.drawImage(this.image, this.position.x, this.position.y);
}

Player.prototype.drawUI = function()
{
	var healthWidth = this.Vitals.maxHealth;
	drawRect("#000", new Vector2(canvas.width / 4, 6), new Vector2(128, 24));
	drawRect("#f00", new Vector2(canvas.width / 4 + 2, 8), new Vector2((this.Vitals.health / this.Vitals.maxHealth) * 124, 20));
}

var player = new Player();