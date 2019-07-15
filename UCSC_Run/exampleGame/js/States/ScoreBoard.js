//Score board state

ScoreBoard.prototype = {
	preload: function(){
		game.stage.backgroundColor = "#ffffff";
		game.load.image('score', 'assets/img/scoretitle.png');
		game.load.image('scorecell', 'assets/img/scorecell.png');
		game.load.image('restartbutton', 'assets/img/button/restartbutton.png');
		
	},
	create: function(){
		
		var title = game.add.sprite(250, 100, 'score');
		
		/* var submitForm = game.add.sprite(210, 200, 'scorecell').scale.setTo(0.5,0.5); */

		var restartButton = game.add.button(320, 500, 'restartbutton', actionRestartClick, this, 2, 1, 0).scale.setTo(0.7,0.7);
		
		
		/* get value from pormise, make score cell with text */
		var scorePromise = getTopPlayers(5)
		.then(function(ret){
			console.log("===Top Players===\n", ret);
			var i;
			for(i = 0; i < ret.length; i++) 
			{
				game.add.sprite(205, 200 + i * 50, 'scorecell').scale.setTo(0.5,0.5);
				game.add.text(220, 205 + i * 50, ret[i].name);
				game.add.text(500, 205 + i * 50, ret[i].score);
			}
			
		})
		.catch(function(error) {
			console.log("Error: failing to get data");
		});;
		
	},
	update: function(){
		//nothing
	}

}

function actionRestartClick () {
	game.state.start('Play');
}