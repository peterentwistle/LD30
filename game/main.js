var mainState = {

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

        game.physics.arcade.enable(this.ship);

        this.ship.body.collideWorldBounds = true;

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.shoot, this);

        // Add shoot sound to the game
        this.shootSound = game.add.audio('shoot');
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

    shoot: function() {
        // Play shoot sound
        this.shootSound.play();
    },

};
