function Dorm(game, x, y, key, frame, player) {
	Phaser.Sprite.call(this,game,x,y,key,frame);
	this.anchor.set(0.5);
	game.physics.enable(this);
	this.scale.setTo(1.25,1.25);
	this.body.setSize(700,510,90,275);

	this.jumpCondition = 0;
	this.player = player;
	this.fadeCondition = 0;
}

Dorm.prototype = Object.create(Phaser.Sprite.prototype);
Dorm.prototype.constructor = Dorm;

Dorm.prototype.update = function(){

	if(this.alpha < 1 && this.fadeCondition == 0){
		this.alpha += 0.05;
	}
	this.fadeCondition = 0;
	game.physics.arcade.overlap(this, this.player, this.fadeOut, null, this);

}
Dorm.prototype.fadeOut = function(){
	if(this.alpha > 0){
		this.alpha -= 0.05;
	}
	this.fadeCondition = 1;
}