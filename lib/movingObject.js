function MovingObject(argObj){
  this.pos = argObj["pos"];
  this.vel = argObj["vel"];
  this.radius = argObj["radius"];
  this.color = argObj["color"];
}

MovingObject.prototype.draw = function (ctx) {

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

MovingObject.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
};

MovingObject.prototype.isCollidedWith = function (otherObj) {
  var dx = this.pos[0] - otherObj.pos[0];
  var dy = this.pos[1] - otherObj.pos[1];
  var dist = Math.sqrt(dx*dx + dy*dy);
  return (dist < this.radius + otherObj.radius);
};

MovingObject.prototype.collidedWith = function (game, otherObj) {
  // game.remove(otherObj);
  game.remove(this);
};

module.exports = MovingObject;
