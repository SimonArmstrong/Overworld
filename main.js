var colliders = [];

var wallT = new Wall(TOP_LEFT, new Vector2(canvas.width, 32), "WallTestTile.png");
var wallB = new Wall(new Vector2(0, canvas.height - 32), new Vector2(canvas.width, 32), "WallTestTile.png");
var wallL = new Wall(TOP_LEFT, new Vector2(32, canvas.height), "WallTestTile.png");
var wallR = new Wall(new Vector2(canvas.width - 32, 0), new Vector2(32, canvas.height), "WallTestTile.png");

var chest = new Container([Items[0], Items[2]], new Vector2(player.position.x - 64, player.position.y));
var chest2 = new Container([Items[1], Items[4], Items[4]], new Vector2(player.position.x + 64, player.position.y));

function checkInput()
{
	player.input();
}

var chests = [];
chests.push(chest);
chests.push(chest2);


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
		if(chests[i].MouseOver() && dblClicked === true)
		{
			chests[i].Open();
			dblClicked = false;
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
	if(player.inventory.MouseOver() && clicked === true)
	{
		draggingInventory = true;
	}
	
	if(draggingInventory)
	{
		player.inventory.position = new Vector2(mousePosition.x - (player.inventory.scale.x / 2), mousePosition.y - 16);
	}
	
	var ind = -1;
	for(var y = 0; y < player.inventory.rows; y++)
	{
		for(var x = 0; x < player.inventory.columns; x++)
		{
			ind++;
			if(player.inventory.slots[ind].item.amount > 1)
			{
				context.fillText(player.inventory.slots[ind].item.amount, player.inventory.position.x + 11 + (34 * x), player.inventory.position.y + 30 + (34 * y));
			}
		}
	}
	if(player.inventory.selectedItem != "undefined")
	{
		context.drawImage(player.inventory.selectedItem.image.icon, mousePosition.x, mousePosition.y);
	}
}

States();