//Here is the play state, all the update function are implement in this state
//If player collect all the scores or touch the baddies, jump to Game Over state
Play.prototype = {
	init: function() {
		score = 0;
	},

	preload: function() {
	},

	create: function() {

		//This line enable the Arcade Physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//Set the tilemap of the game
		game.stage.setBackgroundColor('#87CEEB');
		this.map = game.add.tilemap('stage0');
		this.map.addTilesetImage('common', 'tile');

		//New tilemaplayer object
		this.groundLayer = this.map.createLayer('BackGround');
		this.wallLayer = this.map.createLayer('Collision');
		this.groundLayer.resizeWorld();
		this.map.setCollisionByExclusion([], true, this.wallLayer);

		//Add the music to game
		music = game.add.audio('pop');


	    //Create a player and its settings
		this.player = game.add.sprite(32, 0, 'dude');

		//Physics of player
		game.physics.arcade.enable(this.player);
		this.player.body.bounce.y = 0.2;
		this.player.body.gravity.y = 350;
		this.player.body.collideWorldBounds = true;

		//Player's left and right animation
		this.player.animations.add('left', [0, 1, 2, 3], 10, true);
		this.player.animations.add('right', [5, 6, 7, 8], 10, true);

		//Set camera for the game
		game.camera.follow(this.player);

		//Create the enemy and its settings
		baddies = game.add.group();
		baddies.enableBody = true;

		baddie1 = baddies.create(200, 0, 'baddie');
		baddie2 = baddies.create(125, 0, 'baddie');
		//Physics of enemies
		baddie1.body.collideWorldBounds = true;
		baddie2.body.collideWorldBounds = true;

		//Baddies' left and right animation
		baddie1.body.gravity.y = baddie2.body.gravity.y = 350;
		baddie1.animations.add('left', [0, 1], 10, true);
		baddie1.animations.add('right', [2, 3], 10, true);
		baddie2.animations.add('left', [0, 1], 10, true);
		baddie2.animations.add('right', [2, 3], 10, true);
		
		



		//Stars to be collected by players
		stars = game.add.group();

		//Stars can be touch in the game, so enable body
		stars.enableBody = true;

		//Create 12 starts in total
		for(var i = 0; i < 10; i++){
			var star = stars.create(i * 40, 0, 'star');

			//Set gravity to each star
			star.body.gravity.y = 100;

			//Give a slightly random bounce rate to every star
			star.body.bounce.y = 0.7 + Math.random() * 0.2;
		}

		//Diamond to be collected by players
		diamonds = game.add.group();

		//Diamond can be touch in the game, so enable body
		diamonds.enableBody = true;

		//Create a diamond in the air
		var diamond = diamonds.create(game.rnd.integerInRange(50,250), game.rnd.integerInRange(130,300), 'diamond');

		//Create the snow in the front end
		for(var i = 0; i < 100; ++i){
			this.snow = new Snow(game, 'snowFlake', 3, Math.PI);
			game.add.existing(this.snow);
		}

		//Score of the game
		scoreText = game.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#000'});

		//Create the cursor of the game
		cursors = game.input.keyboard.createCursorKeys();

	},

	update: function() {
		//Check the physics between player and platform
		game.physics.arcade.collide(this.player, this.wallLayer);


		//Reset the players velocity (movement)
		this.player.body.velocity.x = 0;

		if(cursors.left.isDown){

			//Move to left
			this.player.body.velocity.x = -150;
			this.player.animations.play('left');
		}else if(cursors.right.isDown){

			//Move to right
			this.player.body.velocity.x = 150;
			this.player.animations.play('right');
		}else{

			//Stand Still
			this.player.animations.stop();
			this.player.frame = 4;
		}

		//Allow the player to jump if they are on the ground
		if(cursors.up.isDown && this.player.body.blocked.down){
			this.player.body.velocity.y = -350;
		}

		//Set a win condition to the game
		if(score == 150){
			//After collect all stars, jump to game over state
			game.state.start('GameOver');
		}

		//Play baddies' animation
		baddie1.animations.play('left');
		baddie2.animations.play('right');


	}

}

function collectStar (player, star) {
    
    //Remove the star from the screen
    star.kill();
    music.play();
    score +=10;
    scoreText.text = 'Score: ' + score;

}
function collectDiamond(player, diamond){

	//Remove diamond from the screen
	diamond.kill();
	score += 50;
	scoreText.text = 'Score: ' + score;
}

function getBaddies(player, baddies){
	
	//Remove baddies from the screen
	baddies.kill();
	score -= 25;
	//Lose the game, jump to GameOver state
	game.state.start('GameOver');
}
