define([ "spaceobject" ], function(SpaceObject) {

    var collisionPlane;
    
    var moving = false;
    var force = new CANNON.Vec3(0, 0, 0);

    var Player = SpaceObject.extend({

        dead : false,
        init : function() {
            var self = this;

            this._super();

            this.body.addEventListener("collide",function(e){
                G.camera.shake(2000, e.contact.penetrationVec);
                player.dead = true;
            });
            
            
            this.mesh.material.color.set(0x888888);
            
            
            
            
            this.initLight();
            this.initCollisionPlane();
            this.initMouseEvents();

        },
        initLight : function() {
            var self = this;
            this.pointLight = new THREE.PointLight(0xffffff, 1, 100);
            G.scene.add(this.pointLight);
        },
        _getWorldCoords : function(event) {

            var body = event.data.body;
            var projector = new THREE.Projector();
            var camera = G.camera.pc;
            var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1,
                    -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
            projector.unprojectVector(vector, camera);

            var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

            var pc = raycaster.intersectObject(collisionPlane);
            if(pc.length == 0) return new cv3(0,0,0);
            return pc[0].point;
        },
        initMouseEvents : function() {
            var self = this;

            $(window).mousemove(self, function(e) {
                e.preventDefault();
                var self = e.data;
                if (moving) {
                    force = self.body.position.vsub(self._getWorldCoords(e));
                }
            });
            $(window).mousedown(self, function(e) {
                e.preventDefault();
                var self = e.data;
                moving = true;
                force = self.body.position.vsub(self._getWorldCoords(e));
            });
            $(window).mouseup(self, function(e) {
                e.preventDefault();
                moving = false;
                force = new CANNON.Vec3(0, 0, 0);
            });
        },
        initCollisionPlane : function() {
            var cpgeometry = new THREE.PlaneGeometry(3000, 3000);
            var cpmaterial = new THREE.MeshLambertMaterial({
                color : 'red'
            });

            collisionPlane = new THREE.Mesh(cpgeometry, cpmaterial);
            // G.scene.add(collisionPlane);
        },
        update : function() {
            this.body.velocity = this.body.velocity.mult(0.9).vadd(force.negate().mult(0.1));
            this.body.position.z = 0;
//            G.camera.pc.position.x = this.body.position.x;
//            G.camera.pc.position.y = this.body.position.y - 50;
//            G.camera.pc.position.z = 50;

            
            this.pointLight.position.x = this.body.position.x;
            this.pointLight.position.y = this.body.position.y-2;
            this.pointLight.position.z = this.body.position.z+5;
            
//            this.pointLight.position = G.camera.pc.position;
            
             // g.camera.pc.position = this.body.position;
            // g.camera.pc.position.z -= 50;
            this._super();
            //this.body.quaternion.copy(this.mesh.quaternion);
            
            //light.position = this.mesh.position;
            //console.log(this.body.position.x, this.body.position.y, this.body.position.z)
            //console.log(light.position.x, light.position.y, light.position.z)
        }

    });
    return Player;
});