var player = new Player();
var GameObjects = [];

function run()
{
	var deltaTime = getDeltaTime();
	drawRect("#000", TOP_LEFT, BOTTOM_RIGHT);
	
	player.update(deltaTime);
	player.draw();
}

States();