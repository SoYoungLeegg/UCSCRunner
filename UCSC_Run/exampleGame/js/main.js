var game;
var scoreText;
var baddie1;
var baddie2;
var music;
var startButton;
var scoreButton;

window.onload = function() {
	game = new Phaser.Game(800, 600, Phaser.AUTO,);
	game.state.add('MainMenu', MainMenu);
	game.state.add('Play', Play);
	game.state.add('GameOver', GameOver);
	game.state.add('ScoreBoard', ScoreBoard);
	game.state.start('MainMenu');
}
var MainMenu = function(game){};
var Play = function(game){};
var GameOver = function(game){};
var ScoreBoard = function(game){};

function preload(){}
function create(){}
function update(){}



