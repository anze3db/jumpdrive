define([ "levels/level", "spaceobject", "largeship", "asteroid", "bgs/background0" ], function(Level, SpaceObject,
        LargeShip, Asteroid, Background0) {

    var Level5 = Level.extend({
        
        
        outStory: "&gt; More <strong style='color:orange'>ALIENS</strong>! And these were even larger than the last bunch... <br /> &gt; Don't worry, I've found a nice dark spot where we can hide.",
        
        load : function() {
            this._super();
        },
        initObjects : function() {
            var num = 5;
            for ( var i = 0; i < num; i++) {
                for (var j = 0; j < num; j++){
                    if(i == 0 || i == num-1 || j == 0 || j == num-1){
                        var o = new LargeShip();
                        o.body.position.x = (i-num/2+1)*50; 
                        o.body.position.y = (j-num/2+1)*50;
                        this.objects.push(o);
                    }
                    
                }
            }
        },
        initBackground : function() {
            this.background = new Background0();
            this.background.material.color.setRGB(1,0.5,0);
        }
    });

    return Level5;

});