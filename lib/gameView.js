var Game = require("./game");

var GameView = function(ctx){
  this.game = new Game();
  this.ctx = ctx;
};

GameView.prototype.start = function () {
  var self = this;
  setInterval(function(){
    self.ctx.clearRect(0,0, 500, 500);
    self.game.update(self.ctx);
  }, 20);
};

// window.GameView = GameView;

module.exports = GameView;

//
// var canvas = document.getElementById("game-canvas");
// var context = canvas.getContext("2d");
// var view = new GameView(context); //GameView Undefined!!!!
// view.start();
