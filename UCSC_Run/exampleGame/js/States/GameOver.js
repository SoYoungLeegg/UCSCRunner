//Game over State
//Player can retry the game by pressing space bar
GameOver.prototype = {
	preload: function(){
		game.stage.backgroundColor = "#ffffff";
		game.load.image('gameover', 'assets/img/gameovertitle.png');
		game.load.image('submitform', 'assets/img/submitform.png');
		game.load.image('submitbutton', 'assets/img/button/submitbutton.png');
		game.load.image('restartbutton', 'assets/img/button/restartbutton.png');
	},
	create: function(){
		/* tmp initialize score for debug */
		score = 0;
		/* should be deleted */
		/*var menuText = game.add.text(16, 16, 'GameOver\nYour Score is ' + score + '\nPress [Space] to Retry', {fontSize: '32px', fill: '#000'});*/
		var tmp = game.cache.getImage('gameover');
		var title = game.add.sprite(game.world.centerX - tmp.width/2.0, game.world.centerY * 0.3, 'gameover');
		var text = game.add.text(320, 200, 'Your Score is ' + score);
		var text2 = game.add.text(320, 260, 'Your name: ' );
		var tmp2 = game.cache.getImage('submitform');
		var submitForm = game.add.sprite(game.world.centerX - tmp2.width/2.0, game.world.centerY, 'submitform').scale.setTo(0.7,0.7);
		
		var submitButton = game.add.button(325, 350, 'submitbutton', actionSubmitClick, this, 2, 1, 0).scale.setTo(0.7,0.7);
		var restartButton = game.add.button(325, 400, 'restartbutton', actionRestartClick, this, 2, 1, 0).scale.setTo(0.7,0.7);
	},
	update: function(){
		score = 0;
	}

}

function actionSubmitClick () {
	game.state.start('ScoreBoard');
}

function actionRestartClick () {
	game.state.start('Play');
}