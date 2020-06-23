var app = new PIXI.Application({
  width: MAP_WIDTH,         // default: 800
  height: MAP_HEIGHT,        // default: 600
  antialias: true,    // default: false
  transparent: false, // default: false
  resolution: 1,       // default: 1
  backgroundColor: 0xFFFFFF
});

let b = new Bump(PIXI);

var GLOBAL_RES = './res/DungeonTileset.json'

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
brush.drawRect(0, 0, BLOCK_WIDTH * 3, BLOCK_HEIGHT * 3);
brush.endFill();
brush = new Sprite(brush.generateCanvasTexture(PIXI.settings.SCALE_MODE, 1));
brush.anchor.set(0.5, 0.5);

var currMap = {
  x: 0,
  y: 0
}; // 当前地图下标
var circle = null; // 圈
PIXI.loader.add(GLOBAL_RES).load(setup);

// 地图组 8x8
var maps = [];

// 地图 16x16
var map = [["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"], ["floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png", "floor_1.png"]];

var goods = ['floor_1.png'];
var mapsContainer = new Container();
var goodsContainer = new Container();
var good = null;

function setup(d) {
  console.log(d)

  // var mapItem = [];
  // var allFrames = d.resources[GLOBAL_RES].data.frames;
  // console.log(allFrames)
  // var i = 0;
  // for (var key in allFrames) {
  //   console.log(key)
  //   mapItem.push(key);
  //   if (i >= 15) {
  //     console.log(mapItem.length)
  //     console.log(mapItem)
  //     map = [mapItem, mapItem, mapItem, mapItem, mapItem, mapItem, mapItem,mapItem,mapItem,mapItem,mapItem,mapItem,mapItem,mapItem,mapItem,mapItem]
  //     break;
  //   }
  //   i++;
  //   console.log(i);
  // }

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

  // 放物体
  for (let index = 0; index < goods.length; index++) {
    const goodId = goods[index];
    good = Sprite.fromImage(goodId);
    console.log(good)
    good.x = BLOCK_WIDTH * 0;
    good.y = BLOCK_HEIGHT * 0;
    goodsContainer.addChild(good);
  }

  app.stage.addChild(goodsContainer);

  // 根据地图移动,修改所有地图的坐标
  // 根据数字切换地图
  function changeMap(num) {

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

  var rocker = new Container();
  rocker.x = 0;
  rocker.y = 0;
  var rockerBody = new Graphics();
  rockerBody.beginFill(0xffffff);
  rockerBody.drawCircle(60, 200, 50);
  rockerBody.endFill();
  rockerBody.alpha = 0.1;

  var rockerInner = new Graphics();
  rockerInner.beginFill(0xffffff);
  rockerInner.drawCircle(60, 200, 25);
  rockerInner.endFill();
  rockerInner.alpha = 0.3;

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
  rocker.on('mousedown', pointerDown);
  rocker.on('mouseup', pointerUp);
  rocker.on('mousemove', pointerMove);

  var dragging = false;
  var downPos = null;
  var movePos = null;
  var upPos = null;

  function pointerDown(event) {
    downPos = {
      x: event.data.originalEvent.clientX,
      y: event.data.originalEvent.clientY
    };
    console.log('downPos' + JSON.stringify(downPos))
    player.playAnimate("run");
    // console.log(event)
    dragging = true;
    // pointerMove(event);
  }

  function pointerMove(event) {
    if (dragging) {
      console.log('downPos' + JSON.stringify(downPos));
      console.log('movePos' + JSON.stringify(movePos));
      movePos = {
        x: event.data.originalEvent.clientX,
        y: event.data.originalEvent.clientY
      };
      var canMove = (movePos.x != downPos.x) || (movePos.y != downPos.y)
      console.log('canMove: ' + canMove)
      if (canMove) {
        console.log(event)
        console.log(downPos.x)
        console.log(movePos.x)
        point.visible = true;
        point.position.copy(event.data.global);
        player.x += 0.5;
        var position = player.position;
        brush.position.copy(position);
        app.renderer.render(brush, maskSprite, true, null, false);
      }
    }
  }

  function pointerUp(event) {
    player.playAnimate("idle");
    dragging = false;
    point.visible = false;
  }


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
    // player.vy = 0;
  };

  //Left arrow key `release` method
  left.release = () => {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the cat isn't moving vertically:
    //Stop the cat
    if (!right.isDown && player.vy === 0) {
      player.playAnimate("idle");
      player.vx = 0;
      player.vy = 0;
    }
  };

  //Up
  up.press = () => {
    console.log('up.press')
    player.playAnimate("run");
    player.vy = -1;
    // player.vx = 0;
  };
  up.release = () => {
    console.log('up.release')
    if (!down.isDown && player.vx === 0) {
      player.playAnimate("idle");
      player.vy = 0;
      player.vx = 0;
    }
  };

  //Right
  right.press = () => {
    console.log('right.press')
    player.playAnimate("run");
    player.scale.x = 1;
    player.vx = 1;
    // player.vy = 0;
  };
  right.release = () => {
    if (!left.isDown && player.vy === 0) {
      player.playAnimate("idle");
      player.vx = 0;
      player.vy = 0;
    }
  };

  //Down
  down.press = () => {
    console.log('down.press')
    player.playAnimate("run");
    player.vy = 1;
    // player.vx = 0;
  };
  down.release = () => {
    console.log('down.release')
    if (!up.isDown && player.vx === 0) {
      player.playAnimate("idle");
      player.vy = 0;
      player.vx = 0;
    }
  };

  var hitObj = new Graphics();
  hitObj.beginFill(0x666666);
  hitObj.drawCircle(35, 20, 20);
  hitObj.endFill();
  hitObj.alpha = 0.5;
  app.stage.addChild(hitObj);

  circle = new Graphics();
  circle.beginFill(0x666666);
  circle.drawCircle(350, 200, 200);
  circle.endFill();
  circle.alpha = 0.5;
  app.stage.addChild(circle);
  // 手柄
  // app.stage.addChild(rocker);

  app.ticker.add(delta => gameLoop(delta));

  // Game loop
  function gameLoop(delta) {

    // var hit = hitTestRectangle(player, good)
    // // console.log(hit)
    // if (hit) {
    //   player.playAnimate("idle");
    //   player.vx = 0;
    //   player.vy = 0;
    // }
    var hit = b.hit(player, good, true);
    console.log(hit)
    if (hit) {
      player.playAnimate("idle");
      player.vx = 0;
      player.vy = 0;
      return;
    }

    // console.log(delta)
    // console.log('gameLoop')
    // Use the cat's velocity to make it move

    // console.log(player.currAnimate)
    player.x += player.vx;
    player.y += player.vy;
    brush.position.copy(player.position);
    app.renderer.render(brush, maskSprite, true, null, false);

    if (!down.isDown && !left.isDown && !right.isDown && !up.isDown && player.currAnimate !== 'idle') {
      player.playAnimate("idle");
      player.vx = 0;
      player.vy = 0;
    }

    // if (!down.isDown && !left.isDown && !right.isDown && !up.isDown && player.currAnimate != "idle") {
    //   player.playAnimate("idle");
    // }
  }

}