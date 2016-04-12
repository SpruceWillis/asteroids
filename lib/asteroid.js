var MovingObject = require ("./movingObject");
var Util = require ("./util");

var ASTEROID_RADIUS = 35;

function Asteroid(position){
  // var x = (Math.random()-.5)*2*3;
  // var y = (Math.random()-.5)*2*3;
  var options = {
    pos: position,
    vel: this.randomVelocity(5),
    radius: ASTEROID_RADIUS,
    color: "red"
  };

  MovingObject.call(this, options);
}

Util.prototype.inherit(MovingObject, Asteroid);

Asteroid.prototype.randomVelocity = function (max) {
  var x = (Math.random()-.5)*2*max;
  var y = (Math.random()-.5)*2*max;
  return [x,y];
};

Asteroid.prototype.collidedWith = function (game, otherObj) {
  if (otherObj instanceof Asteroid){
    this.vel[0] *= -1;
    this.vel[1] *= -1;
  } else {
    game.remove(this);
  }
};

module.exports = Asteroid;
