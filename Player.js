var DIR_LEFT  = 0;
var DIR_UP    = 1;
var DIR_RIGHT = 2;
var DIR_DOWN  = 3;

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
	this.image = document.createElement("img");
	this.image.src = "player.png";
	
	//Stats
	this.speed = 180;
	this.inventory = new Inventory();
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
		this.inventory.draw();
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
		this.position.y -= this.speed * deltaTime;
	}
	if(this.direction === DIR_DOWN && this.moving)
	{
		this.position.y += this.speed * deltaTime;
	}
	if(this.direction === DIR_LEFT && this.moving)
	{
		this.position.x -= this.speed * deltaTime;
	}
	if(this.direction === DIR_RIGHT && this.moving)
	{
		this.position.x += this.speed * deltaTime;
	}
}

Player.prototype.draw = function()
{
	context.drawImage(this.image, this.position.x, this.position.y);
}