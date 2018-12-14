var Map = function (map) {
  var mapContainer = new Container();
  for (var y = 0; y < map.length; y++) {
    var row = map[y];
    for (var x = 0; x < row.length; x++) {
      var imageId = row[x];
      var block = Sprite.fromImage(imageId);
      block.x = x * BLOCK_WIDTH;
      block.y = y * BLOCK_HEIGHT;
      mapContainer.addChild(block);
    }
  }
  return mapContainer;
}