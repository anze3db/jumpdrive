define([ "spaceobject", "asteroid", "background" ], function(SpaceObject, Asteroid, Background) {

    var objects = [];

    var Level = Class.extend({

        gravity : new cv3(0, 0, 0),
        objects : objects,
        init : function() {
            
            this.initBackground();
            this.initObjects();
            
        },
        initBackground : function(){
            this.background = new Background();
        },
        initObjects : function(){
            for ( var i = 0; i < 50; i++) {
                var o = new SpaceObject();
                do{
                    o.body.position.x = (Math.random() - 0.5) * 100;
                    o.body.position.y = (Math.random()) * 100;
                    console.log(o.body.position.x, G.player.body.position.x);
                } while (Math.abs(o.body.position.x) < 20 && Math.abs(o.body.position.y) < 20 )
                o.body.velocity = (new cv3(Math.random() * 10, -1 * Math.random() * 10, 0));
                objects.push(o);

            }
            for ( var i = 0; i < 50; i++) {
                var o = new SpaceObject();
                do{
                    o.body.position.x = (Math.random() - 0.5) * 100;
                    o.body.position.y = (Math.random() - 1) * 100;
                } while (Math.abs(o.body.position.x) < 20 && Math.abs(o.body.position.y) < 20 )
                
                o.body.velocity = (new cv3(Math.random() * 10, Math.random() * 10, 0));
                objects.push(o);
            }
            
            
            for ( var i = 0; i < 20; i++) {
                var o = new SpaceObject();
                do{
                    o.body.position.x = (Math.random() - 2) * 100;
                    o.body.position.y = (Math.random() - 0.5) * 100;
                } while (Math.abs(o.body.position.x) < 20 && Math.abs(o.body.position.y) < 20 )
                o.body.velocity = (new cv3(Math.random() * 100, Math.random() * 10, 0));
                objects.push(o);
            }
            
            for ( var i = 0; i < 20; i++) {
                var o = new SpaceObject();
                do{
                    o.body.position.x = (Math.random() + 4) * 100;
                    o.body.position.y = (Math.random() - 0.5) * 10;
                } while (Math.abs(o.body.position.x) < 20 && Math.abs(o.body.position.y) < 20 )
                o.body.velocity = (new cv3(Math.random() * -200, Math.random() * 10, 0));
                objects.push(o);
            }
            
            
        },
        update : function() {
            for ( var i = 0; i < objects.length; i++) {
                objects[i].update();
            }
        },

        unload : function() {
            var obj,i;
            for (i = objects.length - 1; i >= 0; i--) {
                obj = objects[i];
                objects[i].unload();
                objects.splice(i, 1);
            }

        }

    });

    return Level;

});