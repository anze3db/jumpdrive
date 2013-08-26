define(["levels/level", "spaceobject", "enemyship", "asteroid", "bgs/background0" ], function(Level, SpaceObject, EnemyShip, Asteroid, Background0) {

    var Level0 = Level.extend({

        story : "&gt; There seem to be a few <strong style='color:brown'>ASTEROIDS</strong> here. Try not to hit them. Move by holding the [right mouse button].<br /> &gt; I'll jump us to a safer spot when the cooldown reaches 0.",
        outStory : "&gt; Whoops, even more <strong style='color:brown'>ASTEROIDS</strong> at our next location. Brace yourself.",
        
        load : function(){
            this._super();
        },
        
        initBackground : function(){
            
            
            
            this.background = new Background0();
            
            
        },
        initObjects : function(){            
            for ( var i = 0; i < 3; i++) {
                var o = new Asteroid();
                do {
                    o.body.position.x = (Math.random() - 0.5) * 40;
                    o.body.position.y = (Math.random() - 0.5) * 40;
                    // o.body.position.z = (Math.random() - 0.5) * 10;
                } while (Math.abs(o.body.position.x) < 10 && Math.abs(o.body.position.y) < 10)
                //o.body.velocity = (new cv3(Math.random() * 10, -1 * Math.random() * 10, 0));
                
                this.objects.push(o);

            }
        },
    });

    return Level0;

});