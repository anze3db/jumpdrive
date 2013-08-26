define(['staticobject'], function(StaticObject) {
    var SpaceObject = StaticObject.extend({
        init : function() {
            var self = this;
            this._super();
            this.initBody();
        },

        initBody : function() {
            
            if(this.geometry instanceof THREE.CubeGeometry){
                
                this.body = new CANNON.RigidBody(1, new CANNON.Box(
                        new CANNON.Vec3(this.geometry.width/2, this.geometry.height/2, this.geometry.depth/2)));
            }
            else if(this.geometry instanceof THREE.SphereGeometry){
                this.body = new CANNON.RigidBody(1, new CANNON.Sphere(this.geometry.radius*0.8));
            }
            
            G.world.add(this.body);
        },
        update : function() {
            this.body.position.copy(this.mesh.position);
            this.body.quaternion.copy(this.mesh.quaternion);
        },
        unload : function() {
            
            this._super();
            G.world.remove(this.body);
            
        }
    });
    return SpaceObject;

});