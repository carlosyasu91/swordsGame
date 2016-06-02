BasicGame.Level1 = function (game) {
  this.player = null;
  this.playerSpeed = 3.5;
  this.playerMoving = false;
  this.map = null;
  this.layer = null;
  this.movementDirection = null;
  this.standingFPS = 0.75;
  this.walkingFPS = 6;

  this.movingLeft;
  this.movingRight;
  this.movingDown;
  this.movingUp;

};

BasicGame.Level1.prototype = {
  init: function () {
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;
    this.scale.pageAlignHorizontally = true;
  },
  preload: function () {    
    this.load.spritesheet('player', 'images/basicChar.png', 128, 128, 41);
    this.load.spritesheet('sword', 'images/basicSword.png', 128, 128, 41);
    this.load.tilemap('desert', 'assets/tilemaps/desert.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', 'images/desert_tiles.png');
  },
  create: function () {
    this.map = this.add.tilemap('desert');
    this.map.addTilesetImage('Desert', 'tiles');
    layer = this.map.createLayer('Ground');
    layer.resizeWorld();

    this.player = this.add.sprite(300, 200, 'player');
    this.sword = this.add.sprite(0, 0, 'sword');
    this.player.addChild(this.sword);

    this.player.anchor.setTo(0.5, 0.5);
    this.sword.anchor.setTo(0.5, 0.5);

    this.sword.animations.add('walkDown', [5,6,7,8]);
    this.sword.animations.add('walkUp', [0,1,2,3]);
    this.sword.animations.add('walkRight', [37,38,39,40]);

    this.sword.animations.add('standingDown', [10,11]);
    this.sword.animations.add('standingUp', [13,14]);
    this.sword.animations.add('standingRight', [16,17]);

    this.player.animations.add('walkDown', [5,6,7,8]);
    this.player.animations.add('walkUp', [0,1,2,3]);
    this.player.animations.add('walkRight', [37,38,39,40]);
    
    this.player.animations.add('standingDown', [10,11]);
    this.player.animations.add('standingUp', [13,14]);
    this.player.animations.add('standingRight', [16,17]);
    // this.walkUp = this.player.animations.add('attack', [14,13,12,11,10]);

  },
  update: function(){

    this.movingLeft = this.input.keyboard.isDown(Phaser.Keyboard.A);
    this.movingRight = this.input.keyboard.isDown(Phaser.Keyboard.D);
    this.movingDown = this.input.keyboard.isDown(Phaser.Keyboard.S);
    this.movingUp = this.input.keyboard.isDown(Phaser.Keyboard.W);

    saveDirection.call(this);
    // animateStanding.call(this);
    move.call(this);
    animate.call(this);

    
    function saveDirection(){
      if (this.movingLeft){
        this.movementDirection = 'left';
      } else if (this.movingRight){
        this.movementDirection = 'right';
      } else if (this.movingUp){
        this.movementDirection = 'up';
      } else if (this.movingDown){
        this.movementDirection = 'down';
      }
    }

    function animate(){
      if(checkIfMoving.call(this)){
        if (this.movingLeft){
          this.player.animations.play('walkRight', this.walkingFPS, true);
          this.sword.animations.play('walkRight', this.walkingFPS, true);
          this.player.scale.setTo(-1,1);
        } else if (this.movingRight){
          this.player.animations.play('walkRight', this.walkingFPS, true);
          this.sword.animations.play('walkRight', this.walkingFPS, true);
          this.player.scale.setTo(1,1);
        } else if (this.movingUp){
          this.player.animations.play('walkUp', this.walkingFPS, true);
          this.sword.animations.play('walkUp', this.walkingFPS, true);
        } else if (this.movingDown){
          this.player.animations.play('walkDown', this.walkingFPS, true);
          this.sword.animations.play('walkDown', this.walkingFPS, true);
        }
      } else {
        if (this.movementDirection === 'left'){
          this.player.animations.play('standingRight', this.standingFPS, true);
          this.sword.animations.play('standingRight', this.standingFPS, true);
          this.player.scale.setTo(-1,1);
        } else if (this.movementDirection === 'right'){
          this.player.animations.play('standingRight', this.standingFPS, true);
          this.sword.animations.play('standingRight', this.standingFPS, true);
          this.player.scale.setTo(1,1);
        } else if(this.movementDirection === 'up'){
          this.player.animations.play('standingUp', this.standingFPS, true);
          this.sword.animations.play('standingUp', this.standingFPS, true);
        } else if(this.movementDirection === 'down'){
          this.player.animations.play('standingDown', this.standingFPS, true);
          this.sword.animations.play('standingDown', this.standingFPS, true);
        }
      }
    }

    function move(){
      if (this.movingLeft){
        checkUpDown.call(this);
        this.player.x -= this.playerSpeed;
      } else if (this.movingRight){
        checkUpDown.call(this);
        this.player.x += this.playerSpeed;
      } else if (this.movingUp){
        this.player.y -= this.playerSpeed;
      } else if (this.movingDown){
        this.player.y += this.playerSpeed;
      }
    }

    function checkUpDown(){
      if(this.movingDown){
        this.player.y += this.playerSpeed;
      } else if(this.movingUp){
        this.player.y -= this.playerSpeed;
      }
    }

    function checkIfMoving(){
      if(this.input.keyboard.isDown(Phaser.Keyboard.A)
        || this.input.keyboard.isDown(Phaser.Keyboard.D)
        || this.input.keyboard.isDown(Phaser.Keyboard.W)
        || this.input.keyboard.isDown(Phaser.Keyboard.S)){
        return true;
      } else {
        return false;
      }
    }
  }

};