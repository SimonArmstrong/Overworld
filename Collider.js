var Collider = function(tag, vec_s, vec_p){
	this.tag = tag;
	this.scale = vec_s;
	this.position = vec_p;
}

Collider.prototype.isTouching = function(col)
{
	if(this.position.x <= col.position.x + col.scale.x &&
	   this.position.x + this.scale.x >= col.position.x &&
	   this.position.y <= col.position.y + col.scale.y &&
	   this.position.y + this.scale.y >= col.position.y)
	{
		return true;
	}
	else
	{
		return false;
	}
}

Collider.prototype.draw = function(color)
{
	context.strokeStyle = color;
	context.strokeRect(this.position.x, this.position.y, this.scale.x, this.scale.y);
}

