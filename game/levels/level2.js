define([ "levels/level", "spaceobject", "enemyship", "asteroid", "bgs/background2" ], function(Level, SpaceObject,
        EnemyShip, Asteroid, Background2) {

    var Level2 = Level.extend({
        
        outStory : "&gt; SORRY AGAIN! I'm 100% sure there are NO asteroids at the next jump location.",
        
        
        load : function() {
            this.gravity.y = -5;
            this._super();
        },
        initObjects : function() {
            for ( var i = 0; i < 200; i++) {
                var o = new Asteroid();
                do {
                    o.body.position.x = (Math.random() - 0.5) * 200;
                    o.body.position.y = (Math.random()) * 300;
                    // o.body.position.z = (Math.random() - 0.5) * 10;
                } while (Math.abs(o.body.position.x) < 20 && Math.abs(o.body.position.y) < 20)
                // o.body.velocity = (new cv3(Math.random() * 10, -1 *
                // Math.random() * 10, 0));

                this.objects.push(o);

            }
        },
        initBackground : function() {
            this.background = new Background2();
        }
    });

    return Level2;

});