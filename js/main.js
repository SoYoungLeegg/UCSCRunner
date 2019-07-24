var game;
var scoreText;
var baddie1;
var baddie2;
var music;
var score;
var startButton;
var scoreButton;
var bgMusic;

window.onload = function() {
	game = new Phaser.Game(800, 600, Phaser.AUTO,);
	game.state.add('Boot', Boot);
	game.state.add('MainMenu', MainMenu);
	game.state.add('Play', Play);
	game.state.add('GameOver', GameOver);
	game.state.add('GameWin', GameWin);
	game.state.add('ScoreBoard', ScoreBoard);
	game.state.add('Load', Load);
	game.state.start('Boot');

}

var Load = function(game) {};
var MainMenu = function(game){};
var Play = function(game){};
var GameOver = function(game){};
var GameWin = function(game){};
var ScoreBoard = function(game){};

function preload(){}
function create(){}
function update(){}



