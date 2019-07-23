//Following is the main menu state
// //Main menu state will only appear when player enter the game for first time
MainMenu.prototype = {
	preload: function(){
		game.stage.backgroundColor = "#87CEEB";
		game.load.image('porterBackground', 'assets/img/Porter1_image.png');
	},
	create: function(){
		//Add a short intro for the game
		var background = this.add.sprite(0,0,'porterBackground');
		background.scale.setTo(0.55, 0.55);
		background.tint = 1.2 * 0xffffff;

		//title
		this.title = game.add.sprite(410, 250, 'title');
		this.title.anchor.set(0.5);
		this.title.scale.setTo(0.25,0.25);

		//Create start & score button
		startButton = game.add.button(325, 400, 'startbutton', actionStartClick, this, 2, 1, 0).scale.setTo(0.5,0.5);
		scoreButton = game.add.button(325, 450, 'scorebutton', actionScoreClick, this, 2, 1, 0).scale.setTo(0.5,0.5);
		
		
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