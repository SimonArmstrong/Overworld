var Wall = function(vec_p, vec_s, tile)
{
	this.collider = new Collider("wall", vec_s, vec_p);
	this.tile = document.createElement("img");
	this.tileImage = tile;
}

Wall.prototype.draw = function()
{
	this.tile.src = this.tileImage;
	
	var fullSize = this.collider.position.x + this.collider.scale.x;
	
	for(var x = this.collider.position.x; x < this.collider.position.x + this.collider.scale.x; x += 32)
	{
		context.drawImage(this.tile, x, this.collider.position.y);
	}
	
	for(var y = this.collider.position.y; y < this.collider.scale.y; y += 32)
	{
		context.drawImage(this.tile, this.collider.position.x, y);
	}
}