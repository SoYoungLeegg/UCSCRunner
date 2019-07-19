Load.prototype = {
	preload: function(){
		var loadingBar = this.add.sprite(game.width/2, game.height/2, 'loading');
		loadingBar.anchor.set(0.5);
		game.load.setPreloadSprite(loadingBar);
		game.load.image('sky', 'assets/img/sky.png');
		game.load.image('ground', 'assets/img/platform.png');
		game.load.image('star', 'assets/img/star.png');
		game.load.image('diamond', 'assets/img/diamond.png');
		game.load.image('snowFlake', 'assets/img/snowflake.png');
		game.load.image('busStop', 'assets/img/busStop.png');
		game.load.spritesheet('bee', 'assets/img/bee.png', 41,32);
		game.load.spritesheet('slug', 'assets/img/slugs.png',32,48);
		game.load.spritesheet('dude', 'assets/img/dude.png',32,48);
		game.load.spritesheet('baddie', 'assets/img/baddie.png',32,32);
		game.load.tilemap('stage0', 'assets/TileMap/stage0.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tile', 'assets/img/TileSet.png');
		game.load.image('dormA', 'assets/img/DormA.png');
		game.load.audio('pop', 'assets/audio/pop.ogg');
		game.load.audio('finish', 'assets/audio/finish.wav');
		game.load.image('diningHall', 'assets/img/diningHall.png');
		game.load.image('startbutton', 'assets/img/button/startbutton.png');
		game.load.image('scorebutton', 'assets/img/button/scorebutton.png');
		game.load.image('building', 'assets/img/Building.png');
		game.load.image('dBuilding', 'assets/img/doubleBuilding.png');
		game.load.image('squiggle', 'assets/img/Squiggle.png');
		game.load.atlas('portal', 'assets/img/portal.png','assets/img/portal.json');
		game.stage.backgroundColor = "#facade";

        game.load.image('pizza', 'assets/img/Pizza.png');
        game.load.image('icecream', 'assets/img/IceCream.png');
        game.load.image('movebg', 'assets/img/BackGround_Clouds.png');
        game.load.audio('goodPickUp', 'assets/audio/GoodPickUp.wav');
        game.load.audio('badPickUp', 'assets/audio/BadPickUp.wav');
	},
	create: function(){
		game.state.start('MainMenu');
	}
}
