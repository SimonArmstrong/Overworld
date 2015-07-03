var PickUp = function(img, pos, size)
{
	this.sprite = document.createElement("img");
	this.image = img;
	this.position = pos;
	this.scale = size;
	this.collider = new Collider("pickup", this.scale, this.position);
}

PickUp.prototype.draw = function() 
{
	this.sprite.src = imageFile;
	context.drawImage(this.sprite, this.position.x, this.position.y);
}