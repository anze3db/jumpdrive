define([ "levels/level", "spaceobject", "enemyship", "largeasteroid", "bgs/background4" ], function(Level, SpaceObject,
        EnemyShip, Asteroid, Background4) {

    
    var Level4 = Level.extend({
        outStory: "&gt; I was so excited about ALIENS I accidentally placed us near <strong style='color:blue'>HUGE ASTEROIDS</strong> :/ <br /> &gt; I'm focusing really hard not to screw up again!",        load : function() {
            this._super();
        },
        initObjects : function() {
            for ( var i = 0; i < 200; i++) {
                var o = new Asteroid();
                do {
                    o.body.position.x = (Math.random() - 0.5) * 600;
                    o.body.position.y = (Math.random() - 0.5) * 600;
                    // o.body.position.z = (Math.random() - 0.5) * 10;
                } while (Math.abs(o.body.position.x) < 20 && Math.abs(o.body.position.y) < 20)
                //o.body.velocity = (new cv3(Math.random() * 10, -1 * Math.random() * 10, 0));
                o.material.color.setRGB(0,0,1);
                this.objects.push(o);

            }
            
            for ( var i = 0; i < 70; i++) {
                var o = new Asteroid();
                o.body.position.x = (Math.random()+1) * 300 * (Math.random() < 0.5 ? -1 : 1);
                o.body.position.y = (Math.random()+1) * 300 * (Math.random() < 0.5 ? -1 : 1);
                // o.body.position.z = (Math.random() - 0.5) * 10;
                var direction = o.body.position.vsub(new cv3(0,0,0)).negate().unit();
                var speed = 30;
                o.body.velocity = direction.mult(speed);
                o.material.color.setRGB(0.01,0,1);
                this.objects.push(o);

            }
        },
        initBackground : function() {
            this.background = new Background4();
        }
    });

    return Level4;

});