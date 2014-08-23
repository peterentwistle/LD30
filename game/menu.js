var menuState = {

    create: function() {
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.start, this);

        var fontStyle = {font: "45px Helvetica", fill: "#ffffff"};
        var fontStyle2 = {font: "30px Helvetica", fill: "#ffffff"};
        var fontStyle3 = {font: "20px Helvetica", fill: "#ffffff"};
        var fontStyle4 = {font: "15px Helvetica", fill: "#ffffff"};
        var x = game.world.width/2, y = game.world.height/2;

        // Add text and center on screen
        var gameNameText = this.game.add.text(x, 100, "Connected Worlds", fontStyle);
        gameNameText.anchor.setTo(0.5, 0.5);

        var startText = this.game.add.text(x, y, "Press spacebar to start", fontStyle2);
        startText.anchor.setTo(0.5, 0.5);

        var controlText = this.game.add.text(x, y + 50, "Controls: 'a' Left, 'd' Right and 'spacebar' to shoot.", fontStyle3);
        controlText.anchor.setTo(0.5, 0.5);

        var developerText = this.game.add.text(x, y + 250, "Game by Peter Entwistle", fontStyle4);
        developerText.anchor.setTo(0.5, 0.5);

    },

    start: function() {
        this.game.state.start('main');
    },
};
