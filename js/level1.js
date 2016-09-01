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

};

EnemyDino = function(index,game,x,y) {
  this.dino = game.add.sprite(x,y,'dino');
  this.dino.anchor.setTo(0.5,0.5);
  this.dino.name = index.toString();
  game.physics.enable(this.dino, Phaser.Physics.ARCADE);
  this.dino.body.immovable = true;
  this.dino.body.collideWorldBounds = true;
  this.dino.body.allowGravity = true;

  // this.dinoTween = game.add.tween(this.dino).to({
  //   y: this.dino.y + 50
  // }, 2000, 'Linear', true, 0, 100, true);

};

// Enemy = function (game_state, position, properties) {
//   "use strict";
//   Platformer.Prefab.call(this, game_state, position, properties);
//
//   this.walking_speed = +properties.walking_speed;
//   this.walking_distance = +properties.walking_distance;
//   this.previous_x = this.x;
//   this.game_state.game.physics.arcade.enable(this);
//   this.body.velocity.x = properties.direction * this.walking_speed;
//
//   this.scale.setTo(-properties.direction, 1);
//
//   this.anchor.setTo(0.5);
// }
//
// Enemy.prototype = Object.create(.Prefab.prototype);
// Enemy.prototype.constructor = Platformer.Enemy;
//
// Platformer.Enemy.prototype.update = function() {
//   "use strict";
//   this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
//
//   if (Math.abs(this.x - this.previous_x) >= this.walking_distance) {
//     this.body.velocity.x *= -1;
//     this.previous_x = this.x;
//     this.scale.setTo(-this.scale.x, 1);
//   }
// }

var enemy1;
var enemy2;
var raptors = [];
var birds = [];
var mapCoord = [];
var birdMapCoord = [];

Game.Level1 = function(game) {};

var map;
var layer;

var player;
var controls = {};
var playerSpeed = 300;
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
var badges;
var bombomTime = 0;
var bomboms;

var dinoCounter = 1;
var dinoCounterPrev = 0;

var raptorHouseCount = 0;
var birdHouseCount = 0;

var mostRecentLaser;



Game.Level1.prototype = {
  create:function() {
    this.stage.backgroundColor = '#FFBDBD';

    this.physics.arcade.gravity.y = 1400;

    map = this.add.tilemap('map',64,64);

    map.addTilesetImage('tileset');

    layer = map.createLayer(0);

    layer.resizeWorld();

    map.setCollisionBetween(0,6);

    // map.setTileIndexCallback(2, this.resetPlayer, this);
    // map.setTileIndexCallback(3, this.resetPlayer, this);
    // map.setTileIndexCallback(4, this.resetPlayer, this);
    // map.setTileIndexCallback(5, this.resetPlayer, this);
    // map.setTileIndexCallback(9, this.resetPlayer, this);


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
      shoot: this.input.keyboard.addKey(Phaser.Keyboard.I),
      shootLeft: this.input.keyboard.addKey(Phaser.Keyboard.J),
      shootRight: this.input.keyboard.addKey(Phaser.Keyboard.L),
      bombom: this.input.keyboard.addKey(Phaser.Keyboard.K),
      test: this.input.keyboard.addKey(Phaser.Keyboard.T),


    };

    // button = this.add.button(this.world.centerX - 0, this.world.centerY + 700, 'buttons', function(){
    //   console.log('pressed');
    // }, this, 2, 1, 0);
    //
    // button.fixedToCamera = true;

    enemy1 = new EnemyBird(0, game, player.x + 1190, player.y - 1280);

    enemy2 = new EnemyDino(0, game, player.x + 1400, player.y -1280);

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

    badges = game.add.group();
    badges.enableBody = true;
    badges.physicsBodyType = Phaser.Physics.ARCADE;
    badges.createMultiple(5, 'badge');
    badges.setAll('anchor.x', 0.5);
    badges.setAll('anchor.y', 0.5);
    badges.setAll('scale.x', 0.5);
    badges.setAll('scale.y', 0.5);
    badges.setAll('outOfBoundsKill', true);
    badges.setAll('checkWorldBounds', true);

    bomboms = game.add.group();
    bomboms.enableBody = true;
    // bomboms.physicsBodyType = Phaser.Physics.ARCADE;
    bomboms.createMultiple(5, 'bombom');
    bomboms.setAll('anchor.x', 0.5);
    bomboms.setAll('anchor.y', 0.5);
    bomboms.setAll('scale.x', 0.5);
    bomboms.setAll('scale.y', 0.5);
    bomboms.setAll('outOfBoundsKill', true);
    bomboms.setAll('checkWorldBounds', true);


    // var enemy = new Enemy(game, 100, 124, 1, enemySpeed);
    // game.add.existing(enemy);
    // enemy = new Enemy(game, 384, 123, -1, enemySpeed);
    // game.add.existing(enemy);
    // enemy = new Enemy(game, 500, 500, 1, enemySpeed);
    // game.add.existing(enemy);
    // enemy = new Enemy(game, 684, 1123, -1, enemySpeed);
    // game.add.existing(enemy);
    console.log(map.tiles[8]);
    console.log(map);
    console.log(map.getTile(1, 62));
    for (i = 0; i < map.width; i++) {
      for (j = 0; j < map.height; j++) {
        var thisTile = map.getTile(i, j);
        // console.log(thisTile);
        if (thisTile && thisTile.index === 8) {
          console.log("Raptor home found!");
          raptorHouseCount ++;
          console.log("Y: " + j + ", X: " + i);
          raptors.push(new EnemyDino(raptors.length, game, i * map.tileWidth + 32, j * map.tileHeight));
          console.log(raptors);
          mapCoord.push([i * map.tileWidth + 32, j * map.tileHeight]);
        }
      }
    }

    console.log(map.tiles[7]);
    for (i = 0; i < map.width; i++) {
      for (j = 0; j < map.height; j++) {
        var thisTile = map.getTile(i, j);
        // console.log(thisTile);
        if (thisTile && thisTile.index === 7) {
          console.log("Bird house found!");
          birdHouseCount ++;
          console.log("Y: " + j + ", X: " + i);
          birds.push(new EnemyBird(birds.length, game, i * map.tileWidth + 32, j * map.tileHeight));
          console.log(birds);
          birdMapCoord.push([i * map.tileWidth + 32, j * map.tileHeight]);
        }
      }
    }
  },



  update:function(){

    var self = this;
    var deadRaptors = 0;
    raptors.forEach(function(raptor) {
      if (!raptor.dino.alive) {
        deadRaptors ++;
      }
    });
    if(this.time.now % 300 === 0) {
      mapCoord.forEach(function(coordinates) {
        if(raptors.length - deadRaptors < raptorHouseCount * 3) {
          raptors.push(new EnemyDino(raptors.length, game, coordinates[0], coordinates[1]));
        }
      });
    }

    var now = this.time.now;
    this.physics.arcade.collide(player,layer);
    this.physics.arcade.collide(enemy2.dino, layer);
    raptors.forEach(function(raptor) {
      self.physics.arcade.collide(raptor.dino, layer);
    });
    birds.forEach(function(bird) {
      self.physics.arcade.collide(player, bird.bird, function() {
        if (now > baddieHurtTimer) {
          baddieHurtTimer = now + 800;
          if(baddieHurtTimer === now + 800) {
            player.lifeCount --;
            console.log('OWIE!');
            playerSpeed -= (10 - player.lifeCount) * 10;
            console.log(playerSpeed);
          }
        }
      });
    });



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
      playerSpeed = 300;
    }

    // if (checkOverlap(player, enemy1.bird) && this.time.now > baddieHurtTimer) {
    //   baddieHurtTimer = this.time.now + 800;
    //   if(baddieHurtTimer === this.time.now + 800) {
    //     player.lifeCount --;
    //     console.log('OWIE!');
    //   }
    //
    // }
    if (controls.test.isDown) {
      console.log(raptors);
    }

    if (controls.shoot.isDown) {
      this.shootLaser();
    }

    if(checkOverlap(lasers, enemy1.bird)) {
      enemy1.bird.kill();
    }
    if(checkOverlap(lasers, enemy2.dino)) {
      enemy2.dino.kill();
    }
    if(checkOverlap(lasers, player)) {
      if (mostRecentLaser.body.velocity.y > 0 && self.time.now > hurtTimer) {
        player.lifeCount -= 2;
        console.log("ouchheee wizz");
        hurtTimer = self.time.now + 400;
        playerSpeed -= (10 - player.lifeCount) * 15;
      }
    }

    if (controls.shootLeft.isDown) {
      this.shootBadge("left");
    }

    if (controls.shootRight.isDown) {
      this.shootBadge("right");
    }

    if(checkOverlap(badges, enemy1.bird)) {
      enemy1.bird.kill();
    }
    if(checkOverlap(badges, enemy2.dino)) {
      enemy2.dino.kill();
    }

    if (controls.bombom.isDown) {
      this.dropBombom();
    }

    if(checkOverlap(bomboms, enemy1.bird)) {
      enemy1.bird.kill();
    }
    if(checkOverlap(bomboms, enemy2.dino)) {
      enemy2.dino.kill();
    }


    birds.forEach(function(bird) {
      if(checkOverlap(lasers, bird.bird)) {
        bird.bird.kill();
      }
      if(checkOverlap(badges, bird.bird)) {
        bird.bird.kill();
      }
      if(checkOverlap(bomboms, bird.bird)) {
        bird.bird.kill();
      }
      // self.physics.arcade.collide(player, bird.bird, function() {
      //   if (now > baddieHurtTimer) {
      //     baddieHurtTimer = now + 800;
      //     if(baddieHurtTimer === now + 800) {
      //       player.lifeCount --;
      //       console.log('OWIE!');
      //       playerSpeed -= (10 - player.lifeCount) * 5;
      //       console.log(playerSpeed);
      //     }
      //   }
      // });
    })

    ////dino
    ////movement

    raptors.forEach(function(raptor) {
      if ((Math.floor(Math.random() * 3) === 0)) {
        if(dinoCounter > 0 && dinoCounter < 300 && dinoCounter !== dinoCounterPrev) {
          if(!raptor.dino.body.blocked.left && !raptor.dino.body.blocked.right) {
            var speed = 3;
            if((Math.floor(Math.random() * 2) === 0)) speed = 4;
            if((Math.floor(Math.random() * 3) === 0)) speed = 8;
            if((Math.floor(Math.random() * 16) === 0)) speed = 20;
            if((Math.floor(Math.random() * 2) === 0)) {
              raptor.dino.body.velocity.x -= speed;
            } else {
              raptor.dino.body.velocity.x += speed;
            }

          }
          if(raptor.dino.body.blocked.left) {
            raptor.dino.body.velocity.x += 2;
            if (!raptor.dino.body.blocked.up) {
              raptor.dino.body.velocity.y -= 300;
            }
          }
          if(raptor.dino.body.touching.down || raptor.dino.body.onFloor()) {
            if((Math.floor(Math.random() * 5) === 0)) {
              raptor.dino.body.velocity.y -= 500;
            }
            raptor.dino.body.velocity.x -= 10;
          }
          if(raptor.dino.body.blocked.up) {
            raptor.dino.body.velocity.y += 400;
            raptor.dino.body.velocity.x += 40;
          }
          if((Math.floor(Math.random() * 800) === 0)) {
            raptor.dino.body.velocity.x += 30;
            raptor.dino.body.position.y -= 80;
          }
          dinoCounter ++;
          dinoCounterPrev ++;
          if(dinoCounter === 1) {
            dinoCounterPrev --;
          }
        } else {
          if(!raptor.dino.body.blocked.left && !raptor.dino.body.blocked.right) {
            var raptorSpeed = 3;
            if((Math.floor(Math.random() * 2) === 0)) raptorSpeed = 4;
            if((Math.floor(Math.random() * 3) === 0)) raptorSpeed = 8;
            if((Math.floor(Math.random() * 16) === 0)) raptorSpeed = 20;
            if((Math.floor(Math.random() * 2) === 0)) {
              raptor.dino.body.velocity.x += raptorSpeed;
            } else {
              raptor.dino.body.velocity.x -= raptorSpeed;
            }

          }
          if(raptor.dino.body.blocked.left) {
            raptor.dino.body.velocity.x -= 2;
            if (!raptor.dino.body.blocked.up) {
              raptor.dino.body.velocity.y -= 300;
            }
          }
          if(raptor.dino.body.touching.down || raptor.dino.body.onFloor()) {
            if((Math.floor(Math.random() * 5) === 0)) {
              raptor.dino.body.velocity.y -= 500;
            }
            raptor.dino.body.velocity.x += 10;
          }
          if(raptor.dino.body.blocked.up) {
            raptor.dino.body.velocity.y += 400;
            raptor.dino.body.velocity.x -= 40;
          }
          if (dinoCounter === 300) dinoCounterPrev ++;
          dinoCounter --;
          dinoCounterPrev --;
          if (dinoCounter === 1) {
            dinoCounter = 1;
            dinoCounterPrev = 0;
          }

        }

      }

      if(checkOverlap(lasers, raptor.dino)) {
        raptor.dino.kill();
      }
      if(checkOverlap(badges, raptor.dino)) {
        raptor.dino.kill();
      }
      if(checkOverlap(bomboms, raptor.dino)) {
        raptor.dino.kill();
      }
      self.physics.arcade.collide(player, raptor.dino, function() {
        if (now > baddieHurtTimer) {
          baddieHurtTimer = now + 800;
          if(baddieHurtTimer === now + 800) {
            player.lifeCount --;
            console.log('OWIE!');
            playerSpeed -= (10 - player.lifeCount) * 5;
            console.log(playerSpeed);
          }
        }
      });
    });

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
    // map.setCollisionBetween(0,6);
    if(this.time.now > hurtTimer) {
      console.log('lost one life');
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
      mostRecentLaser = laser;
    }
  },

  shootBadge: function(direction) {
    if(this.time.now > shootTime) {
      badge = badges.getFirstExists(false);
      if(badge){
        var leftOrRightVelocity = 220;
        if(direction === "left") leftOrRightVelocity *= -1;
        badge.reset(player.x, player.y);
        badge.body.velocity.y = -620;
        badge.body.velocity.x = leftOrRightVelocity;

        shootTime = this.time.now + 700;
      }
    }
  },

  dropBombom: function() {
    if(this.time.now > bombomTime) {
      bombom = bomboms.getFirstExists(false);
      if(bombom){
        bombom.reset(player.x, player.y);
        bombom.body.velocity.y = 0;
        bombom.body.velocity.x = 0;
        bombomTime = this.time.now + 5000;
      }
    }
  }

};

function checkOverlap(spriteA,spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();
  return Phaser.Rectangle.intersects(boundsA, boundsB);
}

// Enemy = function(game, x, y, direction, speed) {
//   Phaser.Sprite.call(this, game, x, y, "enemy");
//   this.anchor.setTo(0.5);
//   game.physics.enable(this, Phaser.Physics.ARCADE);
//   this.xSpeed = direction * speed;
// },
//
// Enemy.prototype = Object.create(Phaser.Sprite.Prototype);
// Enemy.prototype.constructor = Enemy;
//
// Enemy.prototype.update = function() {
//   game.physics.arcade.collide(this, layer, moveEnemy);
//   this.body.velocity.x = this.xSpeed;
// };
//
// function moveEnemy(enemy,platform) {
//   if(enemy.xSpeed > 0 && enemy.x > platform.x + platform.width/2 || enemy.xSpeed<0 && enemy.x<platform.x-platform.width/2){
// 		enemy.xSpeed*=-1;
//   }
// }
