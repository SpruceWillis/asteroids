var MovingObject = require ("./movingObject");
var Util = require ("./util");
var Bullet = require("./bullet");

var SHIP_RADIUS = 10;
var SHIP_THRUST = .5;
var ANGLE_STEP = .15;

function Ship(position){
  var options = {
    pos: position,
    vel: [0,0],
    radius: SHIP_RADIUS,
    color: "blue"
  };
  this.angle = 0;

  MovingObject.call(this, options);
}


Util.prototype.inherit(MovingObject, Ship);

Ship.prototype.collidedWith = function (game, otherObj) {
  this.pos = game.randomPosition();
  this.vel = [0,0];
};

Ship.prototype.move = function () {
  this.vel[0] -= .01 * this.vel[0];
  this.vel[1] -= .01 * this.vel[1];
  MovingObject.prototype.move.call(this);
};

Ship.prototype.power = function(){
  var xThrust = SHIP_THRUST * Math.cos(this.angle);
  var yThrust = SHIP_THRUST * Math.sin(this.angle);
  this.vel[0] += xThrust;
  this.vel[1] += yThrust;
};

Ship.prototype.rotate = function (dir) {
  this.angle += dir*ANGLE_STEP;

};

Ship.prototype.fire = function () {
  var x = this.pos[0] + (Math.cos(this.angle) * (7+this.radius));
  var y = this.pos[1] + (Math.sin(this.angle) * (7+this.radius));

  var xvel  = Math.cos(this.angle)* Bullet.SPEED;
  var yvel  = Math.sin(this.angle)* Bullet.SPEED;

  return new Bullet([x,y], [xvel,yvel]);
};

Ship.prototype.draw = function (ctx) {

  ctx.fillStyle = this.color;
  ctx.beginPath();
  var x = this.pos[0] + (Math.cos(this.angle) * this.radius);
  var y = this.pos[1] + (Math.sin(this.angle) * this.radius);
  ctx.moveTo(x,y);
  x = this.pos[0] + (Math.cos(this.angle + Math.PI * 2.5/3) * this.radius);
  y = this.pos[1] + (Math.sin(this.angle + Math.PI * 2.5/3) * this.radius);
  ctx.lineTo(x,y);
  x = this.pos[0] + (Math.cos(this.angle - Math.PI * 2.5/3) * this.radius);
  y = this.pos[1] + (Math.sin(this.angle - Math.PI * 2.5/3) * this.radius);
  ctx.lineTo(x,y);
  ctx.closePath();
  ctx.fill();
};

module.exports = Ship;
