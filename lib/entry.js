var GameView = require("./gameView");
// var Game = require("./game");
// var Asteroid = require("./asteroid");
// var MovingObject = require("./mo");

var canvas = document.getElementById("game-canvas");
var context = canvas.getContext("2d");
var view = new GameView(context);
view.start();
