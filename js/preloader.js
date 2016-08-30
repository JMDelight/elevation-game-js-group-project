Game.Preloader = function(game){
  this.preloaderBar = null;
  // setInterval(function() {
  //   console.log(this);
  //   debugger;
  //
  // }, 3000);
};

var map;
var layer;
var mapData = "9,9,9,9\n9,9,9,1\n1,1,1,0";

Game.Preloader.prototype = {
  preload:function(){
    console.log(this);

    console.log("preloader");
    this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY,'preloaderBar');

    this.preloadBar.anchor.setTo(0.5,0.5);

    this.time.advancedTiming = true;

    this.load.setPreloadSprite(this.preloadBar);

    //LOAD ALL ASSETS
    // this.load.tilemap('map', '../basic-tilemap/ElevationGain.csv');
    this.game.cache.addTileMap('mapOfHope', null, mapData, Phaser.Tilemap.CSV);
    this.load.image('tileset', '../tiled-files/BasicTileSet64x64.png');

    this.load.spritesheet('player', 'assets/dude.png', 32, 48);
    this.load.spritesheet('buttons', 'assets/button_sprite_sheet.png', 193, 71);
  },

  create:function(){
    console.log("yoyoyo");
    this.state.start('Level1');
  }
};
