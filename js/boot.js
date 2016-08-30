var Game = {};

Game.Boot = function(game){

};

Game.Boot.prototype = {
  init:function(){
    this.input.maxPointers = 1;
    // console.log("init");
    this.stage.disableVisibilityChange = true;
  },

  preload:function(){
    // console.log("preload");
    this.load.image('preloaderBar', '/assets/preloader.png');
  },

  create:function(){
    console.log(this.state)
    // console.log("create");
    this.state.start('Preloader');
    console.log(this.state)
    debugger

  }
}
