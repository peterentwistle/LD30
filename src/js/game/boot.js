var bootState = {

    preload: function() {
        // Load the preload bar
        game.load.image('preloadBar', 'src/assets/sprites/preloadBar.png');
        game.load.image('preloadOuter', 'src/assets/sprites/preloadOuter.png');
    },

    create: function() {
        this.game.state.start('load');
    },
};
