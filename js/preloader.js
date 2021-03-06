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
    var mapData = generatedMap.output();
    //LOAD ALL ASSETS

    // this.load.tilemap('map', '../basic-tilemap/jumping-playground.csv');
    this.load.tilemap('map', null, mapData, Phaser.Tilemap.CSV);
    this.load.image('tileset', '../map-assets/DirtTileMap64x64.png');
    this.load.image('bird', '../assets/bird.png');
    this.load.spritesheet('player', '../assets/dude.png', 32, 48);
    this.load.spritesheet('buttons', '../assets/button_sprite_sheet.png', 193, 71);
    this.load.image('laser', '../assets/laser.png');
    this.load.image('badge', '../assets/badge.png');
    this.load.image('bombom', '../assets/bombom.png');
    this.load.image('cannonball', '../assets/cannonball.png');
    this.load.spritesheet('bug', '../assets/bug-enemy2.png', 32, 32);

    if (type === "forest") {
      this.load.image('background', '../assets/Forrest.png');
    } else if (type === "water") {
      this.load.image('background', '../assets/water.png');
    } else if (type === "city") {
      this.load.image('background', '../assets/city-epicodus.png');
    } else {
      this.load.image('background', '../assets/soog-mountain.png');
    }

  },

  create:function(){
    console.log("yoyoyo");
    this.state.start('Level1');
  }
};
