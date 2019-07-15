//Here is the play state, all the update function are implement in this state
//If player collect all the scores or touch the baddies, jump to Game Over state
var background;
var player;
var lavas;
var baddie1;
var velocity;

Play.prototype = {
	init: function() {
		score = 0;
	    velocity = 0;
    },

	preload: function() {
    },

	create: function() {

		//This line enable the Arcade Physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//Add the music to game
		music = game.add.audio('pop');

		//The platforms group contains the ground and the 2 ledges
		platforms = game.add.group();

		//Enable physics for any object that belongs to the platform
		platforms.enableBody = true;

		//Here is the ground
		var ground = platforms.create(0, game.world.height - 20, 'ground');
		//Scale the ground so that it can fit the width of the game
		// ground.scale.setTo(2, 2);

		//This stops it from falling away when player jump on it;
		ground.body.immovable = true;


		//Create several ledges which players could jump on it
		var ledge = platforms.create(-200, 350, 'ground');
		ledge.body.immovable = true;

		// var ledge = platforms.create(-280, 100, 'ground');
		// ledge.body.immovable = true;

		// var ledge = platforms.create(250, 450, 'ground');
		// ledge.body.immovable = true;

		// var ledge = platforms.create(300, 250, 'ground');
		// ledge.body.immovable = true;


	    //Create a player and its settings
		player = game.add.sprite(32, game.world.height - 150, 'dude');

		//Physics of player
		game.physics.arcade.enable(player);
		player.body.bounce.y = 0.2;
		player.body.gravity.y = 350;
		player.body.collideWorldBounds = true;

		//Player's left and right animation
		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);




		//Create attributes and its settings
		baddies = game.add.group();
        //List maintained for Animation Updates
        var animeBaddieList = [
            ['left', [0, 1], 10, true],
            ['right', [2, 3], 10, true]
        ];
        baddie1 = addElementToGroup(baddies, 100, 317, 'baddie', animeBaddieList);
        baddie2 = addElementToGroup(baddies, 200, 457, 'baddie', animeBaddieList);
        //Enable gravity
        baddie1.body.gravity.y = 50;

        //Give attribute periodical movement
        baddie1DestPointX = baddie1.x + 50;
        baddie1DestPointY = baddie1.y;
        baddie1MovePeriod = 1000;
        //Linear
        baddie1Easing = Phaser.Easing.Linear.None;
        addMovementToPoint(baddie1, baddie1DestPointX, baddie1DestPointY, baddie1MovePeriod,
                baddie1Easing);
        baddie2MovePeriod = 2000;
        //Quadratic
        baddie2Easing = Phaser.Easing.Quadratic.None;
        addMovementToPoint(baddie2, baddie2.x + 50, baddie2.y - 100, baddie2MovePeriod,
                baddie2Easing);

        //Death Condition terrain (lava etc)
        deaths = game.add.group();
        death1 = addElementToGroup(deaths, 110, game.world.height - 10, 'lava', null);
        //Collision allowed for terrain
        death1.body.collideWorldBounds = false;

        //pickups
        stars = game.add.group();
        star1 = addElementToGroup(stars, 100, 0, 'star');
        star1.body.collideWorldBounds = false;
        star1.body.immovable = false;
		star1.body.gravity.y = 100;
        //star1.body.bounce.y = 0.7 + Math.random() * 0.2;
        diamonds = game.add.group();
        diamond1 = addElementToGroup(diamonds, baddie1.x, baddie1.y, 'diamond');
        diamond1.body.collideWorldBounds = false;
        diamond1.body.immovable = false;


        //Score of the game

        scoreText = game.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#000'});

		//Create the cursor of the game
		cursors = game.input.keyboard.createCursorKeys();

	},

	update: function() {

        //for looping background
        background.tilePosition.x += 0.5;

        game.physics.arcade.checkCollision.down = false;

		//Check the physics between player and platform
		game.physics.arcade.collide(player, platforms);

		//Check the physics between stars and platform
		game.physics.arcade.collide(stars, platforms);

		//Check the physics between enemy and platform
		game.physics.arcade.collide(baddies, platforms);

		//Check the overlap status between player and stars
		game.physics.arcade.overlap(player, stars, collectStar, null, this);

		//Check the overlap status between player and diamond
		game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this);

		//Check the overlap status between player and baddies
		game.physics.arcade.overlap(player, baddies, getBaddies, null, this);

        // no collide detection for overlap!
        game.physics.arcade.overlap(player, deaths, inDeath, null, this);

		//Reset the players velocity (movement)
		player.body.velocity.x = 0;

		if(cursors.left.isDown){

			//Move to left
			player.body.velocity.x = -150;
			player.animations.play('left');
		}else if(cursors.right.isDown){

			//Move to right
			player.body.velocity.x = 150;
			player.animations.play('right');
		}else{

			//Stand Still
			player.animations.stop();
			player.frame = 4;
		}

		//Allow the player to jump if they are on the ground
		if(cursors.up.isDown && player.body.touching.down){
			player.body.velocity.y = -350;
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

function addMovementToPoint(element, pointX, pointY, movePeriod, easingModel) {
    game.add.tween(element).to( { x: pointX, y:pointY}, movePeriod,
        easingModel, true, 0, Number.POSITIVE_INFINITY, true);
}

function addElementToGroup(group, posX, posY, image, animeList) {
    //Can be touched in the game
    group.enableBody = true;
    //Add ememy to group
    element = group.create(posX, posY, image);
    //Disable collision with boundary
    element.body.collideWorldBounds = true;
    element.body.immovable = true;
    if(animeList){
        var animeListLength = animeList.length;
        for(var i = 0; i < animeListLength; i++) {
            var name = animeList[i][0];
            var frames = animeList[i][1];
            var frameRate = animeList[i][2];
            var loop = animeList[i][3];
            // Add animation to element
            element.animations.add(name, frames, frameRate, loop);
        }
    }
    return element;
}


function collectStar (player, star) {
    console.log("Collect star");
    //Remove the star from the screen
    star.kill();
    music.play();
    score +=10;
    scoreText.text = 'Score: ' + score;

}
function collectDiamond(player, diamond){
    console.log("Collect Diamond");
	//Remove diamond from the screen
	diamond.kill();
	score += 50;
	scoreText.text = 'Score: ' + score;
}

function getBaddies(player, baddies){

	//Remove baddies from the screen
	baddies.kill();

    score -= 25;
    if(score < 0){
        score = 0;
    }
    //Lose the game, jump to GameOver state
	game.state.start('GameOver');
}

function inDeath(player, deaths){

    console.log("You are dead");

    game.state.start('GameOver');
}

