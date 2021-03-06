Game.prototype.states.endgame = function(game) {
    console.log('[end.js] creating endgame state');
    this.name = 'endgame';
    
    this.counter = 0;

    this.satellite = Models.satelliteTwo();
    
    this.satellite.scale.set(6, 6, 6);
    this.satellite.rotation.set(-0.9, 6.37, 5.39);
    this.satellite.position.set(560, 50, 40);
    
    game.scene.add(this.satellite);

    this.highscore = false;
    
    var highscore = 0 + localStorage.getItem('highscore');
    localStorage.setItem('highscore',game.gameData.score);
    if(highscore < game.gameData.score){
        this.highscore = true;
        
            this.highScoreLabel = Models.text('new record!', 50, Models.materials.flame);
            this.highScoreLabel.position.y = -100;
            game.scene.add( this.highScoreLabel );
        
    }
    
    this.scoreLabel = Models.text('your score', 60, Models.materials.body);
    this.scoreLabel.position.y = 100;
    game.scene.add( this.scoreLabel );
    
    this.scoreText = Models.text(game.gameData.score, 100, Models.materials.body );
    this.scoreText.position.y =  0;
    game.scene.add( this.scoreText );
    game.scene.rotation.x = 0;
    
    document.getElementById("score").innerHTML = 'Press space to restart!';
};

Game.prototype.states.endgame.prototype.update = function(game) {
    this.counter++;
    if(this.counter > 360) this.counter = 0;
    
    this.satellite.position.y += Math.sin(this.counter * Math.PI / 180) * 0.5;
    
    if(this.highscore){
        var scl = Math.sin(this.counter * Math.PI / 180) / 10 +1
        this.highScoreLabel.scale.set(scl, scl, scl);
        // this.highScoreLabel.position.x = -20*(Math.sin(this.counter * Math.PI / 180));
    }
    if(game.keyboard.pressed('space')){
        game.setState('planets');
    }
};

Game.prototype.states.endgame.prototype.destroy = function destroy(game) {
    console.log('[title.js] destroying title state');
    game.removeMesh(this.satellite);
    game.removeMesh(this.scoreLabel);
    game.removeMesh(this.scoreText);
    if(this.highscore){
        game.removeMesh(this.highScoreLabel);
    }
};
