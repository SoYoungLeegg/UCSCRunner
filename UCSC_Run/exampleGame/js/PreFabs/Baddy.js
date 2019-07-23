function Baddy(game, x, y, key, frame, wallLayer, player, stage, leftWall, rightWall) {
	Phaser.Sprite.call(this,game,x,y,key,frame);
	this.anchor.set(0.5);
	this.wallLayer = wallLayer;
	this.player = player;
	this.stage = stage;
	game.physics.enable(this);
	this.body.setSize(20,50,5,20);
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 600;
	this.animations.add('fly', [0, 1, 2, 3, 4], 10, true);
	
    this.body.checkCollision.up = true;
    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;
    this.body.checkCollision.down = true;
    this.leftWall = leftWall;
    this.rightWall = rightWall;
    this.moveCond = 0;
}

Baddy.prototype = Object.create(Phaser.Sprite.prototype);
Baddy.prototype.constructor = Baddy;

Baddy.prototype.update = function(){
	//console.log(this.body.x,this.body.y);

	//Check the physics between Baddy and platform
	game.physics.arcade.collide(this, this.wallLayer);

	game.physics.arcade.collide(this.player, this, this.checkCollide, null, this);

	this.addMovementToPoint();

	if(this.body.velocity.x > 0){
		this.scale.setTo(1,1);
	}else{
		this.scale.setTo(-1,1);
	}
	this.animations.play('fly');
}

Baddy.prototype.addMovementToPoint = function(){
	if(this.body.x <= this.leftWall){
		this.moveCond = 1;
	}else if(this.body.x >= this.rightWall){
		this.moveCond = 0;
	}
    if(this.body.x >= this.leftWall && this.moveCond == 0){
    	this.body.velocity.x = -75;	   
    }else if(this.body.x <= this.rightWall && this.moveCond == 1){
    	this.body.velocity.x = 75;
    }
}

Baddy.prototype.checkCollide = function(){
	if(this.player.body.y < (this.body.y - 10)){
		music.play();
		this.kill();
		this.player.score += 100;
		this.player.body.velocity.y = -450;
		this.stage.updateScore(this.player, this.stage);
	}else{
		game.state.start('GameOver');
	}
}

Baddy.prototype.killPlayer = function(){
	game.state.start('GameOver');
}