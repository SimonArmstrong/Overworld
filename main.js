var player = new Player();
var GameObjects = [];

function checkInput()
{
	player.input();
	console.log(player.inventory.slots.length);
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
	else
	{
		for(var i = 0; i < player.inventory.slots.length; i++)
		{
			if(player.inventory.slots[i].MouseOver() && clicked === true)
			{
				console.log("Clicked: " + player.inventory.slots[i].item.name);
			}
		}
	}
}

States();