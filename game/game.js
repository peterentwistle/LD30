// Initialise Phaser
var game = new Phaser.Game(800, 750, Phaser.AUTO, 'game');

// Define the states
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('main', mainState);

// Start the load state
game.state.start('load');
