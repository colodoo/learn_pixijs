// 玩家对象
var Player = function (animateMap) {

  var frames = animateMap["idle"];
  this.currAnimate = "idle";
  var obj = new AnimatedSprite(frames);

  obj.animateMap = animateMap;
  obj.animationSpeed = 0.1;
  obj.anchor.set(0.5);
  obj.vx = 0;
  obj.vy = 0;

  obj.playAnimate = function (name) {
    this.textures = this.animateMap[name];
    this.play();
    this.currAnimate = name;
  }

  return obj;

}