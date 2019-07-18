//Here is the play state, all the update function are implement in this state
//If player collect all the scores or touch the baddies, jump to Game Over state
Play.prototype = {
	init: function() {
    	fallingHeight = 2000;

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

	  	//Create a player and its settings 85
		this.player = new Player(game, 85, 1350, 'slug', 1,this.wallLayer);

		//Set camera for the game
		game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

		//Set score for the game
		this.scoreText = game.add.text(16, 16, 'Score: 0');
		this.scoreText.fixedToCamera = true;
		this.scoreText.cameraOffset.setTo(15,15);
		this.scoreText.fill = '#ffffff';
		this.scoreText.setShadow(3, 3, 'rgba(1,1,0.8,0.3)', 5);

		//Set some background structure
		this.busStop = game.add.sprite(180, 1560, 'busStop');
		this.busStop.anchor.set(0.5);
		this.busStop.scale.setTo(0.5,0.5);

		this.dormA = new Dorm(game, 3010, 1020, 'dormA', 1, this.player);

		this.dBuilding = game.add.sprite(3940, 1310, 'dBuilding');
		this.dBuilding.anchor.set(0.5);
		this.dBuilding.scale.setTo(0.9,0.9);

		this.diningHall = game.add.sprite(5583, 1115, 'diningHall');
		this.diningHall.anchor.set(0.5);
		this.diningHall.scale.setTo(0.7,0.7);

		this.squiggle = game.add.sprite(1200, 1395, 'squiggle');
		this.squiggle.anchor.set(0.5);
		this.squiggle.scale.setTo(0.5,0.5);

		//Set the protal of the stage
		this.portal = new Portal(game, 5626, 1400, 'portal', 1, this.player, this);
		game.add.existing(this.portal);

		//Create the enemy and its setting
		this.baddie1 = new Baddy(game, 200 , 1600, 'bee', 1, this.wallLayer, this.player, this, 150, 300);

		this.baddie2 = new Baddy(game, 1133, 1400, 'bee', 1, this.wallLayer, this.player, this, 1033, 1200);

		this.baddie3 = new Baddy(game, 1233, 1400, 'bee', 1, this.wallLayer, this.player, this, 1100, 1300);

		this.baddie4 = new Baddy(game, 2860,  800, 'bee', 1, this.wallLayer, this.player, this, 2750, 2900);

		this.baddie5 = new Baddy(game, 3060,  800, 'bee', 1, this.wallLayer, this.player, this, 3000, 3150);

		this.baddie6 = new Baddy(game, 2798, 1195, 'bee', 1, this.wallLayer, this.player, this, 2700, 2850);

		this.baddie7 = new Baddy(game, 3100, 1300, 'bee', 1, this.wallLayer, this.player, this, 3088, 3141);

		this.baddie8 = new Baddy(game, 3903, 1490, 'bee', 1, this.wallLayer, this.player, this, 3850, 1530);

		this.baddie9 = new Baddy(game, 6050,  950, 'bee', 1, this.wallLayer, this.player, this, 6016, 6136);

		this.baddie10= new Baddy(game, 3700, 1400, 'bee', 1, this.wallLayer, this.player, this, 3600, 3900);

		this.baddie11= new Baddy(game, 4000, 1400, 'bee', 1, this.wallLayer, this.player, this, 3900, 4164);

		this.baddie12= new Baddy(game, 1700, 900, 'bee', 1, this.wallLayer, this.player, this, 1600, 1968);




		game.add.existing(this.baddie1);
		game.add.existing(this.baddie2);
		game.add.existing(this.baddie3);
		game.add.existing(this.baddie4);
		game.add.existing(this.baddie5);
		game.add.existing(this.baddie6);
		game.add.existing(this.baddie7);
		game.add.existing(this.baddie8);
		game.add.existing(this.baddie9);
		game.add.existing(this.baddie10);
		game.add.existing(this.baddie11);
		game.add.existing(this.baddie12);
		game.add.existing(this.dormA);
		// //Create the enemy and its settings
		// baddies = game.add.group();
		// baddies.enableBody = true;

		// baddie1 = baddies.create(200, 0, 'baddie');
		// baddie2 = baddies.create(125, 0, 'baddie');
		// //Physics of enemies
		// baddie1.body.collideWorldBounds = true;
		// baddie2.body.collideWorldBounds = true;

		// //Baddies' left and right animation
		// baddie1.body.gravity.y = baddie2.body.gravity.y = 350;
		// baddie1.animations.add('left', [0, 1], 10, true);
		// baddie1.animations.add('right', [2, 3], 10, true);
		// baddie2.animations.add('left', [0, 1], 10, true);
		// baddie2.animations.add('right', [2, 3], 10, true);
		
		



		// //Stars to be collected by players
		// stars = game.add.group();

		// //Stars can be touch in the game, so enable body
		// stars.enableBody = true;

		// //Create 12 starts in total
		// for(var i = 0; i < 10; i++){
		// 	var star = stars.create(i * 40, 0, 'star');

		// 	//Set gravity to each star
		// 	star.body.gravity.y = 100;

		// 	//Give a slightly random bounce rate to every star
		// 	star.body.bounce.y = 0.7 + Math.random() * 0.2;
		// }

		// //Diamond to be collected by players
		// diamonds = game.add.group();

		// //Diamond can be touch in the game, so enable body
		// diamonds.enableBody = true;

		// //Create a diamond in the air
		// var diamond = diamonds.create(game.rnd.integerInRange(50,250), game.rnd.integerInRange(130,300), 'diamond');

		// //Create the snow in the front end
		// for(var i = 0; i < 100; ++i){
		// 	this.snow = new Snow(game, 'snowFlake', 3, Math.PI);
		// 	game.add.existing(this.snow);
		// }


		//Remain time of the game
		this.times = game.add.text(16, 16, 'Time: 200');
		this.times.fixedToCamera = true;
		this.realTime = 200;
		this.times.cameraOffset.setTo(650,15);
		this.times.fill = '#ffffff';
		this.times.setShadow(3, 3, 'rgba(1,1,0.8,0.3)', 2);

		//Create the cursor of the game
		cursors = game.input.keyboard.createCursorKeys();

		//Set the timer for the game
		game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
		game.add.existing(this.player);

		
	},

	update: function() {
		score = this.player.score;

		//Set a win condition to the game
		if(this.realTime <= 0){
			//After collect all stars, jump to game over state

			game.state.start('GameOver');
		}

		//Play baddies' animation
		// baddie1.animations.play('left');
		// baddie2.animations.play('right');

	},
	updateCounter: function(){
		this.realTime--;
		this.times.setText('Time: ' + this.realTime);
	},

	updateScore: function(player,stage){
		this.scoreText.text = 'Score: ' + player.score;
		console.log(player.score);
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

function updateScore(player,stage){
	//Set score for the game
	stage.scoreText = 'Score: ' + player.score;
}


