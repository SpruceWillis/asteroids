var Asteroid = require("./asteroid");
var Ship = require("./ship");
var Bullet = require("./bullet");
var key = require("keymaster");

var DIM_X = 500;
var DIM_Y = 500;
var NUM_ASTEROIDS = 5;

function Game(){
  this.asteroidCount = 0;
  this.objects = [];
  this.ship = new Ship([DIM_X/2, DIM_Y/2]);
  this.objects.push(this.ship);
  this.addAsteroids();
  this.toRemove = [];
  this.bindKeyHandlers();
}

Game.prototype.randomPosition = function () {
  return [Math.random()*DIM_X, Math.random()*DIM_Y];
};

Game.prototype.addAsteroid = function (pos) {
  pos = pos || this.randomPosition();
  var asteroid = new Asteroid(pos);

  while(this.objects.some(function(obj){
    return asteroid.isCollidedWith(obj);
  })){

  pos = this.randomPosition();
  asteroid = new Asteroid(pos);

}

  this.objects.push(asteroid);
  ++this.asteroidCount;
};

Game.prototype.addAsteroids = function(){
  var asteroids = [];
  for(var i = 0; i < NUM_ASTEROIDS; i++){
    this.addAsteroid();
  }
};

Game.prototype.draw = function (ctx) {
  this.objects.forEach(function(object){
    object.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  var self = this;
  this.objects.forEach(function(asteroid){
    asteroid.move(self);
    asteroid.pos = self.wrap(asteroid.pos);
  });
};

Game.prototype.checkCollisions = function(){
  var objects = this.objects;
  for(var i = 0; i < objects.length; i++){
    for (var j = 0; j < objects.length; j++){
      if (i !== j && objects[i].isCollidedWith(objects[j])){
        objects[i].collidedWith(this, objects[j]);
      }
    }
  }
};

Game.prototype.remove = function(object){
    this.toRemove.push(object);
};

Game.prototype.update = function (ctx) {
  this.moveObjects();
  this.draw(ctx);
  this.checkCollisions();
  this.removeObjects();
};

Game.prototype.removeObjects = function () {
  var self = this;
  this.toRemove.forEach(function(object){
    var ind = self.objects.indexOf(object);
    self.objects.splice(ind, 1);
  });
  this.toRemove = [];
};

Game.prototype.wrap = function (pos) {
  var x = pos[0];
  var y = pos[1];
  if (x > DIM_X){
    x = x % DIM_X;
  } else if (x < 0) {
    x += DIM_X;
  }
  if (y > DIM_X){
    y = y % DIM_X;
  } else if (y < 0) {
    y += DIM_X;
  }

  return [x,y];
};

Game.prototype.bindKeyHandlers = function () {
  // console.log(Key);
  var self = this;
  key('up', function(){
    self.ship.power();
  });

  key('right', function(){
    self.ship.rotate(1);
  });

  key('left', function(){
    self.ship.rotate(-1);
  });

  key('space', function(){
    self.objects.push(self.ship.fire());
  });
};

module.exports = Game;
