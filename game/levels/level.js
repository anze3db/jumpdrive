define([ "spaceobject", "enemyship", "asteroid", "bgs/background" ], function(SpaceObject, EnemyShip, Asteroid, Background) {

    var objects = [];
    var constraints = [];

    var Level = Class.extend({

        story : "",
        outStory : "",
        gravity : new cv3(0, 0, 0),
        objects : objects,
        constrainsts : constraints,
        load : function(){
            G.world.gravity = this.gravity.copy();
            this.initBackground();
            this.initObjects();
            
        },
        init : function() {
            
            this.gravity = new cv3(0, 0, 0);
            
        },
        initBackground : function(){
            this.background = new Background();
        },
        initEnemies : function(){
            
            for(var i = 0; i < 5; i++){
                var e = new EnemyShip();
                e.body.position.y = 10;
                e.body.position.x = (i-5)*10;

                objects.push(e);
                if(i > 0)
                    constraints.push(new CANNON.DistanceConstraint(
                            objects[i].body, objects[i-1].body, 5, 1000));
            }
            for(var i=0; i<constraints.length; i++)
                G.world.addConstraint(constraints[i]);
        },
        initObjects : function(){
            for ( var i = 0; i < 50; i++) {
                var o = new SpaceObject();
                do{
                    o.body.position.x = (Math.random() - 0.5) * 100;
                    o.body.position.y = (Math.random()) * 100;
                } while (Math.abs(o.body.position.x) < 20 && Math.abs(o.body.position.y) < 20 )
                o.body.velocity = (new cv3(Math.random() * 10, -1 * Math.random() * 10, 0));
                objects.push(o);

            }
//            for ( var i = 0; i < 50; i++) {
//                var o = new SpaceObject();
//                do{
//                    o.body.position.x = (Math.random() - 0.5) * 100;
//                    o.body.position.y = (Math.random() - 1) * 100;
//                } while (Math.abs(o.body.position.x) < 20 && Math.abs(o.body.position.y) < 20 )
//                
//                o.body.velocity = (new cv3(Math.random() * 10, Math.random() * 10, 0));
//                objects.push(o);
//            }
//            
//            
//            for ( var i = 0; i < 20; i++) {
//                var o = new SpaceObject();
//                do{
//                    o.body.position.x = (Math.random() - 2) * 100;
//                    o.body.position.y = (Math.random() - 0.5) * 100;
//                } while (Math.abs(o.body.position.x) < 20 && Math.abs(o.body.position.y) < 20 )
//                o.body.velocity = (new cv3(Math.random() * 100, Math.random() * 10, 0));
//                objects.push(o);
//            }
//            
//            for ( var i = 0; i < 20; i++) {
//                var o = new SpaceObject();
//                do{
//                    o.body.position.x = (Math.random() + 4) * 100;
//                    o.body.position.y = (Math.random() - 0.5) * 10;
//                } while (Math.abs(o.body.position.x) < 20 && Math.abs(o.body.position.y) < 20 )
//                o.body.velocity = (new cv3(Math.random() * -200, Math.random() * 10, 0));
//                objects.push(o);
//            }
            
            
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
            this.background.unload();
        }

    });

    return Level;

});