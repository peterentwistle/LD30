var bootState = {

    preload: function() {
        // Load the preload bar
        game.load.image('preloadBar', 'assets/sprites/preloadBar.png');
        game.load.image('preloadOuter', 'assets/sprites/preloadOuter.png');
    },

    create: function() {
        this.game.state.start('load');
    },
};
