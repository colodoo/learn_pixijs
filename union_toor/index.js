var app = new PIXI.Application({
  width: MAP_WIDTH,         // default: 800
  height: MAP_HEIGHT,        // default: 600
  antialias: true,    // default: false
  transparent: false, // default: false
  resolution: 1,       // default: 1
  backgroundColor: 0xFFFFFF
});

document.body.appendChild(app.view);
var stage = app.stage;

var Graphics = PIXI.Graphics,
  Sprite = PIXI.Sprite,
  AnimatedSprite = PIXI.extras.AnimatedSprite,
  Container = PIXI.Container;

// 被遮罩的精灵
var background = new Graphics();
background.beginFill(0x333333);
background.drawRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
background.endFill();
app.stage.addChild(background);
// 遮罩精灵
var maskSprite = PIXI.RenderTexture.create(app.screen.width, app.screen.height);
var mask = new Sprite(maskSprite);

// 打开遮罩对象矩形
var brush = new Graphics();
brush.beginFill(0xffffff);
brush.drawRect(0, 0, 60, 60);
brush.endFill();
brush = new Sprite(brush.generateCanvasTexture(PIXI.settings.SCALE_MODE, 1));
brush.anchor.set(0.5, 0.5);

var currMap = {
  x: 0,
  y: 0
}; // 当前地图下标
var circle = null; // 圈
PIXI.loader.add("./res/DungeonTileset.json").load(setup);

function setup () {
  // 地图组 8x8
  var maps = [];

  // 地图 16x16
  var map = [["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"]];

  var mapsContainer = new Container();
  // 初始化所有地图
  var num = 0;
  for (var y = 0; y < 8; y++) {
    var row = [];
    for (var x = 0; x < 8; x++) {
      var temp = new Map(map);
      num++;
      var text = new PIXI.Text(num, {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xff1010,
        align: 'center'
      });
      temp.addChild(text);
      temp.x = x * MAP_WIDTH;
      temp.y = y * MAP_HEIGHT;
      mapsContainer.addChild(temp);
      row.push(temp);
    }
    maps.push(row);
  }

  app.stage.addChild(mapsContainer);
  // 设置遮罩对象
  mapsContainer.mask = mask;

  // 根据地图移动,修改所有地图的坐标
  // 根据数字切换地图
  function changeMap (num) {

    // 当前对象
    var currX = currMap.x;
    var currY = currMap.y;

    // 目标对象
    var targetY = parseInt(num / 8);
    var targetX = num % 8 - 1;
    if (num % 8 === 0) {
      targetY--;
      targetX = 7;
    }
    var tmp = maps[targetY][targetX];

    tmp.visible = true;

    var children = app.stage.children;
    for (let i = 0; i < children.length; i++) {
      var item = children[i];
      item.y += (currY - targetY) * MAP_WIDTH;
      item.x += (currX - targetX) * MAP_HEIGHT;
    }

    currMap.x = targetX;
    currMap.y = targetY;
  }

  /* var rocker = new Container();
  rocker.x = 0;
  rocker.y = 0;
  var rockerBody = new Graphics();
  rockerBody.beginFill(0xffffff);
  rockerBody.drawCircle(60, 200, 50);
  rockerBody.endFill();
  rockerBody.alpha = 0.3;

  var rockerInner = new Graphics();
  rockerInner.beginFill(0xffffff);
  rockerInner.drawCircle(60, 200, 25);
  rockerInner.endFill();
  rockerInner.alpha = 0.8;

  var point = new Graphics();
  point.beginFill(0x666666);
  point.drawCircle(0, 0, 10);
  point.endFill();
  point.alpha = 1;
  point.visible = false;

  rocker.addChild(rockerBody);
  rocker.addChild(rockerInner);
  rocker.addChild(point);

  rocker.interactive = true;
  rocker.on('pointerdown', pointerDown);
  rocker.on('pointerup', pointerUp);
  rocker.on('pointermove', pointerMove);
  app.stage.addChild(rocker); 

  var dragging = false;

  function pointerMove (event) {
    if (dragging) {
      point.visible = true;
      point.position.copy(event.data.global);
      player.x += 1;
      var position = player.position;
      brush.position.copy(position);
      app.renderer.render(brush, maskSprite, true, null, false);
    }
  }

  function pointerDown (event) {
    dragging = true;
    pointerMove(event);
  }

  function pointerUp (event) {
    dragging = false;
    point.visible = false;
  }
  */

  changeMap(1);

  // 站立
  var frames = [];
  // 跑动
  var runFrames = [];
  // 打击
  var hitFrames = [];

  for (var i = 0; i < 4; i++) {
    var val = i;
    frames.push(PIXI.Texture.fromFrame('elf_m_idle_anim_f' + val + '.png'));
    runFrames.push(PIXI.Texture.fromFrame('elf_m_run_anim_f' + val + '.png'));
  }
  hitFrames.push(PIXI.Texture.fromFrame('elf_m_hit_anim_f0.png'))

  var player = new Player({
    "idle": frames,
    "run": runFrames,
    "hit": hitFrames
  });

  // player.playAnimate("run");
  // player.playAnimate("hit");
  player.playAnimate("idle");
  player.x = 50;
  player.y = 50;

  app.stage.addChild(player);

  // 初始化遮罩位置
  brush.position.copy(player.position);
  app.renderer.render(brush, maskSprite, true, null, false);

  //Capture the keyboard arrow keys
  let left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

  //Left arrow key `press` method
  left.press = () => {
    //Change the cat's velocity when the key is pressed
    player.playAnimate("run");
    player.scale.x = -1;
    player.vx = -1;
    player.vy = 0;
  };

  //Left arrow key `release` method
  left.release = () => {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the cat isn't moving vertically:
    //Stop the cat
    if (!right.isDown && player.vy === 0) {
      player.vx = 0;
    }
  };

  //Up
  up.press = () => {
    player.playAnimate("run");
    player.vy = -1;
    player.vx = 0;
  };
  up.release = () => {
    if (!down.isDown && player.vx === 0) {
      player.vy = 0;
    }
  };

  //Right
  right.press = () => {
    player.playAnimate("run");
    player.scale.x = 1;
    player.vx = 1;
    player.vy = 0;
  };
  right.release = () => {
    if (!left.isDown && player.vy === 0) {
      player.vx = 0;
    }
  };

  //Down
  down.press = () => {
    player.playAnimate("run");
    player.vy = 1;
    player.vx = 0;
  };
  down.release = () => {
    if (!up.isDown && player.vx === 0) {
      player.vy = 0;
    }
  };

  circle = new Graphics();
  circle.beginFill(0x666666);
  circle.drawCircle(350, 200, 200);
  circle.endFill();
  circle.alpha = 0.5;
  app.stage.addChild(circle);

  app.ticker.add(delta => gameLoop(delta));

  // Game loop
  function gameLoop (delta) {
    //Use the cat's velocity to make it move
    if (!down.isDown && !left.isDown && !right.isDown && !up.isDown && player.currAnimate != "idle") {
      player.playAnimate("idle");
    }
    player.x += player.vx;
    player.y += player.vy;
    brush.position.copy(player.position);
    app.renderer.render(brush, maskSprite, true, null, false);
  }

}