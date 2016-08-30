Game.Preloader = function(game){
  this.preloaderBar = null;
};

var map;
var layer;

Game.Preloader.prototype = {
  preload:function(){
    console.log("preloader");
    this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY,'preloaderBar');

    this.preloadBar.anchor.setTo(0.5,0.5);

    this.time.advancedTiming = true;

    this.load.setPreloadSprite(this.preloadBar);

    //LOAD ALL ASSETS
    this.load.tilemap('map', '../basic-tilemap/ElevationGain.csv');
    this.load.image('tileset', '../tiled-files/BasicTileSet64x64.png');

    this.load.spritesheet('player', 'assets/dude.png', 32, 48);
  },

  create:function(){
    console.log("yoyoyo");
    this.state.start('Level1');
  }
}
