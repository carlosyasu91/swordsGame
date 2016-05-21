BasicGame.Level1 = function (game) {
  this.player = null;
  this.playerSpeed = 5;
  this.playerMoving = false;
  this.map = null;
  this.layer = null;
  this.movementDirection = null;
  this.keyPressed = null;
};

BasicGame.Level1.prototype = {

  init: function () {
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;
    this.scale.pageAlignHorizontally = true;
  },

  preload: function () {    this.load.spritesheet('player', 'images/basicChar.png', 64, 64, 19);
    this.load.tilemap('desert', 'assets/tilemaps/desert.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', 'images/desert_tiles.png');
  },

  create: function () {
    this.map = this.add.tilemap('desert');
    this.map.addTilesetImage('Desert', 'tiles');
    layer = this.map.createLayer('Ground');
    layer.resizeWorld();

    this.player = this.add.sprite(300, 200, 'player');
    this.player.anchor.setTo(.5, 1);

    this.walkDown = this.player.animations.add('walkDown', [4,5,6,7]);
    this.walkUp = this.player.animations.add('walkUp', [0,1,2,3]);
    this.walkUp = this.player.animations.add('walkRight', [15,16,17,18]);
    this.walkUp = this.player.animations.add('attack', [14,13,12,11,10]);
    this.standing = this.player.animations.add('standing', [8,9]);
  },

  update: function(){

    checkDirection.call(this);
    if (this.input.keyboard.isDown(Phaser.Keyboard.A)){
      this.player.x -= this.playerSpeed;
    }
    if (this.input.keyboard.isDown(Phaser.Keyboard.D)){
      this.player.x += this.playerSpeed;
    } 
    if (this.input.keyboard.isDown(Phaser.Keyboard.W)){
      this.player.y -= this.playerSpeed;
    }
    if (this.input.keyboard.isDown(Phaser.Keyboard.S)){
      this.player.y += this.playerSpeed;
    }
    if(!checkMovement.call(this)){
      this.player.animations.play('standing', 1, true);
    }
    if(this.input.keyboard.event){
      this.keyPressed = this.input.keyboard.event.which;
    }
    function checkMovement(){
      if(this.input.keyboard.isDown(Phaser.Keyboard.A)
        || this.input.keyboard.isDown(Phaser.Keyboard.D)
        || this.input.keyboard.isDown(Phaser.Keyboard.W)
        || this.input.keyboard.isDown(Phaser.Keyboard.S)){
        return true;
      } else {
        return false;
      }
    }

    function checkDirection(){
      if(this.input.keyboard.event && this.input.keyboard.event.which !== this.keyPressed){
        if (this.input.keyboard.isDown(Phaser.Keyboard.A)){
          this.walkUp = this.player.animations.play('walkRight', 6, true);
          this.player.scale.setTo(-1,1);
          this.movementDirection = 'left';
        }
        if (this.input.keyboard.isDown(Phaser.Keyboard.D)){
          this.walkUp = this.player.animations.play('walkRight', 6, true);
          this.player.scale.setTo(1,1);
          this.movementDirection = 'right';
        }
        if (this.input.keyboard.isDown(Phaser.Keyboard.W)){
          this.walkUp = this.player.animations.play('walkUp', 6, true);
          this.movementDirection = 'up';
        }
        if (this.input.keyboard.isDown(Phaser.Keyboard.S)){
          this.player.animations.play('walkDown', 6, true);
          this.movementDirection = 'down';
        }
      }
    }
  }

};