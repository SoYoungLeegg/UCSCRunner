//Here is the play state, all the update function are implement in this state
//If player collect all the scores or touch the baddies, jump to Game Over state
Play.prototype = {
	init: function() {
	fallingHeight = 2200;
	loadingDone = false; // variable to check if the loading is done
	}, 
	preload: function() {
		game.load.image('busStop', 'assets/img/busStop.png');
		game.load.image('slugBoi', 'assets/img/slugs.png');
	},
	create: function() {
		//This line enable the Arcade Physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//Set the tilemap of the game
		game.stage.setBackgroundColor('#000000');
		this.map = game.add.tilemap('stage0');
		this.map.addTilesetImage('common', 'tile');

		// Progress bar
		var loadingBar = this.add.sprite(game.width/2, game.height/2, 'slugBoi');
		loadingBar.anchor.set(0.5);
		console.log(loadingBar.width, loadingBar.height);
		console.log(game.width, game.height);

		//New tilemaplayer object
		this.groundLayer = this.map.createLayer('BackGround');
		this.wallLayer = this.map.createLayer('Collision');
		this.groundLayer.resizeWorld();

		// Rectangle for revealing progress bar
		var progressBox = this.add.graphics();
		progressBox.beginFill(0x000000);
		progressBox.drawRect(0, 0, 800, 600);

		// Fill the progress bar until the setCollisionByExclusion() is started
		setTimeout(function() {
			progressBox.x += 250;
		}, 500)
		setTimeout(function() {
			progressBox.x += 130;
		}, 850)
		setTimeout(function() {
			progressBox.x += 80;
		}, 1200)
		setTimeout(function() {
			progressBox.x += 50;
		}, 1400)
		setTimeout(function() {
			progressBox.x += 20;
		}, 1950)

		// Loading text
		var text = "LOADING ...";
		var style = { font: "24px Arial", fill: "#ffffff", align: "center" };

		var t = game.add.text(game.width/2 - 65, 350, text, style);

		// SetTimeout() to change layer to Stage0 layer, not MainMenu layer
		setTimeout((function() {
			this.map.setCollisionByExclusion([], true, this.wallLayer);
			progressBox.x += 200;

			progressBox.destroy();
			loadingBar.destroy();

			loadingDone = true;
			game.stage.setBackgroundColor('#87CEEB');
			//Add the music to game
			music = game.add.audio('pop');
			bgMusic.play();

			//Create a player and its settings 85
			this.player = new Player(game, 85, 1350, 'slug', 1,this.wallLayer);

			//Set camera for the game
			game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

			//Set Instruction for the game
			this.insText = game.add.text(83, 1300, 'Use the Arrow Keys to Move!\n Achieve a score of 2500 to Activate the Portal!')

			// list of pickups
			// If isGood, goodPickup.wav is played, else, trivial
			var pizzaVal = 150;
			var pizzaGood = true;
			var iceVal = 300;
			var iceGood = true;
			var diaVal = -500;
			var diaGood = false;

			// Second picture
			// 1 hidden coin
			this.pizza = new Pickup(game, 2613, 915, 'pizza', 1,
							this.wallLayer, this.player, this, pizzaVal, pizzaGood);
			game.add.existing(this.pizza);
			// This pizza code is here for generation of sprite before dormitory, to hide!
			//1 hidden diamond in right side cave

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

			//troll muffin to mess with player score
			this.diamond = new Pickup(game, 5950, 1200, 'diamond', 1,
							this.wallLayer, this.player, this, diaVal, diaGood);
			game.add.existing(this.diamond);

			//blocking muffin to make player take other route
			this.diamond = new Pickup(game, 4930, 1200, 'diamond', 1,
							this.wallLayer, this.player, this, diaVal, diaGood);
			game.add.existing(this.diamond);

			//Create the enemy and its setting
			this.baddie1 = new Baddy(game, 200 , 1530, 'bee', 1, this.wallLayer, this.player, this, 150, 300);

			this.baddie2 = new Baddy(game, 1133, 1400, 'bee', 1, this.wallLayer, this.player, this, 1033, 1200);

			this.baddie3 = new Baddy(game, 1233, 1400, 'bee', 1, this.wallLayer, this.player, this, 1100, 1300);

			this.baddie4 = new Baddy(game, 2860,  800, 'bee', 1, this.wallLayer, this.player, this, 2750, 2900);

			this.baddie5 = new Baddy(game, 3060,  800, 'bee', 1, this.wallLayer, this.player, this, 3000, 3150);

			this.baddie6 = new Baddy(game, 2798, 1195, 'bee', 1, this.wallLayer, this.player, this, 2700, 2850);

			this.baddie7 = new Baddy(game, 3100, 1300, 'bee', 1, this.wallLayer, this.player, this, 3088, 3141);

			this.baddie8 = new Baddy(game, 3903, 1490, 'bee', 1, this.wallLayer, this.player, this, 3850, 1530);

			this.baddie10= new Baddy(game, 3700, 1400, 'bee', 1, this.wallLayer, this.player, this, 3600, 3900);

			this.baddie11= new Baddy(game, 4000, 1400, 'bee', 1, this.wallLayer, this.player, this, 3900, 4164);

			this.baddie12= new Baddy(game, 1700, 910, 'bee', 1, this.wallLayer, this.player, this, 1600, 1968);

			this.baddie13= new Baddy(game, 1010, 1580, 'bee', 1, this.wallLayer, this.player, this, 952, 1099);

			this.baddie14= new Baddy(game, 950,  1850, 'bee', 1, this.wallLayer, this.player, this, 910, 1277);

			this.baddie15= new Baddy(game, 300,  1850, 'bee', 1, this.wallLayer, this.player, this, 131, 587);

			game.add.existing(this.baddie1);
			game.add.existing(this.baddie2);
			game.add.existing(this.baddie3);
			game.add.existing(this.baddie4);
			game.add.existing(this.baddie5);
			game.add.existing(this.baddie6);
			game.add.existing(this.baddie7);
			game.add.existing(this.baddie8);
			game.add.existing(this.baddie10);
			game.add.existing(this.baddie11);
			game.add.existing(this.baddie12);
			game.add.existing(this.baddie13);
			game.add.existing(this.baddie14);
			game.add.existing(this.baddie15);
			game.add.existing(this.dormA);

			// First image for reference
			// Single coin on platform
			this.pizza = new Pickup(game, 710, 1341, 'pizza', 1,
							this.wallLayer, this.player, this, pizzaVal, pizzaGood);
			game.add.existing(this.pizza);

			//pizza below the first hard cave
			this.pizza = new Pickup(game, 110, 1835, 'pizza', 1,
							this.wallLayer, this.player, this, pizzaVal, pizzaGood);
			game.add.existing(this.pizza);

			//pizza below the first hard cave
			this.pizza = new Pickup(game, 110, 1875, 'pizza', 1,
							this.wallLayer, this.player, this, pizzaVal, pizzaGood);
			game.add.existing(this.pizza);

			 // 2 diamond in cave to deter people
			this.diamond = new Pickup(game, 220, 1840, 'diamond', 1,
							this.wallLayer, this.player, this, diaVal, diaGood);
			game.add.existing(this.diamond);

			this.diamond = new Pickup(game, 320, 1900, 'diamond', 1,
							this.wallLayer, this.player, this, diaVal, diaGood);
			game.add.existing(this.diamond);

			// 8 coin on platform
			for (var i = 0; i < 2; i++){
				for (var j = 0; j < 4; j++){
					var posX = 830 + 80 * i;
					var posY = 1150 - 70 * j;
					this.pizza = new Pickup(game, posX, posY, 'pizza', 1,
							this.wallLayer, this.player, this, pizzaVal, pizzaGood);
					game.add.existing(this.pizza);
				}
			}

			// 1 diamond on platform
			this.diamond = new Pickup(game, 1200, 960, 'diamond', 1,
							this.wallLayer, this.player, this, diaVal, diaGood);
			game.add.existing(this.diamond);
			// 2 ice creams underground
			this.ice1 = new Pickup(game, 975, 1550, 'icecream', 1,
							this.wallLayer, this.player, this, iceVal, iceGood);
			this.ice2 = new Pickup(game, 1030, 1550, 'icecream', 1,
							this.wallLayer, this.player, this, iceVal, iceGood);
			game.add.existing(this.ice1);
			game.add.existing(this.ice2);
			// 7 consective coins orderd in V shape
			for (var i = 0; i < 7; i++){
				var posX = 1570 + 70 * i;
				var posY = 1350 - 70 * (3 - Math.abs(i - 3));
				this.pizza = new Pickup(game, posX, posY, 'pizza', 1,
								this.wallLayer, this.player, this, pizzaVal, pizzaGood);
				game.add.existing(this.pizza);
			}
			// Second image on reference
			//1 diamond in dorm interior

			// 1 diamond on dormitory
			this.diamond = new Pickup(game, 3450, 810, 'diamond', 1,
								this.wallLayer, this.player, this, diaVal, diaGood);
			game.add.existing(this.diamond);
			//Set the timer for the game
			game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
			game.add.existing(this.player);

			//Remain time of the game
			this.times = game.add.text(16, 16, 'Time: 400');
			this.times.fixedToCamera = true;
			this.realTime = 400;
			this.times.cameraOffset.setTo(650,15);
			this.times.fill = '#ffffff';
			this.times.setShadow(3, 3, 'rgba(1,1,0.8,0.3)', 2);


			//Set score for the game
			this.scoreText = game.add.text(16, 16, 'Score: 0');
			this.scoreText.fixedToCamera = true;
			this.scoreText.cameraOffset.setTo(15,15);
			this.scoreText.fill = '#ffffff';
			this.scoreText.setShadow(3, 3, 'rgba(1,1,0.8,0.3)', 5);

			//Create the cursor of the game
			cursors = game.input.keyboard.createCursorKeys();

		}).bind(this), 2000)
	},
	update: function() {
		if (loadingDone) {
			score = this.player.score;
			//Set a win condition to the game
			if(this.realTime <= 0){
				//After collect all stars, jump to game over state
				game.state.start('GameOver');
			}
		}
	},
	updateCounter: function(){
		if (loadingDone) {
			this.realTime--;
			this.times.setText('Time: ' + this.realTime);
		}
	},
	updateScore: function(player,stage){
		if (loadingDone) {
			this.scoreText.text = 'Score: ' + player.score;
			console.log(player.score);
		}
	}
}
