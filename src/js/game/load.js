var loadState = {

    preload: function() {
        //  Set up the preloading bar
        this.preloadBar = this.add.sprite(game.width/2 - 100, game.height/2 + 100, 'preloadBar');
        this.load.setPreloadSprite(this.preloadBar);

        this.preloadOuter = this.add.sprite(game.width/2 - 105, game.height/2 + 95, 'preloadOuter');

        // Add loading text
        var fontStyle = {font: "45px Helvetica", fill: "#ffffff"};
        var x = game.world.width/2, y = game.world.height/2;
        var loadingText = this.game.add.text(x, 100, "Loading...", fontStyle);
        loadingText.anchor.setTo(0.5, 0.5);

        game.stage.backgroundColor = '#151515';
        game.load.image('spaceship', 'src/assets/sprites/spaceship.png');
        game.load.image('bg', 'src/assets/sprites/bg.png');
        game.load.image('bullet', 'src/assets/sprites/bullet.png');
        game.load.image('asteroid', 'src/assets/sprites/asteroid.png');
        game.load.image('bluePlanet', 'src/assets/sprites/bluePlanet.png');
        game.load.audio('menuTheme', 'src/assets/audio/menuTheme.wav');
        game.load.audio('shoot', 'src/assets/audio/laserShoot.wav');
    },

    create: function() {
        // Animate the preload bar
        var tween = game.add.tween(this.preloadBar).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(this.startMenu, this);

    },

    startMenu: function() {
        this.game.state.start('menu');
    },
};
