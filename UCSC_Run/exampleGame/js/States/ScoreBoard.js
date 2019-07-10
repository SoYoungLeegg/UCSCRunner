//Score board state

ScoreBoard.prototype = {
	preload: function(){
		game.stage.backgroundColor = "#ffffff";
		game.load.image('score', 'assets/img/scoretitle.png');
		game.load.image('scorecell', 'assets/img/scorecell.png');
		game.load.image('restartbutton', 'assets/img/button/restartbutton.png');
	},
	create: function(){

		var title = game.add.sprite(280, 100, 'score');
		var submitForm = game.add.sprite(280, 300, 'scorecell').scale.setTo(1,1);

		var restartButton = game.add.button(325, 400, 'restartbutton', actionRestartClick, this, 2, 1, 0).scale.setTo(0.7,0.7);
	},
	update: function(){
		score = 0;
		
	}

}

function actionRestartClick () {
	game.state.start('Play');
}