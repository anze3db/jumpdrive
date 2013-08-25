define(function() {
    var SpaceObject = Class.extend({
        init : function(nobody) {
            var self = this;
            this.nobody = nobody;
            if(!this.nobody) this.initBody();
            this.initMesh();
        },

        initMesh : function() {
            this.geometry = new THREE.CubeGeometry(2, 2, 2);
            this.material = new THREE.MeshLambertMaterial({
                color: 'red' 
            });
            this.mesh = new THREE.Mesh(this.geometry, this.material);
            G.scene.add(this.mesh);
            
        },

        initBody : function() {
            this.body = new CANNON.RigidBody(1, new CANNON.Box(new CANNON.Vec3(1, 1, 1)));
            G.world.add(this.body);
        },
        update : function() {
            if(this.nobody) return;
            this.body.position.copy(this.mesh.position);
            this.body.quaternion.copy(this.mesh.quaternion);
        },
        unload : function() {
            if(this.nobody) G.world.remove(this.body);
            G.scene.remove(this.mesh);
        }
    });
    return SpaceObject;

});