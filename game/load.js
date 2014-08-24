var loadState = {

    preload: function() {
        game.stage.backgroundColor = '#151515';
        game.load.image('spaceship', 'assets/sprites/spaceship.png');
        game.load.image('bg', 'assets/sprites/bg.png');
        game.load.audio('menuTheme', 'assets/audio/menuTheme.wav');
        game.load.audio('shoot', 'assets/audio/laserShoot.wav');
    },

    create: function() {
        this.game.state.start('menu');
    },
};
