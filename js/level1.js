Game.Level1 = function(game) {};

var map;
var layer;

var player;
var controls = {};
var playerSpeed = 150;
var jumpTimer = 0;
var secondJump = false;
var releaseFirstJump = false;


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
  },



  update:function(){
    this.physics.arcade.collide(player,layer);

    player.body.velocity.x = 0;

    if(controls.up.isDown){
      player.animations.play('jump');
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
    }

    if(player.body.touching.down || player.body.onFloor()){
      secondJump = false;
      releaseFirstJump = false;
    }

    if(controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer && !secondJump){
        player.body.velocity.y = -666;
        jumpTimer = this.time.now + 750;
        secondJump = true;
    }

    if(!player.body.touching.down && !player.body.onFloor() && secondJump & controls.up.isUp) {
      releaseFirstJump = true;
    }

    if(secondJump && releaseFirstJump && controls.up.isDown) {
      player.body.velocity.y = -400;
      jumpTimer = this.time.now + 750;
      secondJump = false;
    }

  },
}
