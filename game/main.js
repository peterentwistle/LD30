var mainState = {

    create: function() {
        this.running = true;
        this.total = 0;
        this.timer = 0;
        this.bulletTime = 0;

        // Set up physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Display background
        this.background = game.add.tileSprite(0, 0, 800, 750, 'bg');

        // Display the spaceship
        this.ship = this.game.add.sprite(369, 650, 'spaceship');

        game.physics.arcade.enable(this.ship);

        this.ship.body.collideWorldBounds = true;

        // Create a group for the bullet
        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(30, 'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);

        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

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

        if (this.spaceKey.isDown) {
            this.shoot();
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
        if (game.time.now > this.bulletTime) {
            bullet = this.bullets.getFirstExists(false);

            if (bullet) {
                bullet.reset(this.ship.x +  this.ship.width/2, this.ship.y);
                bullet.body.velocity.y = -400;
                this.bulletTime = game.time.now + 200;

                // Play shoot sound
                this.shootSound.play();
            }
        }
    },

};
