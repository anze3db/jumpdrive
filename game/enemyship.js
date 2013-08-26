define(["spaceobject"], function(SpaceObject){
    
    var speed = 10;
    
    var EnemyShip = SpaceObject.extend({
        init : function(){
            this._super();
            var self = this;
        },
        update : function(){
            this._super();
            var self = this;
            if(G.zoomIn) return;
            var direction = this.body.position.vsub(G.player.body.position).negate().unit();
            this.body.velocity = direction.mult(speed);
        }
        
    });
    return EnemyShip;
});