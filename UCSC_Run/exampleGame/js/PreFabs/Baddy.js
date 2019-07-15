function Baddy(game, x, y, key, frame, wallLayer, player, stage) {
	Phaser.Sprite.call(this,game,x,y,key,frame);
	this.anchor.set(0.5);
	this.wallLayer = wallLayer;
	this.player = player;
	this.stage = stage;
	game.physics.enable(this);
	this.body.collideWorldBounds = true;
	this.animations.add('left', [0, 1], 10, true);
	this.animations.add('right', [2, 3], 10, true);
	this.baddyEasing = Phaser.Easing.Linear.None;;
	this.pointX = x;
	this.pointY = y;
	this.baddyDestPointX = x + 200;
    this.baddyDestPointY = y;
    this.baddyMovePeriod = 2000;
    this.body.checkCollision.up = true;
    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;
    this.body.checkCollision.down = false;
    this.collideCond = 0;

}

Baddy.prototype = Object.create(Phaser.Sprite.prototype);
Baddy.prototype.constructor = Baddy;

Baddy.prototype.update = function(){
	this.collideCond = 0;
	//console.log(this.body.x,this.body.y);

	//Check the physics between Baddy and platform
	game.physics.arcade.collide(this, this.wallLayer);

	game.physics.arcade.collide(this.player, this, this.checkCollide, null, this);

	game.physics.arcade.overlap(this, this.player, this.killPlayer, null, this);
	if(this.body.velocity.x > 0){
		this.animations.play('right');
	}else{
		this.animations.play('left');
	}


}

Baddy.prototype.addMovementToPoint = function(){
    game.add.tween(this).to( { x: this.baddyDestPointX, y:this.baddyDestPointY}, this.baddyMovePeriod,
        this.baddyEasing, true, 0, Number.POSITIVE_INFINITY, true);
}

Baddy.prototype.checkCollide = function(){
	if(this.player.body.y < this.body.y + 10){
		this.kill();
		this.player.score += 100;
		console.log(this.player.score);
		this.player.body.velocity.y = -450;
		this.stage.updateScore(this.player, this.stage);
	}
}

Baddy.prototype.killPlayer = function(){
	console.log(this.collideCond);
	game.state.start('GameOver');
}