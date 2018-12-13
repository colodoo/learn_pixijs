# learn_pixijs

基于Union Toor的设计，学习PIXI.js

## Union Toor

### 定位

迷宫竞争游戏  

### 玩法

1. 缩圈机制（类似吃鸡）  
2. 不跳伞，随机初始地点  
3. 全场只可能出现一个强力武器  
4. 初始只能看到8个方位，每个图有一个触发点，用来点亮整个地图，有且只有一个人能获得  
5. 击杀对手可以获得对方的点亮地图资格，并掉落一个宝箱  
6. 击杀所有对手，就可以获得胜利，如果到最后的圈子只剩下一个位置的时候，谁先占据这个方块，就胜利   

## 涉及

- PIXI.js
- Colyseus.js

## 设计

### 动画控制
PIXI.js的设计缺陷，对单个对象多个动画的播放有限制，将重写动画控制。

[演示](https://sandbox.runjs.cn/show/i6ypcmep) [代码](https://runjs.cn/code/i6ypcmep)

### 地图
因为素材的限制，对地图单个块的设计是16 * 16，单个地图也采用16 * 16。

- 宽度：256  
- 高度：256

[演示](https://sandbox.runjs.cn/show/njztix80) [代码](https://runjs.cn/code/njztix80)

### 关卡
8 * 8 总共64关

缩圈机制需要所有的地图都处在同一平面，在地图切换的时候，把当前关卡的左上角坐标切换到(0, 0)。


[演示](https://sandbox.runjs.cn/show/njztix80) [代码](https://runjs.cn/code/njztix80)

### 迷雾
在16 * 16 的单个关卡中，迷宫的难度是很低的，所有增加了迷雾来增加难度。

[演示](https://sandbox.runjs.cn/show/nklrp0mw) [代码](https://runjs.cn/code/nklrp0mw)