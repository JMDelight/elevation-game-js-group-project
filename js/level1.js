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


EnemyBug = function(index,game,x,y) {
  this.bug = game.add.sprite(x,y,'bug');
  this.bug.anchor.setTo(0.5,0.5);
  this.bug.name = index.toString();
  game.physics.enable(this.bug, Phaser.Physics.ARCADE);
  this.bug.body.immovable = true;
  this.bug.body.collideWorldBounds = true;
  this.bug.body.allowGravity = true;
};



  // this.bugTween = game.add.tween(this.bug).to({
  //   y: this.bug.y + 50
  // }, 2000, 'Linear', true, 0, 100, true);


var lives = 4;
var livesText;
var score = 0;
var scoreText;
var healthText;

var raptors = [];
var birds = [];

var enemy1;
var enemy2;
var bugs = [];

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

var mapCoord = [];
var birdMapCoord = [];

var trampolineCoords = [];
var rightSpikeCoords = [];
var leftSpikeCoords = [];
var downSpikeCoords = [];
var upSpikeCoords = [];
var allSpikeCoords = [];
var lavaCoords = [];

var checkpointCoords = [];

var cannonCoords = [];
var cannonTimer = 0;
var cannonballs;

Game.Level1 = function(game) {};

var map;
var layer;

var player;
var controls = {};
var playerSpeed = 300;
var jumpTimer = 0;
var secondJump = false;
var releaseFirstJump = false;
var airborne = false;
var jumpDegreeTimer = 0;
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

var bugCounter = 1;
var bugCounterPrev = 0;

var raptorHouseCount = 0;
var birdHouseCount = 0;
var beetleHouseCount = 0;

var mostRecentLaser;

var testedCheckpoint = [0, 0];



Game.Level1.prototype = {
  create:function() {

    this.stage.backgroundColor = '#FFBDBD';

    this.physics.arcade.gravity.y = 1400;

    map = this.add.tilemap('map',64,64);

    map.addTilesetImage('tileset');

    layer = map.createLayer(0);

    layer.resizeWorld();

    map.setCollisionBetween(0,6);
    map.setCollisionBetween(10,14);

    // map.setTileIndexCallback(2, this.resetPlayer, this);
    // map.setTileIndexCallback(3, this.resetPlayer, this);
    // map.setTileIndexCallback(4, this.resetPlayer, this);
    // map.setTileIndexCallback(5, this.tileLaunchJump, this);
    // map.setTileIndexCallback(9, this.resetPlayer, this);


    player = this.add.sprite(100,1400,'player');
    player.lifeCount = 10;
    healthText = game.add.text(200, 16, 'Health: 10', { fontSize: '32px', fill: '#000' });
    healthText.fixedToCamera = true;
    scoreText = game.add.text(400, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    livesText = game.add.text(16, 16, 'Lives: ' + lives.toString(), { fontSize: '32px', fill: '#000' });
    scoreText.fixedToCamera = true;
    livesText.fixedToCamera = true;
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

    enemy2 = new EnemyBug(0, game, player.x + 1400, player.y -1280);
    enemy2.bug.animations.add('left',[10,11,12,13,14,15],30,true);
    enemy2.bug.animations.add('jump',[2,3,4,5,6,7,8,9],30,true);


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

    cannonballs = game.add.group();
    cannonballs.enableBody = true;
    // cannonballs.physicsBodyType = Phaser.Physics.ARCADE;
    cannonballs.createMultiple(5, 'cannonball');
    cannonballs.setAll('anchor.x', 0.5);
    cannonballs.setAll('anchor.y', 0.5);
    cannonballs.setAll('scale.x', 0.5);
    cannonballs.setAll('scale.y', 0.5);
    cannonballs.setAll('outOfBoundsKill', true);
    cannonballs.setAll('checkWorldBounds', true);


    //find ground spawn points
    console.log(map.tiles[8]);
    console.log(map);
    console.log(map.getTile(1, 62));
    for (i = 0; i < map.width; i++) {
      for (j = 0; j < map.height; j++) {
        var thisTile = map.getTile(i, j);
        // console.log(thisTile);
        if (thisTile && thisTile.index === 8) {
          console.log("Bug home found!");
          console.log("Y: " + j + ", X: " + i);
          bugs.push(new EnemyBug(bugs.length, game, i * map.tileWidth + 32, j * map.tileHeight));
          console.log(bugs);
        }
      }
    }
    ///find flying spawner tiles
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
    ///find cannon
    console.log(map.tiles[10]);
    for (i = 0; i < map.width; i++) {
      for (j = 0; j < map.height; j++) {
        var thisTile = map.getTile(i, j);
        if (thisTile && thisTile.index === 10) {
          console.log("A cannon was found!");
          console.log("Y: " + j + ", X: " + i);
          cannonCoords.push([i * map.tileWidth, j * map.tileHeight - 48]);
        }
      }
    }
    ///find checkpoints
    console.log(map.tiles[15]);
    for (i = 0; i < map.width; i++) {
      for (j = 0; j < map.height; j++) {
        var thisTile = map.getTile(i, j);
        if (thisTile && thisTile.index === 15) {
          console.log("A checkpoint was found!");
          console.log("Y: " + j + ", X: " + i);
          checkpointCoords.push([i * map.tileWidth, j * map.tileHeight]);
        }
      }
    }
    ///find right spike tiles
    console.log(map.tiles[14]); //copied from left spike tiles, will update when right spikes are on tilemap
    for (i = 0; i < map.width; i++) {
      for (j = 0; j < map.height; j++) {
        var thisTile = map.getTile(i, j);
        if (thisTile && thisTile.index === 14) {
          console.log("right spikey found!");
          console.log("Y: " + j + ", X: " + i);
          rightSpikeCoords.push([i * map.tileWidth, j * map.tileHeight]);

        }
      }
    }
    ///find left spike tiles
    console.log(map.tiles[12]);
    for (i = 0; i < map.width; i++) {
      for (j = 0; j < map.height; j++) {
        var thisTile = map.getTile(i, j);
        if (thisTile && thisTile.index === 12) {
          console.log("left spikey found!");
          console.log("Y: " + j + ", X: " + i);
          leftSpikeCoords.push([i * map.tileWidth, j * map.tileHeight]);

        }
      }
    }
    ///find up spike tiles
    console.log(map.tiles[11]);
    for (i = 0; i < map.width; i++) {
      for (j = 0; j < map.height; j++) {
        var thisTile = map.getTile(i, j);
        if (thisTile && thisTile.index === 11) {
          console.log("Up spikey found!");
          console.log("Y: " + j + ", X: " + i);
          upSpikeCoords.push([i * map.tileWidth, j * map.tileHeight - 48]);

        }
      }
    }
    ///find down spike tiles
    console.log(map.tiles[13]);
    for (i = 0; i < map.width; i++) {
      for (j = 0; j < map.height; j++) {
        var thisTile = map.getTile(i, j);
        if (thisTile && thisTile.index === 13) {
          console.log("Down spikey found!");
          console.log("Y: " + j + ", X: " + i);
          downSpikeCoords.push([i * map.tileWidth, j * map.tileHeight + 16]);

        }
      }
    }
    ///find all spike tiles
    console.log(map.tiles[6]);
    for (i = 0; i < map.width; i++) {
      for (j = 0; j < map.height; j++) {
        var thisTile = map.getTile(i, j);
        if (thisTile && thisTile.index === 6) {
          console.log("Right spikey found!");
          console.log("Y: " + j + ", X: " + i);
          // trampolines.push([i * map.tileWidth + 32, j * map.tileHeight]);
          // console.log(trampolines);
          allSpikeCoords.push([i * map.tileWidth, j * map.tileHeight - 48]);

        }
      }
    }
    ///find lava tiles
    console.log(map.tiles[9]);
    for (i = 0; i < map.width; i++) {
      for (j = 0; j < map.height; j++) {
        var thisTile = map.getTile(i, j);
        if (thisTile && thisTile.index === 9) {
          console.log("Lava tile found");
          console.log("Y: " + j + ", X: " + i);
          // trampolines.push([i * map.tileWidth + 32, j * map.tileHeight]);
          // console.log(trampolines);
          lavaCoords.push([i * map.tileWidth, j * map.tileHeight - 48]);

        }
      }
    }


  },



  update:function(){

    var self = this;
    var deadbugs = 0;
    bugs.forEach(function(beetle) {
      if (!beetle.bug.alive) {
        deadbugs ++;
      }
    });
    if(this.time.now % 300 === 0) {
      mapCoord.forEach(function(coordinates) {
        if(bugs.length - deadbugs < beetleHouseCount * 3) {
          bugs.push(new EnemyDino(bugs.length, game, coordinates[0], coordinates[1]));
        }
      });
    }

    var now = this.time.now;
    this.physics.arcade.collide(player,layer);

    this.physics.arcade.collide(enemy2.bug, layer);
    var self = this;
    bugs.forEach(function(beetle) {
      self.physics.arcade.collide(beetle.bug, layer);
    });
    birds.forEach(function(bird) {
      self.physics.arcade.collide(player, bird.bird, function() {
        if (now > baddieHurtTimer) {
          baddieHurtTimer = now + 800;
          if(baddieHurtTimer === now + 800) {
            player.lifeCount --;
            healthText.text = 'Health: ' + player.lifeCount;
            console.log('OWIE!');
            playerSpeed -= (10 - player.lifeCount) * 10;
            console.log(playerSpeed);
          }
        }
      });
    });

    checkpointCoords.forEach(function(checkpoint) {
      if (player.body.position.x > checkpoint[0]) {
        if (testedCheckpoint[0] === 0) {
          testedCheckpoint = [checkpoint[0], checkpoint[1]];
        } else if (testedCheckpoint[0] < checkpoint[0]) {
          testedCheckpoint = [checkpoint[0], checkpoint[1]];
        }
      }
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
      airborne = false;
      jumpDegreeTimer = 0;
    }

    if(controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer && !secondJump){
        player.animations.play('jump');
        player.body.velocity.y = -400;
        jumpTimer = this.time.now + 750;
        secondJump = true;
        airborne = true;
        jumpDegreeTimer = 1;
    }

    if (airborne && controls.up.isDown && jumpDegreeTimer !== 0) {
      if (jumpDegreeTimer < 14) {
        console.log('bonus flight!');
        player.body.velocity.y -= 40;
        jumpDegreeTimer ++;
      } else {
        jumpDegreeTimer = 0;
      }
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

    ///////losing a life or just losing
    if(player.lifeCount <= 0) {
      console.log('YOU LOSE');
      console.log(player);
      player.reset(testedCheckpoint[0], testedCheckpoint[1]);
      if(lives > 0) lives --;
      livesText.text = "Lives: " + lives;
      if (lives > 0) {
        console.log('You have ' + lives + ' left');
        player.lifeCount = 10;
        playerSpeed = 300;
      } else {
        player.kill();
      }
    }

    // for testing in game
    if (controls.test.isDown) {

      console.log(checkpointCoords);
      console.log(testedCheckpoint);
      console.log(player.body.x);
      console.log(player.body.y);

      console.log(bugs);

    }

    if (controls.shoot.isDown) {
      this.shootLaser();
    }

    if(checkOverlap(lasers, enemy1.bird)) {
      enemy1.bird.kill();
    }
    if(checkOverlap(lasers, enemy2.bug)) {
      enemy2.bug.kill();
    }
    if(checkOverlap(lasers, player)) {
      if (mostRecentLaser.body.velocity.y > 0 && self.time.now > hurtTimer) {
        player.lifeCount -= 2;
        healthText.text = "Health: " + player.lifeCount;
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
    if(checkOverlap(badges, enemy2.bug)) {
      enemy2.bug.kill();
    }


    if (controls.bombom.isDown) {
      this.dropBombom();
    }

    trampolineCoords.forEach(function(trampoline) {
      if ((player.body.x >= trampoline[0] && player.body.x <= trampoline[0] + 64) && (Math.ceil(player.body.y) === trampoline[1] || Math.ceil(player.body.y) === trampoline[1] -1)) {
        console.log('triggered TRAMPOLINE');
        player.body.velocity.y = -1250;
      }
    });


//add this when right spike is on tilemap png
    // rightSpikeCoords.forEach(function(rightSpike) {
    //   if (player.body.x >= rightSpike[0]-32 && player.body.y >= rightSpike[1]-32 && player.body.x <= rightSpike[0]+32 && player.body.y <= rightSpike[1]+32) {
    //     console.log('triggered RIGHT SPIKE PAIN');
    //   }
    // });

    leftSpikeCoords.forEach(function(leftSpike) {
      if (player.body.x + 32 === leftSpike[0] && player.body.y >= leftSpike[1] && player.body.y <= leftSpike[1] + 48) {
        if (now > tileHurtTimer) {
          console.log('triggered LEFT SPIKE PAIN');
          player.lifeCount --;
          healthText.text = "Health: " + player.lifeCount;
          tileHurtTimer = now + 700;
        }
      }
    });

    upSpikeCoords.forEach(function(upSpike) {
      if ((player.body.x >= upSpike[0] && player.body.x <= upSpike[0] + 64) && Math.ceil(player.body.y) === upSpike[1]) {
        if (now > tileHurtTimer) {
          console.log('triggered TOP SPIKE PAIN');
          player.lifeCount --;
          healthText.text = "Health: " + player.lifeCount;
          tileHurtTimer = now + 700;
        }
      }
    });

    downSpikeCoords.forEach(function(downSpike) {
      if ((player.body.x >= downSpike[0] && player.body.x <= downSpike[0] + 64) && Math.floor(player.body.y)-48 === downSpike[1]) {
        if (now > tileHurtTimer) {
          console.log('triggered BOTTOM SPIKE PAIN');
          player.lifeCount --;
          healthText.text = "Health: " + player.lifeCount;
          tileHurtTimer = now + 700;
        }
      }
    });

    allSpikeCoords.forEach(function(allSpike) {
      if (player.body.x+33 >= allSpike[0] && player.body.x-1 <= allSpike[0] + 64 && player.body.y+1 >= allSpike[1] && player.body.y <= allSpike[1] + 117) {
        if (now > tileHurtTimer) {
          console.log('ALL SPIKE PAIN');
          player.lifeCount --;
          healthText.text = "Health: " + player.lifeCount;
          tileHurtTimer = now + 700;
        }
      }
    });

    lavaCoords.forEach(function(lavaTile) {
      if (player.body.x+33 >= lavaTile[0] && player.body.x-1 <= lavaTile[0] + 64 && player.body.y+1 >= lavaTile[1] && player.body.y <= lavaTile[1] + 117) {
        if (now > tileHurtTimer) {
          console.log('LAVA PAIN');
          player.lifeCount --;
          healthText.text = "Health: " + player.lifeCount;
          tileHurtTimer = now + 700;
        }
      }
    });

    if(now > cannonTimer) {
      cannonCoords.forEach(function(cannon) {
        self.fireCannon(cannon[0], cannon[1], now);
      });
      cannonTimer = now + 9000;
    }

    if(checkOverlap(bomboms, enemy1.bird)) {
      enemy1.bird.kill();
    }
    if(checkOverlap(bomboms, enemy2.bug)) {
      enemy2.bug.kill();

    }

    birds.forEach(function(bird) {
      if(checkOverlap(lasers, bird.bird)) {
        bird.bird.kill();
        score += 20;
        scoreText.text = 'Score: ' + score;
      }
      if(checkOverlap(badges, bird.bird)) {
        bird.bird.kill();
        score += 20;
        scoreText.text = 'Score: ' + score;
      }
      if(checkOverlap(bomboms, bird.bird)) {
        bird.bird.kill();
        score += 20;
        scoreText.text = 'Score: ' + score;
      }
    });

    ////bug
    ////movement
    var self = this;
    bugs.forEach(function(beetle) {
      if ((Math.floor(Math.random() * 3) === 0)) {
        if(bugCounter > 0 && bugCounter < 300 && bugCounter !== bugCounterPrev) {
          if(!beetle.bug.body.blocked.left && !beetle.bug.body.blocked.right) {
            var speed = 3;
            if((Math.floor(Math.random() * 2) === 0)) speed = 4;
            if((Math.floor(Math.random() * 3) === 0)) speed = 8;
            if((Math.floor(Math.random() * 16) === 0)) speed = 20;
            if((Math.floor(Math.random() * 2) === 0)) {
              beetle.bug.body.velocity.x -= speed;
              beetle.bug.animations.play('left');
            } else {
              beetle.bug.body.velocity.x += speed;
              beetle.bug.animations.play('left');
              beetle.bug.scale.x *= -1;
            }

          }
          if(beetle.bug.body.blocked.left) {
            beetle.bug.body.velocity.x += 2;
            if (!beetle.bug.body.blocked.up) {
              beetle.bug.body.velocity.y -= 300;
            }
          }
          if(beetle.bug.body.touching.down || beetle.bug.body.onFloor()) {
            if((Math.floor(Math.random() * 20) === 0)) {
              beetle.bug.body.velocity.y -= 500;
              if(beetle.bug.body.velocity.x > 0) {
                beetle.bug.animations.play('jump');
                beetle.bug.scale.x *= -1;
              } else if(beetle.bug.body.velocity.x <= 0) {
                beetle.bug.animations.play('jump');
              }
            }
            beetle.bug.body.velocity.x -= 10;
          }
          if(beetle.bug.body.blocked.up) {
            beetle.bug.body.velocity.y += 400;
            beetle.bug.body.velocity.x += 40;
          }
          if((Math.floor(Math.random() * 800) === 0)) {
            beetle.bug.body.velocity.x += 30;
            beetle.bug.body.position.y -= 80;
          }
          bugCounter ++;
          bugCounterPrev ++;
          if(bugCounter === 1) {
            bugCounterPrev --;
          }
        } else {
          if(!beetle.bug.body.blocked.left && !beetle.bug.body.blocked.right) {
            var speed = 3;
            if((Math.floor(Math.random() * 2) === 0)) speed = 4;
            if((Math.floor(Math.random() * 3) === 0)) speed = 8;
            if((Math.floor(Math.random() * 16) === 0)) speed = 20;
            if((Math.floor(Math.random() * 2) === 0)) {
              beetle.bug.body.velocity.x += speed;
            } else {
              beetle.bug.body.velocity.x -= speed;
            }

          }
          if(beetle.bug.body.blocked.left) {
            beetle.bug.body.velocity.x -= 2;
            if (!beetle.bug.body.blocked.up) {
              beetle.bug.body.velocity.y -= 300;
            }
          }
          if(beetle.bug.body.touching.down || beetle.bug.body.onFloor()) {
            if(beetle.bug.body.x )
            if((Math.floor(Math.random() * 20) === 0)) {
              beetle.bug.body.velocity.y -= 500;
              if(beetle.bug.body.velocity.x > 0) {
                beetle.bug.animations.play('jump');
                beetle.bug.scale.x *= -1;
              } else if(beetle.bug.body.velocity.x <= 0) {
                beetle.bug.animations.play('jump');
              }
            }
            beetle.bug.body.velocity.x += 10;
          }
          if(beetle.bug.body.blocked.up) {
            beetle.bug.body.velocity.y += 400;
            beetle.bug.body.velocity.x -= 40;
          }
          if (bugCounter === 300) bugCounterPrev ++;
          bugCounter --;
          bugCounterPrev --;
          if (bugCounter === 1) {
            bugCounter = 1;
            bugCounterPrev = 0;
          }

        }

      }


      if(checkOverlap(lasers, beetle.bug)) {
        beetle.bug.kill();
        score += 10;
        scoreText.text = 'Score: ' + score;
      }
      if(checkOverlap(badges, beetle.bug)) {
        beetle.bug.kill();
        score += 10;
        scoreText.text = 'Score: ' + score;
      }
      if(checkOverlap(bomboms, beetle.bug)) {
        beetle.bug.kill();
        score += 10;
        scoreText.text = 'Score: ' + score;

      if(checkOverlap(lasers, beetle.bug)) {
        beetle.bug.kill();
      }
      if(checkOverlap(badges, beetle.bug)) {
        beetle.bug.kill();
      }
      if(checkOverlap(bomboms, beetle.bug)) {
        beetle.bug.kill();

      }
      self.physics.arcade.collide(player, beetle.bug, function() {
        if (now > baddieHurtTimer) {
          baddieHurtTimer = now + 800;
          if(baddieHurtTimer === now + 800) {
            player.lifeCount --;
            healthText.text = 'Health: ' + player.lifeCount;
            console.log('OWIE!');
            playerSpeed -= (10 - player.lifeCount) * 5;
            console.log(playerSpeed);
          }
        }
      });
      self.physics.arcade.collide(player, cannonballs, function() {
        if (now > baddieHurtTimer) {
          baddieHurtTimer = now + 800;
          if(baddieHurtTimer === now + 800) {
            player.lifeCount -= 4;
            healthText.text = 'Health: ' + player.lifeCount;
            console.log('CANNON OWIE!');
            playerSpeed -= (10 - player.lifeCount) * 2;
            console.log(playerSpeed);
          }
        }
      });
    }
  });
},



  resetPlayer: function(){
    // map.setCollisionBetween(0,6);
    if(this.time.now > hurtTimer) {
      console.log('lost one life');
      player.lifeCount --;
      healthText.text = 'Health: ' + player.lifeCount;
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
  },

  fireCannon: function(x, y, now) {
    cannonball = cannonballs.getFirstExists(false);
    if(cannonball){
      cannonball.reset(x+32, y+64);
      cannonball.body.velocity.y = -50;
      cannonball.body.velocity.x = 600;
      if((Math.floor(Math.random() * 2) === 0)) {
        cannonball.body.velocity.x *= -1;
      }
    }
  },

};
function checkOverlap(spriteA,spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();
  return Phaser.Rectangle.intersects(boundsA, boundsB);
}
