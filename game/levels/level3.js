define([ "levels/level", "spaceobject", "enemyship", "asteroid", "bgs/background3" ], function(Level, SpaceObject,
        EnemyShip, Asteroid, Background3) {

    var Level3 = Level.extend({
        
        outStory : "&gt; What were <strong style='color:red'>THOSE</strong> things? They were... following us. <br /> &gt; ALIENS!",

        
        load : function() {
            this._super();
        },
        initObjects : function() {
            var num = 10;
            for ( var i = 0; i < num; i++) {
                for (var j = 0; j < num; j++){
                    if(i == 0 || i == num-1 || j == 0 || j == num-1){
                        var o = new EnemyShip();
                        o.body.position.x = (i-num/2+1)*20; 
                        o.body.position.y = (j-num/2+1)*20;
                        this.objects.push(o);
                    }
                    
                }
            }
        },
        initBackground : function() {
            this.background = new Background3();
        }
    });

    return Level3;

});