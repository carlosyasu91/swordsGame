
BasicGame.Preloader = function (game) {

  this.background = null;
  this.preloadBar = null;

  this.ready = false;

};

BasicGame.Preloader.prototype = {

  preload: function () {

    // this.background = this.add.sprite(0, 0, 'preloaderBackground');
    // this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

    // this.load.setPreloadSprite(this.preloadBar);

    //preload main menu images
    this.load.image('logo', 'images/logo.png');
    // this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
    // this.load.audio('titleMusic', ['audio/main_menu.mp3']);
    // this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');

  },

  create: function () {


  },

  update: function () {
      this.state.start('MainMenu');  
  }

};