var MovingObject = require("./movingObject");
var Util = require("./util");

var BULLET_RADIUS = 5;
var RANGE = 300;
Bullet.SPEED = 3.5;

function Bullet (pos, vel){
  var options = {
    pos: pos,
    vel: vel,
    color: "red",
    radius: BULLET_RADIUS
  };
  this.distance = 0;
  MovingObject.call(this, options);
}

Util.prototype.inherit(MovingObject, Bullet);

Bullet.prototype.move = function (game) {
  console.log("whiz!");
  this.distance += Bullet.SPEED;
  if (this.distance > RANGE){
    game.remove(this);
  }
  MovingObject.prototype.move.call(this);
};

Bullet.prototype.draw = function (ctx) {

  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

module.exports = Bullet;
