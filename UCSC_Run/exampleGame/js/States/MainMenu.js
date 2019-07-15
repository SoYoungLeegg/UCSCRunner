//Following is the main menu state
// //Main menu state will only appear when player enter the game for first time
MainMenu.prototype = {
	preload: function(){
		game.load.image('sky', 'assets/img/sky.png');
		game.load.image('ground', 'assets/img/platform.png');
		game.load.image('star', 'assets/img/star.png');
		game.load.image('diamond', 'assets/img/diamond.png');
		game.load.image('snowFlake', 'assets/img/snowflake.png');
		game.load.image('busStop', 'assets/img/busStop.png');
		game.load.spritesheet('slug', 'assets/img/slugs.png',32,48);
		game.load.spritesheet('dude', 'assets/img/dude.png',32,48);
		game.load.spritesheet('baddie', 'assets/img/baddie.png',32,32);
		game.load.tilemap('stage0', 'assets/TileMap/stage0.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tile', 'assets/img/TileSet.png');
		game.load.image('dormA', 'assets/img/DormA.png');
		game.load.audio('pop', 'assets/audio/pop.ogg');
		game.load.image('startbutton', 'assets/img/button/startbutton.png');
		game.load.image('scorebutton', 'assets/img/button/scorebutton.png');
		game.load.image('building', 'assets/img/Building.png');
		game.load.image('dBuilding', 'assets/img/doubleBuilding.png');
		game.load.image('squiggle', 'assets/img/Squiggle.png');
		game.stage.backgroundColor = "#facade";

	},
	create: function(){
		//Add a short intro for the game
		/* var menuText = game.add.text(16, 16, 'Start Catch Game\nUse Arrow Key To Move\nPress [Space] to Start', {fontSize: '32px', fill: '#000'}); */

		//Create restart button
		startButton = game.add.button(325, 400, 'startbutton', actionStartClick, this, 2, 1, 0).scale.setTo(0.5,0.5);
		scoreButton = game.add.button(325, 450, 'scorebutton', actionScoreClick, this, 2, 1, 0).scale.setTo(0.5,0.5);
		//button.fixedToCamera = true;
    	//button.cameraOffset.setTo(300, 100);
	},
	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			//Press the space to start the play state
			game.state.start('Play');
		}
	}
}

function actionStartClick () {
	game.state.start('Play');
}

function actionScoreClick () {
	game.state.start('GameOver');
}