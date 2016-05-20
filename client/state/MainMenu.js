BasicGame.MainMenu = function (game) {
  this.logo = null;
  this.style = null;
  this.startGameButton = null;
};

BasicGame.MainMenu.prototype = {

  init: function () {
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;
    this.scale.pageAlignHorizontally = true;
  },

  preload: function () {
  },

  create: function () {
    this.logo = this.add.sprite(SCREEN_WIDTH/2, SCREEN_HEIGHT/2, 'logo');
    this.logo.anchor.x = 0.5;
    this.logo.anchor.y = 0.5;

    this.style = { font: "25px Arial", fill: "#292929", align: "center" };
    this.startGameButton = this.add.text(this.world.centerX, SCREEN_HEIGHT/2+100, 'Start Game', this.style);
    this.startGameButton.anchor.set(0.5);
    this.startGameButton.inputEnabled = true;
    this.startGameButton.events.onInputUp.add(start, this);

  }

};

function start(){
  this.text = 'clicked!';
  this.state.start('Level1');
}