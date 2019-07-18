function Player(game, x, y, key, frame,wallLayer) {
	Phaser.Sprite.call(this,game,x,y,key,frame);
	this.anchor.set(0.5);
	this.wallLayer = wallLayer;

	game.physics.enable(this);
	this.body.bounce.y = 0.2;
	this.body.gravity.y = 1000;
	this.body.setSize(20,35,5,10);
	this.body.collideWorldBounds = true;
	this.jumpCondition = 0;
	this.score = 0;
	this.maxGravity = 2000;

	//Player's left and right animation
	this.animations.add('left', [0, 1, 2, 3], 10, true);
	this.animations.add('right', [5, 6, 7, 8], 10, true);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){

	//Check the physics between player and platform
	game.physics.arcade.collide(this, this.wallLayer);


	//Reset the players velocity (movement)
	this.body.velocity.x = 0;

	if(cursors.left.isDown){
		//Move to left
		this.body.velocity.x = -200;
		this.animations.play('left');
	}else if(cursors.right.isDown){
		//Move to right
		this.body.velocity.x = 200;
		this.animations.play('right');
	}else{
		//Stand Still
		this.animations.stop();
		this.frame = 4;
	}

  	// Game over if falls down the hole
  	if (this.body.y > fallingHeight) {
    	game.state.start('GameOver');
  	}
  	if(cursors.up.isUp){
  		this.jumpCondition = 0;
  	}

	//Allow the player to jump if they are on the ground
	if(cursors.up.isDown && this.body.blocked.down && this.jumpCondition == 0){
		this.body.velocity.y = -550;
		this.jumpCondition = 1;
	}

	if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			//Press the space to start the play state
			console.log(this.body.x, this.body.y);
		}

	if(this.body.velocity.y > this.maxGravity){
		this.body.velocity.y = this.maxGravity;
	}

	//Set a win condition to the game
	if(score == 150){
		//After collect all stars, jump to game over state
		game.state.start('GameOver');
	}

}
