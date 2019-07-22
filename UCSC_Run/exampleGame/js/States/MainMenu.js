//Following is the main menu state
// //Main menu state will only appear when player enter the game for first time
MainMenu.prototype = {
	preload: function(){
		game.stage.backgroundColor = "#87CEEB";

	},
	create: function(){
		//Add a short intro for the game
		/* var menuText = game.add.text(16, 16, 'Start Catch Game\nUse Arrow Key To Move\nPress [Space] to Start', {fontSize: '32px', fill: '#000'}); */

		//Create restart button
		startButton = game.add.button(325, 400, 'startbutton', actionStartClick, this, 2, 1, 0).scale.setTo(0.5,0.5);
		scoreButton = game.add.button(325, 450, 'scorebutton', actionScoreClick, this, 2, 1, 0).scale.setTo(0.5,0.5);
		this.title = game.add.sprite(400, 250, 'title');
		this.title.anchor.set(0.5);
		this.title.scale.setTo(0.25,0.25);
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
	//game.state.start('GameOver');
	game.state.start('ScoreBoard');
}