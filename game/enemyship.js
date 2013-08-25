define(["spaceobject"], function(SpaceObject){
    
    var speed = 10;
    
    var EnemyShip = SpaceObject.extend({
        init : function(){
            this._super();
        },
        update : function(){
            this._super();
            var direction = this.body.position.vsub(G.player.body.position).negate().unit();
            this.body.velocity = direction.mult(speed);
        }
        
    });
    return EnemyShip;
});