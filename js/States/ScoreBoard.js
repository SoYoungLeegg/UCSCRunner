//Score board state

ScoreBoard.prototype = {
	preload: function(){
		game.load.image('porterBackground', 'assets/img/Porter1_image.png');
		game.stage.setBackgroundColor('#87CEEB');
		game.load.image('score', 'assets/img/scoretitle.png');
		game.load.image('scorecell', 'assets/img/scorecell.png');
		game.load.image('restartbutton', 'assets/img/button/restartbutton.png');
		game.load.image('rank','assets/img/rank.png' );
		game.load.image('scrollArrow', 'assets/img/scrollArrow.png');
	},
	create: function(){
		var background = this.add.sprite(0,0,'porterBackground');
		background.scale.setTo(0.55, 0.55);
		//background.tint = 1.2 * 0xffffff;

		var title = game.add.sprite(250, 100, 'score');
		var restartButton = game.add.button(320, 500, 'restartbutton', actionRestartClick, this, 2, 1, 0).scale.setTo(0.7,0.7);
		var scrollArrow = game.add.sprite(600,260, 'scrollArrow' ).scale.setTo(0.5,0.5);;
		
		var x = 165;
		var y = 200;
		var w = 800;
		var h = 250;

		var scroller = game.add.existing(new ScrollableArea(x, y, w, h, {verticalScroll: true, horizontalScroll: false, kineticMovement: false}));

		/* get value from pormise, make score cell with text */
		var scorePromise = getTopPlayers(100)
		.then(function(ret){
			console.log("===Top Players===\n", ret);
			var i;
			for(i = 0; i < ret.length; i++) 
			{
				var style = { font: "bold 23px Arial", boundsAlignH: "center", boundsAlignV: "middle" };
				var rankBox = game.make.sprite(0, i*60 , 'rank');
				var rankText = game.make.text(0,0, i + 1, style);
				// centering rank number in the rank box
				rankText.setTextBounds(0, i * 60, 48, 48);
				var scoreCell = game.make.sprite(60, i * 60, 'scorecell');
				var nameText = game.make.text(90, 10 + i * 60, ret[i].name);
				var scoreText = game.make.text(320, 10 + i * 60, ret[i].score);
				scroller.addChild(rankBox);
				scroller.addChild(rankText);
				scroller.addChild(scoreCell);
				scroller.addChild(nameText);
				scroller.addChild(scoreText);
			}
		})
		.catch(function(error) {
			console.log("Error: failing to get data");
		});;
		scroller.start();
	},
	update: function(){
		//nothing
	}

}

function actionRestartClick () {
	game.state.start('Play');
}
