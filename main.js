var colliders = [];

var wallT = new Wall(TOP_LEFT, new Vector2(canvas.width, 32), "WallTestTile.png");
var wallB = new Wall(new Vector2(0, canvas.height - 32), new Vector2(canvas.width, 32), "WallTestTile.png");
var wallL = new Wall(TOP_LEFT, new Vector2(32, canvas.height), "WallTestTile.png");
var wallR = new Wall(new Vector2(canvas.width - 32, 0), new Vector2(32, canvas.height), "WallTestTile.png");

var chest = new Container([Potions[1], Potions[1]], new Vector2(player.position.x - 64, player.position.y), COMMON);
var chest2 = new Container([Items[1], Potions[0], Potions[0]], new Vector2(player.position.x + 64, player.position.y), RARE);
var chest3 = new Container([Weapons[0], Armour[0], Potions[0]], new Vector2(player.position.x, player.position.y + 64), GREAT);

function checkInput()
{
	player.input();
}

var chests = [];
chests.push(chest);
chests.push(chest2);
chests.push(chest3);


colliders.push(wallT.collider);
colliders.push(wallB.collider);
colliders.push(wallL.collider);
colliders.push(wallR.collider);
colliders.push(chest.collider);
colliders.push(chest2.collider);

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
	
	wallT.draw();
	wallB.draw();
	wallL.draw();
	wallR.draw();
	
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
	else{
		player.update(deltaTime);
	}
	
	if(dialogueWindow.show)
	{
		dialogueWindow.draw();
		dialogueWindow.update();
	}
	
	player.drawUI();
	
	if(mouseMoving){
		context.drawImage(mouseIcon, mousePosition.x, mousePosition.y);
	}
	
	player.Vitals.health -= 1 * deltaTime;
	
	player.inventory.update();
	player.Stats.update();
	player.Vitals.update();
	
}

States();