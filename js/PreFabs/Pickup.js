function Pickup(game, x, y, key, frame, wallLayer, player, stage, pickupVal, isGood) {
	Phaser.Sprite.call(this, game, x, y, key, frame);
	this.anchor.set(0.5);
	this.wallLayer = wallLayer;
	this.player = player;
	this.stage = stage;
	this.pickupVal = pickupVal;
	game.physics.enable(this);
	this.body.setSize(30,30,8,8);
	this.body.collideWorldBounds = false;
	this.body.gravity.y = 0;

	this.isGood = isGood;
	this.body.checkCollision.up = true;
	this.body.checkCollision.left = true;
	this.body.checkCollision.right = true;
	this.body.checkCollision.down = true;

	if(this.isGood){
		this.music = game.add.audio('goodPickUp');
	} else{
		this.music = game.add.audio('badPickUp');
	}
	this.music.volume = 0.3;
}

Pickup.prototype = Object.create(Phaser.Sprite.prototype);
Pickup.prototype.constructor = Pickup;

Pickup.prototype.update = function(){
	game.physics.arcade.collide(this, this.wallLayer);
	game.physics.arcade.overlap(this.player, this, this.checkOverlap, null, this);
}

Pickup.prototype.checkOverlap = function(){
	this.music.play();
	this.kill();
	this.player.score += this.pickupVal;
	this.player.body.velocity.y = -400;
	this.stage.updateScore(this.player, this.stage);
}




