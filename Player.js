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
	this.ObjectType = "Entity";
	
	//Image
	this.image = document.createElement("img");
	this.image.src = "player.png";
	
	//Stats
	this.speed = 180;
	this.inventory = new Inventory();
}

Player.prototype.update = function(deltaTime)
{
	if(Input.KeyDown(Input.KEY_W))
	{
		this.position.y -= this.speed * deltaTime
		this.direction = DIR_UP;
	}
	if(Input.KeyDown(Input.KEY_S))
	{
		this.position.y += this.speed * deltaTime
		this.direction = DIR_DOWN;
	}
	if(Input.KeyDown(Input.KEY_A))
	{
		this.position.x -= this.speed * deltaTime
		this.direction = DIR_LEFT;
	}
	if(Input.KeyDown(Input.KEY_D))
	{
		this.position.x += this.speed * deltaTime
		this.direction = DIR_RIGHT;
	}
}

Player.prototype.draw = function()
{
	context.drawImage(this.image, this.position.x, this.position.y);
}