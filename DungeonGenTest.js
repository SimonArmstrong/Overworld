var Rooms = [];

var width = 5;
var height = 5;

var DOOR_UP = 0;
var DOOR_DOWN = 1;
var DOOR_LEFT = 2;
var DOOR_RIGHT = 3;

var Room = function()
{
	this.roomtype = Math.floor(Math.random() * 4); 
	switch(this.roomtype){
		case 0:
			this.roomtype = "UP";
		break;
		case 1:
			this.roomtype = "DOWN";
		break;
		case 2:
			this.roomtype = "LEFT";
		break;
		case 3:
			this.roomtype = "RIGHT";
		break;
	}
}
var i = 0;

for(var x = 0; x < width; x++)
{
	for(var y = 0; y < height; y++)
	{
		/*
		Rooms.push(new Room());
		if(y >= height)
		{
			Rooms[i].roomtype = "UP";
		}
		if(x >= width)
		{
			Rooms[i].roomtype = "LEFT";
		}
		console.log(Rooms[i].roomtype);
		i++;
		*/
	}
}