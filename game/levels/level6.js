define([ "levels/level", "spaceobject", "enemyship", "asteroid", "bgs/background6" ], function(Level, SpaceObject,
        EnemyShip, Asteroid, Background6) {

    var Level1 = Level.extend({
        
        outStory: "&gt; There was no way I could have seen those <strong style='color:purple'>ASTEROIDS</strong>, it was completely dark! <br /> &gt; You won't be happy. I think I've just jumped us into a black hole...", 
        load : function(){
            this._super();
            G.player.pointLight.distance = 20;
        },
        unload : function(){
            this._super();
            G.player.pointLight.distance = 100;
        },
        
        initObjects : function() {
            for ( var i = 0; i < 200; i++) {
                var o = new Asteroid();
                do {
                    o.body.position.x = (Math.random() - 0.5) * 300;
                    o.body.position.y = (Math.random() - 0.5) * 300;
                    // o.body.position.z = (Math.random() - 0.5) * 10;
                } while (Math.abs(o.body.position.x) < 20 && Math.abs(o.body.position.y) < 20)
                //o.body.velocity = (new cv3(Math.random() * 10, -1 * Math.random() * 10, 0));
                    o.material.color.setRGB(0.6,0,1);
                this.objects.push(o);

            }
            
            for ( var i = 0; i < 70; i++) {
                var o = new Asteroid();
                o.body.position.x = (Math.random()+1) * 100 * (Math.random() < 0.5 ? -1 : 1);
                o.body.position.y = (Math.random()+1) * 100 * (Math.random() < 0.5 ? -1 : 1);
                // o.body.position.z = (Math.random() - 0.5) * 10;
                var direction = o.body.position.vsub(new cv3(0,0,0)).negate().unit();
                var speed = 30;
                o.body.velocity = direction.mult(speed);
                o.material.color.setRGB(0.6,0,1);
                this.objects.push(o);

            }
            
        },
        initBackground : function(){
            this.background = new Background6();
        }

    });

    return Level1;

});