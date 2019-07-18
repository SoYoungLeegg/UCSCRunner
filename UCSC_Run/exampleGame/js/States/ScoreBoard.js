//Score board state

ScoreBoard.prototype = {
	preload: function(){
		//game.stage.backgroundColor = "#ffffff";
		game.load.image("background", "assets/img/sky.png");
        game.load.image('score', 'assets/img/scoretitle.png');
		game.load.image('scorecell', 'assets/img/scorecell.png');
		game.load.image('restartbutton', 'assets/img/button/restartbutton.png');
		
	},
	create: function(){
	
        game.add.tileSprite(0, 0, 1000, 600, 'background');
		var title = game.add.sprite(250, 100, 'score');
		
		/* var submitForm = game.add.sprite(210, 200, 'scorecell').scale.setTo(0.5,0.5); */

		var restartButton = game.add.button(320, 500, 'restartbutton', actionRestartClick, this, 2, 1, 0).scale.setTo(0.7,0.7);
		
		var x = 170;
		var y = 200;
		var w = 800;
		var h = 250;

		var scroller = game.add.existing(new ScrollableArea(x, y, w, h, {verticalScroll: true}));
		
		
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
				var sprite1 = game.make.sprite(0, i * 60, 'scorecell');
				var text1 = game.make.text(50, 10 + i * 60, ret[i].name);
				var text2 = game.make.text(330, 10 + i * 60, ret[i].score);
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