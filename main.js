var player = new Player();
var GameObjects = [];

function checkInput()
{
	player.input();
}
window.addEventListener('keydown', checkInput);
window.addEventListener('keyup', checkInput);

function run()
{
	var deltaTime = getDeltaTime();
	
	if(player.inventory.open === false)
	{
		drawRect("#000", TOP_LEFT, BOTTOM_RIGHT);
		player.update(deltaTime);
		player.draw();
	}
}

States();