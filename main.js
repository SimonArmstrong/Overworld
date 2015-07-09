var randomChest = Math.floor(Math.random() * 400);
console.log(randomChest);
var chest = new Container([Potions[0], Potions[1], Weapons[3], Weapons[4]], new Vector2(player.position.x - 64, player.position.y), randomChest);

function checkInput()
{
	player.input();
}
	
window.addEventListener('keydown', checkInput);
window.addEventListener('keyup', checkInput);
canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mouseup', mouseUp);
canvas.addEventListener('mousemove', mouseMove);
canvas.addEventListener('dblclick', doubleClick);

var chests = [];
chests.push(chest);


//dungeon.build();
function run()
{
	var deltaTime = getDeltaTime();

	
	drawRect("#000", TOP_LEFT, BOTTOM_RIGHT);
	dungeon.draw(deltaTime);
	
	/*
	context.drawImage(floorTestImg, 670, 132);
	context.drawImage(floorTestImg, 670, 380);
	context.drawImage(floorTestImg, 670, 632);
	context.drawImage(floorTestImg, 370, 380);
	context.drawImage(floorTestImg, 970, 380);
	*/
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

	player.equipment.update();
	player.equipment.draw();
	player.update(deltaTime);
	
	
	if(dialogueWindow.show)
	{
		dialogueWindow.draw();
		dialogueWindow.update();
	}
	
	player.drawUI();
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