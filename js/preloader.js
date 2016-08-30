Game.Preloader = function(game){
  this.preloaderBar = null;
};

Game.Preloader.prototype = {
  preload:function(){
    console.log("preloader");
    this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY,'preloaderBar');

    this.preloadBar.anchor.setTo(0.5,0.5);

    this.time.advancedTiming = true;

    this.load.setPreloadSprite(this.preloadBar);

    //LOAD ALL ASSETS
  },

  create:function(){
    console.log("yoyoyo");
    this.state.start('Level1');
  }
}
