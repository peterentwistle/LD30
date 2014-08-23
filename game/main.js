var game = new Phaser.Game(800, 750, Phaser.AUTO, 'game');

var mainState = {

    preload: function() {
        game.stage.backgroundColor = '#151515';
    },

    create: function() {

    },

    update: function() {

    },

};

game.state.add('main', mainState);
game.state.start('main');
