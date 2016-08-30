Game.Level1 = function(game) {};

var map;
var layer;

var player;
var controls = {};
var playerSpeed = 150;
var jumpTimer = 0;
var secondJump = false;
var releaseFirstJump = false;
var wallJumpTimer = 0;

var button;


Game.Level1.prototype = {
  create:function() {
    console.log("level1");
    this.stage.backgroundColor = '#FFBDBD';

    this.physics.arcade.gravity.y = 1400;

    map = this.add.tilemap('map',64,64);
    map.scale = {x:2, y:2};

    map.addTilesetImage('tileset');

    layer = map.createLayer(0);

    layer.resizeWorld();

    map.setCollisionBetween(0,6);

    map.setTileIndexCallback(2, this.resetPlayer, this);
    map.setTileIndexCallback(3, this.resetPlayer, this);
    map.setTileIndexCallback(4, this.resetPlayer, this);
    map.setTileIndexCallback(5, this.resetPlayer, this);
    map.setTileIndexCallback(6, this.resetPlayer, this);

    player = this.add.sprite(100,1400,'player');
    player.anchor.setTo(0.5,0.5);
    player.animations.add('idle',[0,1],1,true);
    player.animations.add('jump',[2],1,true);
    player.animations.add('run',[3,4,5],10,true);
    this.physics.arcade.enable(player);
    this.camera.follow(player);
    player.body.collidWorldBounds = true;

    controls = {
      right: this.input.keyboard.addKey(Phaser.Keyboard.D),
      left: this.input.keyboard.addKey(Phaser.Keyboard.A),
      up: this.input.keyboard.addKey(Phaser.Keyboard.W),
    };

    // button = this.add.button(this.world.centerX - 0, this.world.centerY + 700, 'buttons', function(){
    //   console.log('pressed');
    // }, this, 2, 1, 0);
    //
    // button.fixedToCamera = true;
  },



  update:function(){
    this.physics.arcade.collide(player,layer);
    if(this.time.now > wallJumpTimer) {
      player.body.velocity.x = 0;
    }

    if(controls.up.isDown){

    }

    if(controls.right.isDown){
      player.animations.play('run');
      player.scale.setTo(1,1);
      player.body.velocity.x += playerSpeed;
    }

    if(controls.left.isDown){
      player.animations.play('run');
      player.scale.setTo(-1,1);
      player.body.velocity.x -= playerSpeed;
      console.log(playerSpeed);
    }

    if(player.body.touching.down || player.body.onFloor()){
      secondJump = false;
      releaseFirstJump = false;
    }

    if(controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer && !secondJump){
        player.animations.play('jump');
        player.body.velocity.y = -800;
        jumpTimer = this.time.now + 750;
        secondJump = true;
    }

    if(!player.body.touching.down && !player.body.onFloor() && secondJump & controls.up.isUp) {
      releaseFirstJump = true;
    }

    if(secondJump && releaseFirstJump && controls.up.isDown) {
      player.body.velocity.y = -400;
      jumpTimer = this.time.now + 750;
      wallJumpTimer = this.time.now + 60;
      secondJump = false;
      if(player.body.blocked.left) {
        player.body.velocity.y = -400;
        player.body.velocity.x = -100;
      }
      if (player.body.blocked.right) {
        player.body.velocity.y = -400;
        player.body.velocity.x = 100;
      }
    }

    if(player.body.velocity.x === 0 && player.body.velocity.y === 0) {
      player.animations.play('idle');
    }

  },

  resetPlayer: function(){
    player.reset(100, 1400);
  }
}
