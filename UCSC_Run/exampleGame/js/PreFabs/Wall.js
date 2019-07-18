function Wall(game, x, y, key, frame, player) {
	Phaser.Sprite.call(this,game,x,y,key,frame);
	this.anchor.set(0.5);
	this.player = player;
	game.physics.enable(this);
	this.body.immovable = true;

	this.body.collideWorldBounds = true;



}

Wall.prototype = Object.create(Phaser.Sprite.prototype);
Wall.prototype.constructor = Wall;

Wall.prototype.update = function(){
	//console.log(this.body.x,this.body.y);
	game.debug.body(this);

	//Check the physics between Wall and platform
	game.physics.arcade.collide(this, this.player);
}
