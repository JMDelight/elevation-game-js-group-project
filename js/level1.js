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
};


var raptors = [];
var birds = [];
var mapCoord = [];
var birdMapCoord = [];

var trampolineCoords = [];
var rightSpikeCoords = [];
var leftSpikeCoords = [];
var downSpikeCoords = [];
var upSpikeCoords = [];
var allSpikeCoords = [];

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
var tileHurtTimer = 0;

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
    // map.setTileIndexCallback(5, this.tileLaunchJump, this);
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


    //find raptor houses
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
    ///find bird houses
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
    ///find trampolines
    console.log(map.tiles[5]);
    for (i = 0; i < map.width; i++) {
      for (j = 0; j < map.height; j++) {
        var thisTile = map.getTile(i, j);
        if (thisTile && thisTile.index === 5) {
          console.log("Tramponline found!");
          console.log("Y: " + j + ", X: " + i);
          // trampolines.push([i * map.tileWidth + 32, j * map.tileHeight]);
          // console.log(trampolines);
          trampolineCoords.push([i * map.tileWidth, j * map.tileHeight - 48]);

        }
      }
    }
    ///find right spike tiles
    console.log(map.tiles[5]);
    for (i = 0; i < map.width; i++) {
      for (j = 0; j < map.height; j++) {
        var thisTile = map.getTile(i, j);
        if (thisTile && thisTile.index === 5) {
          console.log("Right spikey found!");
          console.log("Y: " + j + ", X: " + i);
          // trampolines.push([i * map.tileWidth + 32, j * map.tileHeight]);
          // console.log(trampolines);
          rightSpikeCoords.push([i * map.tileWidth + 32, j * map.tileHeight]);

        }
      }
    }
    ///find left spike tiles
    console.log(map.tiles[5]);
    for (i = 0; i < map.width; i++) {
      for (j = 0; j < map.height; j++) {
        var thisTile = map.getTile(i, j);
        if (thisTile && thisTile.index === 5) {
          console.log("Right spikey found!");
          console.log("Y: " + j + ", X: " + i);
          // trampolines.push([i * map.tileWidth + 32, j * map.tileHeight]);
          // console.log(trampolines);
          leftSpikeCoords.push([i * map.tileWidth + 32, j * map.tileHeight]);

        }
      }
    }
    ///find up spike tiles
    console.log(map.tiles[2]);
    for (i = 0; i < map.width; i++) {
      for (j = 0; j < map.height; j++) {
        var thisTile = map.getTile(i, j);
        if (thisTile && thisTile.index === 2) {
          console.log("Up spikey found!");
          console.log("Y: " + j + ", X: " + i);
          // trampolines.push([i * map.tileWidth + 32, j * map.tileHeight]);
          // console.log(trampolines);
          upSpikeCoords.push([i * map.tileWidth, j * map.tileHeight - 48]);

        }
      }
    }
    ///find down spike tiles
    console.log(map.tiles[4]);
    for (i = 0; i < map.width; i++) {
      for (j = 0; j < map.height; j++) {
        var thisTile = map.getTile(i, j);
        if (thisTile && thisTile.index === 4) {
          console.log("Right spikey found!");
          console.log("Y: " + j + ", X: " + i);
          // trampolines.push([i * map.tileWidth + 32, j * map.tileHeight]);
          // console.log(trampolines);
          downSpikeCoords.push([i * map.tileWidth, j * map.tileHeight + 16]);

        }
      }
    }
    ///find all spike tiles
    console.log(map.tiles[5]);
    for (i = 0; i < map.width; i++) {
      for (j = 0; j < map.height; j++) {
        var thisTile = map.getTile(i, j);
        if (thisTile && thisTile.index === 5) {
          console.log("Right spikey found!");
          console.log("Y: " + j + ", X: " + i);
          // trampolines.push([i * map.tileWidth + 32, j * map.tileHeight]);
          // console.log(trampolines);
          allSpikeCoords.push([i * map.tileWidth + 32, j * map.tileHeight]);

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

    // for testing in game
    if (controls.test.isDown) {
      console.log(downSpikeCoords);
      console.log(player.body.x);
      console.log(player.body.y);
    }

    if (controls.shoot.isDown) {
      this.shootLaser();
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


    if (controls.bombom.isDown) {
      this.dropBombom();
    }

    trampolineCoords.forEach(function(trampoline) {
      if ((player.body.x >= trampoline[0] && player.body.x <= trampoline[0] + 64) && Math.ceil(player.body.y) === trampoline[1]) {
        console.log('triggered TRAMPOLINE');
        player.body.velocity.y = -1250;
      }
    });

    rightSpikeCoords.forEach(function(rightSpike) {
      if (player.body.x >= rightSpike[0]-32 && player.body.y >= rightSpike[1]-32 && player.body.x <= rightSpike[0]+32 && player.body.y <= rightSpike[1]+32) {
        console.log('triggered RIGHT SPIKE PAIN');
        player.lifeCount --;
      }
    });

    upSpikeCoords.forEach(function(upSpike) {
      if ((player.body.x >= upSpike[0] && player.body.x <= upSpike[0] + 64) && Math.ceil(player.body.y) === upSpike[1]) {
        if (now > tileHurtTimer) {
          console.log('triggered TOP SPIKE PAIN');
          player.lifeCount --;
          tileHurtTimer = now + 700;
        }
      }
    });

    downSpikeCoords.forEach(function(downSpike) {
      if ((player.body.x >= downSpike[0] && player.body.x <= downSpike[0] + 64) && Math.floor(player.body.y)-48 === downSpike[1]) {
        if (now > tileHurtTimer) {
          console.log('triggered BOTTOM SPIKE PAIN');
          player.lifeCount --;
          tileHurtTimer = now + 700;
        }
      }
    });

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


  resetPlayer: function(){
    // map.setCollisionBetween(0,6);
    if(this.time.now > hurtTimer) {
      console.log('lost one life');
      player.lifeCount --;
      hurtTimer = this.time.now + 400;
    }

  },

  tileLaunchJump: function(){
    console.log("UP UP AND AWAY!!!!");
    player.body.velocity.y = -1100;
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
