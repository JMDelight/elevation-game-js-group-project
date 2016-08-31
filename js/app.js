var game;
var abcde = "Hi there";

$(function() {
  $('#start').click(function() {
    game = new Phaser.Game(800,600,Phaser.CANVAS,'');
    game.state.add('Boot',Game.Boot);
    game.state.add('Preloader',Game.Preloader);
    game.state.add('Mainmenu',Game.MainMenu);
    game.state.add('Level1',Game.Level1);

    game.state.start('Boot');
  })
})
