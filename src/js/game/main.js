var mainState = {

    create: function() {
        this.score = 0;
        this.running = true;
        this.total = 0;
        this.timer = 0;
        this.bulletTime = 0;
        this.randTime = 0;
        this.backgroundMovement = 1;

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

        // Create a group for the bullets
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

        // Add score to the game
        this.scoreText = game.add.text(20, 20, "0", { font: "30px Helvetica", fill: "#ffffff" });

    },

    update: function() {
        // Move the background image
        this.background.tilePosition.y += this.backgroundMovement;

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

        // Ship hit a planet
        game.physics.arcade.overlap(this.ship, this.planets, this.planetConnected, null, this);

        // Bullet hit an asteroid
        game.physics.arcade.overlap(this.bullets, this.asteroids, this.bulletHitAsteroid, null, this);

        // Restart the game if the ship hits an asteroid
        game.physics.arcade.overlap(this.ship, this.asteroids, this.hitAsteroid, null, this);

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
        // Disable shooting when dead
        if (this.ship.alive == false) {
            return;
        }

        if (game.time.now > this.bulletTime) {
            this.bullet = this.bullets.getFirstExists(false);

            if (this.bullet) {
                this.bullet.reset(this.ship.x +  this.ship.width/2, this.ship.y);
                this.bullet.body.velocity.y = -400;
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

        this.planet = this.planets.getFirstDead();

        this.planet.reset(Math.random() * 800, -this.planet.height);
        this.planet.body.velocity.y = 100;

        this.planet.checkWorldBounds = true;
        this.planet.outOfBoundsKill = true;
    },

    spawnAsteroids: function() {

        this.asteroid = this.asteroids.getFirstDead();

        this.asteroid.reset(Math.random() * 800, -this.asteroid.height);
        this.asteroid.body.velocity.y = 250;

        // Rotate the asteroid by a random angle
        this.asteroid.angle = game.rnd.angle();

        this.asteroid.checkWorldBounds = true;
        this.asteroid.outOfBoundsKill = true;
    },

    hitAsteroid: function() {
        // If dead already then return
        if (this.ship.alive == false) {
            return;
        }

        // Set alive property of the ship to false
        this.ship.alive = false;

        // Stop spawning planets and asteroids
        game.time.events.remove(this.timer);

        // Stop movement of all planets on the screen
        this.planets.forEachAlive(function(p) {
            p.body.velocity.y = 0;
        }, this);

        // Stop movement of all asteroids on the screen
        this.asteroids.forEachAlive(function(p) {
            p.body.velocity.y = 0;
        }, this);

        // Stop movement of all bullets on the screen
        this.bullets.forEachAlive(function(p) {
            p.body.velocity.y = 0;
        }, this);

        // Stop the background from moving
        this.backgroundMovement = 0;
    },

    bulletHitAsteroid: function() {
        this.bullet.kill();
        this.asteroid.kill();
        this.score +=50;
        this.scoreText.text = this.score;
    },

    planetConnected: function() {
        this.score +=1;
        this.scoreText.text = this.score;
    },

    randomTime: function(from, to) {
        this.randTime = Math.floor(Math.random() * to) + from;
    },

};
