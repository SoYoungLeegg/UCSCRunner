//Game over State
//Player can retry the game by pressing space bar
var input;
GameOver.prototype = {

	preload: function(){
		game.load.image('porterBackground', 'assets/img/Porter1_image.png');
		game.load.image('gameover', 'assets/img/gameovertitle.png');
		game.load.image('submitform', 'assets/img/submitform.png');
		game.load.image('submitbutton', 'assets/img/button/submitbutton.png');
		game.load.image('restartbutton', 'assets/img/button/restartbutton.png');
		game.add.plugin(PhaserInput.Plugin);
	},
	create: function(){
		bgMusic.stop();

		var background = this.add.sprite(0,0,'porterBackground');
		background.scale.setTo(0.55, 0.55);
		background.tint = 1.2 * 0xffffff;
		
		var title = game.add.sprite(215, 100, 'gameover');
		var text = game.add.text(280, 200, 'Your Score is ' + score).addColor("#ffffff", 0); 
		var text2 = game.add.text(320, 260, 'Your name: ' ).addColor("#ffffff", 0); 
		
		
		var submitForm = game.add.sprite(235, 300, 'submitform').scale.setTo(0.9,0.9);

		input = game.add.inputField(285, 305, {
			font: '17px Arial',
			fill: '#000000',
			fontWeight: 'bold',
			width: 200,
			height: 10,
			padding: 8,
			borderWidth: 1,
			borderColor: '#ffffff',
			borderRadius: 6,
			placeHolder: '',
			max: 12,
		});
		
		var submitButton = game.add.button(325, 360, 'submitbutton', actionSubmitClick, this, 2, 1, 0).scale.setTo(0.7,0.7);

		var restartButton = game.add.button(315, 410, 'restartbutton', actionRestartClick, this, 2, 1, 0).scale.setTo(0.7,0.7);
	},
	update: function(){
		// nothing
	}

}

function actionSubmitClick () {
	console.log(input.value);
	savePlayerScore(input.value, score);
	game.state.start('ScoreBoard');
}

function actionRestartClick () {
	game.state.start('Play');
	score = 0;
}
