var GameObjects = [];
var chest = new Container(Items[0], new Vector2(player.position.x - 64, player.position.y));
var chest2 = new Container(Items[0], new Vector2(player.position.x + 64, player.position.y));

function checkInput()
{
	player.input();
}

var chests = [];
chests.push(chest);
chests.push(chest2);

function run()
{
	var deltaTime = getDeltaTime();
	
	window.addEventListener('keydown', checkInput);
	window.addEventListener('keyup', checkInput);
	canvas.addEventListener('mousedown', mouseDown);
	canvas.addEventListener('mouseup', mouseUp);
	canvas.addEventListener('mousemove', mouseMove);
	canvas.addEventListener('dblclick', doubleClick)
	
	
	drawRect("#000", TOP_LEFT, BOTTOM_RIGHT);
	player.draw();
	
	for(var i = 0; i < chests.length; i++)
	{
		if(chests[i].MouseOver() && dblClicked === true)
		{
			chests[i].Open();
		}
		chests[i].draw();
	}
	
	if(player.inventory.open === true)
	{
		player.inventory.draw();
	}
	else
	{
		player.update(deltaTime);
	}
	if(mouseMoving){
		context.drawImage(mouseIcon, mousePosition.x, mousePosition.y);
	}
}

States();