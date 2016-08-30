var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('tiles', 'assets/tilemaps/tiles/sci-fi-tiles.png');
}
var cursors;
function create() {
  var data = '';
  for (var y = 0; y < 128; y++) {
    for (var x = 0; x < 128; x++) {
      data += game.rnd.between(0, 20).toString();
      if (x < 127) {
        data += ',';
      }
    }
    if (y < 127) {
      data += "\n";
    }
  }
  game.cache.addTilemap('dynamicMap', null, data, Phaser.Tilemap.CSV);

  map = game.add.tilemap('dynamicMap', 16, 16);

  map.addTilesetImage('tiles', 'tiles', 16, 16);

  layer = map.createLayer(0);

  layer.resizeWorld();
  game.physics.startSystem(Phaser.Physics.ARCADE);
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.left.isDown)    {
    game.camera.x--;
  }    else if (cursors.right.isDown)    {
    game.camera.x++;
  }
  if (cursors.up.isDown)    {
    game.camera.y--;
  }    else if (cursors.down.isDown){
    game.camera.y++;
  }
}
