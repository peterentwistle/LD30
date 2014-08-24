var mainState = {

    create: function() {
        this.running = true;
        this.total = 0;
        this.timer = 0;
        this.bulletTime = 0;
        this.randTime = 0;

        // Set up physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Display background
        this.background = game.add.tileSprite(0, 0, 800, 750, 'bg');

        // Create a group for planets
        this.planets = game.add.group();
        this.planets.enableBody = true;
        this.planets.physicsBodyType = Phaser.Physics.ARCADE;
        this.planets.createMultiple(10, 'bluePlanet');
        this.planets.setAll('anchor.x', 0.5);
        this.planets.setAll('anchor.y', 0.5);

        // Create a group for asteroid
        this.asteroids = game.add.group();
        this.asteroids.enableBody = true;
        this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;
        this.asteroids.createMultiple(20, 'asteroid');
        this.asteroids.setAll('anchor.x', 0.5);
        this.asteroids.setAll('anchor.y', 0.5);

        // Create a group for the bullet
        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(30, 'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);

        this.randomTime(1000, 3000);

        this.timer = game.time.events.loop(this.randTime, this.runInTimer, this);

        // Display the spaceship
        this.ship = this.game.add.sprite(369, 650, 'spaceship');

        game.physics.arcade.enable(this.ship);

        this.ship.body.collideWorldBounds = true;

        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Add shoot sound to the game
        this.shootSound = game.add.audio('shoot');

    },

    update: function() {
        // Move the background image
        this.background.tilePosition.y += 1;

        // Input
        if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            this.moveLeft();
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            this.moveRight();
        }

        if (this.spaceKey.isDown) {
            this.shoot();
        }
        this.randomTime(1000, 3000);

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
            var bullet = this.bullets.getFirstExists(false);

            if (bullet) {
                bullet.reset(this.ship.x +  this.ship.width/2, this.ship.y);
                bullet.body.velocity.y = -400;
                this.bulletTime = game.time.now + 200;

                // Play shoot sound
                this.shootSound.play();
            }
        }
    },

    runInTimer: function() {
        this.spawnPlanets();
        this.spawnAsteroids();
    },

    spawnPlanets: function() {

        var planet = this.planets.getFirstDead();

        planet.reset(Math.random() * 800, -planet.height);
        planet.body.velocity.y = 100;

        planet.checkWorldBounds = true;
        planet.outOfBoundsKill = true;
    },

    spawnAsteroids: function() {

        var asteroid = this.asteroids.getFirstDead();

        asteroid.reset(Math.random() * 800, -asteroid.height);
        asteroid.body.velocity.y = 250;

        // Rotate the asteroid by a random angle
        asteroid.angle = game.rnd.angle();

        asteroid.checkWorldBounds = true;
        asteroid.outOfBoundsKill = true;
    },

    randomTime: function(from, to) {
        this.randTime = Math.floor(Math.random() * to) + from;
    },

};
