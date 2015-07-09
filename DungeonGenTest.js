var DOOR_UP = 0;
var DOOR_DOWN = 1;
var DOOR_LEFT = 2;
var DOOR_RIGHT = 3;

var Room = function(vec_p)
{
	this.roomtype = Math.floor(Math.random() * 4); 
	
	this.position = vec_p;
	this.scale = new Vector2(128, 96);
	
	this.image = document.createElement("img");
	this.image.src = "floor_test.png";
	
	this.doorimage = document.createElement("img");
	this.doorimage.src = "bridge.png";
	
	this.doorPosition = new Vector2(0, 0);

	switch(this.roomtype){
		case 0:
			this.roomtype = "UP";
			this.doorPosition = new Vector2(this.position.x + (this.scale.x / 2), this.position.y - 32);
		break;
		case 1:
			this.roomtype = "DOWN";
			this.doorPosition = new Vector2(this.position.x + (this.scale.x / 2), this.position.y + this.scale.y * 2);
		break;
		case 2:
			this.roomtype = "LEFT";
			this.doorPosition = new Vector2(this.position.x - 64, this.position.y + (this.scale.y / 2) - 16);
		break;
		case 3:
			this.roomtype = "RIGHT";
			this.doorPosition = new Vector2(this.position.x + 256, this.position.y + (this.scale.y / 2) - 16);
		break;
	}
		
	this.collider = new Collider("Floor", new Vector2(this.position.x, this.position.y + 32), new Vector2(256, 158));
	this.doorCollider = new Collider("Floor", this.doorPosition, new Vector2(66, 66));
}

var Dungeon = function()
{
	this.Rooms = [];

	this.width = 3;
	this.height = 3;
	
	for(var x = 0; x < this.width; x++)
	{
		for(var y = 0; y < this.height; y++)
		{
			this.Rooms.push(new Room(new Vector2(352 + (x * 320), 152 + (y * 224))));
		}
	}
}

var roomPlayerIsIn = 0;

Dungeon.prototype.draw = function(deltaTime)
{
	for(var x = 0; x < this.width; x++)
	{
		for(var y = 0; y < this.height; y++)
		{
			if(y === this.height)
			{
				this.roomtype = 0;
			}
			if(y === this.height)
			{
				this.roomtype = 1;
			}
		}
	}
	
	for(var i = 0; i < this.Rooms.length; i++)
	{		
		if(player.collider.isTouching(this.Rooms[i].collider))
		{
			roomPlayerIsIn = i;
			//console.log(roomPlayerIsIn)
		}
		context.drawImage(this.Rooms[i].image, this.Rooms[i].position.x, this.Rooms[i].position.y);
		context.drawImage(this.Rooms[i].doorimage, this.Rooms[i].doorPosition.x, this.Rooms[i].doorPosition.y);
	}
}

var dungeon = new Dungeon();