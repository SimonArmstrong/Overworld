var colliders = [];

var chest = new Container([Potions[0], Potions[1], Weapons[3], Weapons[4]], new Vector2(player.position.x - 64, player.position.y), COMMON);

function checkInput()
{
	player.input();
}

var chests = [];
chests.push(chest);

function run()
{
	var deltaTime = getDeltaTime();
	
	window.addEventListener('keydown', checkInput);
	window.addEventListener('keyup', checkInput);
	canvas.addEventListener('mousedown', mouseDown);
	canvas.addEventListener('mouseup', mouseUp);
	canvas.addEventListener('mousemove', mouseMove);
	canvas.addEventListener('dblclick', doubleClick);
	
	drawRect("#000", TOP_LEFT, BOTTOM_RIGHT);
	player.draw();
	
	
	for(var i = 0; i < chests.length; i++)
	{
		chests[i].draw();
		if(chests[i].MouseOver() && dblClicked === true)
		{
			chests[i].Open();
			dblClicked = false;
		}
		if(chests[i].open)
		{
			chests[i].inventory.draw();
			chests[i].inventory.update();
		}
	}
	
	
	//Player Drawing
	if(player.inventory.open === true){
		player.inventory.draw();
	}

	player.update(deltaTime);
	
	if(dialogueWindow.show)
	{
		dialogueWindow.draw();
		dialogueWindow.update();
	}
	
	player.drawUI();
	player.equipment.update();
	player.equipment.draw();
	devInv.draw();
	devInv.update();
	
	if(mouseMoving){
		context.drawImage(mouseIcon, mousePosition.x, mousePosition.y);
	}
	
	player.inventory.update();
	for(var i = 0; i < player.Stats.length; i++)
	{
		player.Stats[i].update();
	}
	for(var i = 0; i < chests.length; i++)
	{
		if(selectedItem != "undefined" && !clicked && chests[i].MouseOver())
		{
			chests[i].Add(selectedItem);
			selectedItem = "undefined";
		}
	}
}

States();