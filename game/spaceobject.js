define(function() {
    var SpaceObject = Class.extend({
        init : function() {
            var self = this;
            this.initMesh();
            this.initBody();
        },

        initMesh : function() {
            this.geometry = this.geometry ? this.geometry :  new THREE.CubeGeometry(10, 10, 10);
            this.material = this.material ? this.material :new THREE.MeshLambertMaterial({
                color: 'red' 
            });
            this.mesh = new THREE.Mesh(this.geometry, this.material);
            G.scene.add(this.mesh);
            
        },

        initBody : function() {
            
            if(this.geometry instanceof THREE.CubeGeometry){
                
                this.body = new CANNON.RigidBody(1, new CANNON.Box(
                        new CANNON.Vec3(this.geometry.width/2, this.geometry.height/2, this.geometry.depth/2)));
            }
            else if(this.geometry instanceof THREE.SphereGeometry){
                console.log("adding a sphere body");
                this.body = new CANNON.RigidBody(1, new CANNON.Sphere(this.geometry.radious));
            }
            
            G.world.add(this.body);
        },
        update : function() {
            this.body.position.copy(this.mesh.position);
            this.body.quaternion.copy(this.mesh.quaternion);
        },
        unload : function() {
            G.world.remove(this.body);
            G.scene.remove(this.mesh);
        }
    });
    return SpaceObject;

});