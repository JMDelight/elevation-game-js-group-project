EnemyBird = function(index,game,x,y) {
  this.bird = game.add.sprite(x,y,'bird');
  this.bird.anchor.setTo(0.5,0.5);
  this.bird.name = index.toString();
  game.physics.enable(this.bird, Phaser.Physics.ARCADE);
  this.bird.body.immovable = true;
  this.bird.body.collideWorldBounds = true;
  this.bird.body.allowGravity = false;

  this.birdTween = game.add.tween(this.bird).to({
    y: this.bird.y + 50
  }, 2000, 'Linear', true, 0, 100, true);

}

var enemy1;

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
var hurtTimer = 0;
var onWall = false;
var onWallTimer = 0;
var secondWallTimer = 0;
var wallFlag = false;
var baddieHurtTimer = 0;

var button;

var shootTime = 0;
var lasers;


Game.Level1.prototype = {
  create:function() {
    this.stage.backgroundColor = '#FFBDBD';

    this.physics.arcade.gravity.y = 1400;

    map = this.add.tilemap('map',64,64);

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
    player.lifeCount = 10;
    player.anchor.setTo(0.5,0.5);
    player.animations.add('idle',[0,1],1,true);
    player.animations.add('jump',[2],1,true);
    player.animations.add('run',[3,4,5],10,true);
    this.physics.arcade.enable(player);
    this.camera.follow(player);
    player.body.collideWorldBounds = true;

    controls = {
      right: this.input.keyboard.addKey(Phaser.Keyboard.D),
      left: this.input.keyboard.addKey(Phaser.Keyboard.A),
      up: this.input.keyboard.addKey(Phaser.Keyboard.W),
      wallSlide: this.input.keyboard.addKey(Phaser.Keyboard.F),
      shoot: this.input.keyboard.addKey(Phaser.Keyboard.UP),

    };

    // button = this.add.button(this.world.centerX - 0, this.world.centerY + 700, 'buttons', function(){
    //   console.log('pressed');
    // }, this, 2, 1, 0);
    //
    // button.fixedToCamera = true;

    enemy1 = new EnemyBird(0, game, player.x + 190, player.y - 280);

    lasers = game.add.group();

    lasers.enableBody = true;
    lasers.physicsBodyType = Phaser.Physics.ARCADE;
    lasers.createMultiple(5, 'laser');

    lasers.setAll('anchor.x', 0.5);
    lasers.setAll('anchor.y', 0.5);

    lasers.setAll('scale.x', 0.5);
    lasers.setAll('scale.y', 0.5);

    lasers.setAll('outOfBoundsKill', true);
    lasers.setAll('checkWorldBounds', true);
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
    }

    if(player.body.touching.down || player.body.onFloor()){
      secondJump = false;
      releaseFirstJump = false;
      onWall = false;
      wallFlag = false;
    }

    if(controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer && !secondJump){
        player.animations.play('jump');
        player.body.velocity.y = -800;
        jumpTimer = this.time.now + 750;
        secondJump = true;
    }

    if(secondJump && (player.body.blocked.left || player.body.blocked.right) && !player.body.touching.down && player.body.velocity.y > 0) {
        // console.log("WALL SLIDING");
        player.body.velocity.x = 0;

        onWall = true;
        onWallTimer = this.time.now + 210;
        if(!wallFlag) {
          wallFlag = true;
          secondWallTimer = this.time.now + 300;
        }

    }

    if(onWall && (!player.body.touching.down || !player.body.onFloor())) {
      player.body.velocity.x = 0;
      if (secondWallTimer > this.time.now) {
        console.log("if");
        player.body.velocity.y = 30;
      } else {
        player.body.velocity.y *= 1.03;
        console.log("else", player.body.velocity.y);
      }
    }

    if(onWall && controls.up.isDown) {
      if (controls.right.isDown) {
        player.body.velocity.y += -300;
        player.body.velocity.x += 900;
      } else if (controls.left.isDown) {
        player.body.velocity.y += -300;
        player.body.velocity.x += -900;
      }
      onWall = false;
    }

    if(this.time.now > onWallTimer) {
      onWall = false;
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

    if(player.lifeCount <= 0) {
      console.log('YOU LOSE');
      console.log(player);
      player.reset(100, 1400);
      player.lifeCount = 10;
    }

    if (checkOverlap(player, enemy1.bird) && this.time.now > baddieHurtTimer) {
      baddieHurtTimer = this.time.now + 800;
      if(baddieHurtTimer === this.time.now + 800) {
        player.lifeCount --;
        console.log('OWIE!');
      }

    }

    if (controls.shoot.isDown) {
      this.shootLaser();
    }

    if(checkOverlap(lasers, enemy1.bird)) {
      enemy1.bird.kill();
    }
  },


  // resetPlayerLeftSpike: function(){
  //   player.lifeCount --;
  //   player.position.x -= 60;
  //   player.position.y -= 12;
  // },
  //
  // resetPlayerTopSpike: function(){
  //   player.lifeCount --;
  //   player.position.x -= 60;
  //   player.position.y -= 12;
  // },
  //
  // resetPlayerBottomSpike: function(){
  //   player.lifeCount --;
  //   player.position.x -= 60;
  //   player.position.y -= 12;
  // },
  //
  // resetPlayerRightSpike: function(){
  //   player.lifeCount --;
  //   player.position.x -= 60;
  //   player.position.y -= 12;
  // },
  //
  // resetPlayerAllSpike: function(){
  //   player.lifeCount --;
  //   player.position.x -= 60;
  //   player.position.y -= 12;
  // },

  resetPlayer: function(){
    map.setCollisionBetween(0,6);
    if(this.time.now > hurtTimer) {
      player.lifeCount --;
      hurtTimer = this.time.now + 400;
    }

  },

  shootLaser: function() {
    if(this.time.now > shootTime) {
      laser = lasers.getFirstExists(false);
      if(laser){
        laser.reset(player.x, player.y);

        laser.body.velocity.y = -600;

        shootTime = this.time.now + 900;
      }
    }
  }

}

function checkOverlap(spriteA,spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();
  return Phaser.Rectangle.intersects(boundsA, boundsB);
}
