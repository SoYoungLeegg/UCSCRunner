//Score board state

ScoreBoard.prototype = {
	preload: function(){
		//game.stage.backgroundColor = "#ffffff";

        game.load.image('porterBackground', 'assets/img/Porter1_image.png');
		game.stage.setBackgroundColor('#87CEEB');
		game.load.image('score', 'assets/img/scoretitle.png');
    	game.load.image('scorecell', 'assets/img/scorecell.png');
		game.load.image('restartbutton', 'assets/img/button/restartbutton.png');
		game.load.image('rank','assets/img/rank.png' )
	},
	create: function(){
        var background = this.add.sprite(0,0,'porterBackground');
        background.scale.setTo(0.55, 0.55);
        //game.add.tileSprite(0, 0, 1000, 600, 'porterBackground');
		var title = game.add.sprite(250, 100, 'score');
		
		/* var submitForm = game.add.sprite(210, 200, 'scorecell').scale.setTo(0.5,0.5); */

		var restartButton = game.add.button(320, 500, 'restartbutton', actionRestartClick, this, 2, 1, 0).scale.setTo(0.7,0.7);
		
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
				/*game.add.sprite(x, 200 + i * 50, 'scorecell').scale.setTo(0.5,0.5);
				game.add.text(x + 15, 205 + i * 50, ret[i].name);
				game.add.text(500, 205 + i * 50, ret[i].score);*/
				var style = { font: "bold 23px Arial", boundsAlignH: "center", boundsAlignV: "middle" };
				var rankBox = game.make.sprite(0, i*60 , 'rank');
				var rankText = game.make.text(0,0, i + 1, style);
				// centering rank number in the rank box
				rankText.setTextBounds(0, i * 60, 48, 48);
				var sprite1 = game.make.sprite(60, i * 60, 'scorecell');
				var text1 = game.make.text(90, 10 + i * 60, ret[i].name);
				var text2 = game.make.text(320, 10 + i * 60, ret[i].score);
				scroller.addChild(rankBox);
				scroller.addChild(rankText);
				scroller.addChild(sprite1);
				scroller.addChild(text1);
				scroller.addChild(text2);
				
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
