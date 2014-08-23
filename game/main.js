var game = new Phaser.Game(800, 750, Phaser.AUTO, 'game');

var mainState = {

    preload: function() {
        game.stage.backgroundColor = '#151515';

        game.load.image('spaceship', 'assets/sprites/spaceship.png');
        //game.load.image('star', 'assets/sprites/star.png');
        game.load.image('bg', 'assets/sprites/bg.png');
    },

    create: function() {
        // This function is called after the preload function

        this.running = true;
        this.total = 0;
        this.timer = 0;

        // Set up physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Display background
        this.background = game.add.tileSprite(0, 0, 800, 750, 'bg');

        // Display the spaceship
        this.ship = this.game.add.sprite(369, 650, 'spaceship');
        game.world.bringToTop(this.ship);

        game.physics.arcade.enable(this.ship);
        this.ship.body.gravity.x = 0;

    },

    update: function() {
        // Move the background image
        this.background.tilePosition.y += 2;

        // Input
        if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            this.moveLeft();
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            this.moveRight();
        }

    },

    moveLeft: function() {
        // Disable movement if ship is dead
        if (this.ship.alive == false) {
            return;
        }
        this.ship.x -= 10;
    },

    moveRight: function() {
        // Disable movement if ship is dead
        if (this.ship.alive == false) {
            return;
        }
        this.ship.x += 10;
    },

};

game.state.add('main', mainState);
game.state.start('main');
