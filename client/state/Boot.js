var BasicGame = {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

  init: function () {
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;
    this.scale.pageAlignHorizontally = true;
  },

  preload: function () {
      //preload general images
      // this.load.image('preloaderBackground', 'images/preloader_background.jpg');
      // this.load.image('preloaderBar', 'images/preloadr_bar.png');
  },

  create: function () {
      this.state.start('Preloader');
  }

};