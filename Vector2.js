//Basic Vector2 Math Class

var Vector2 = function(x, y){
	this.x = x;
	this.y = y;
}
Vector2.prototype.add = function(vec){
	return new Vector2(this.x + vec.x, this.y + vedc.y);
}
Vector2.prototype.subtract = function(vec){
	return new Vector2(this.x - vec.x, this.y - vedc.y);
}
Vector2.prototype.multiply = function(vec){
	return new Vector2(this.x * vec.x, this.y * vedc.y);
}
Vector2.prototype.divide = function(vec){
	return new Vector2(this.x / vec.x, this.y / vedc.y);
}
Vector2.prototype.set = function(x, y) 
{
	this.x = x;
	this.y = y;
};
