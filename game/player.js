define([ "spaceobject" ], function(SpaceObject) {

    var collisionPlane;
    
    var moving = false;
    var force = new CANNON.Vec3(0, 0, 0);
    var speed = 20;
    var counter = 10;
    var counterDecr = 0;

    var Player = SpaceObject.extend({

        dead : false,
        init : function() {
            var self = this;

            this.geometry = new THREE.SphereGeometry(2, 10, 10);
            this._super();
            this.body.addEventListener("collide",function(e){
                //G.camera.shake(2000, e.contact.penetrationVec);
                player.dead = true;
            });
            
            this.mesh.material.color.set(0x888888);
            
            this.initLight();
            this.initText();
            this.initCollisionPlane();
            this.reset();

        },
        initLight : function() {
            var self = this;
            this.pointLight = new THREE.PointLight(0xffffff, 1, 100);
            G.scene.add(this.pointLight);
        },
        initText : function(){
            var self = this;
            this.textGeometries = [];
            this.cmaterial = new THREE.MeshLambertMaterial({
                color: 'blue' 
            });
            var text, i, cg, cn;
            for(i = 0; i <= 10; i++){
                cg = new THREE.TextGeometry( i < 10 ? "0"+i : i, 
                        {
                    size: 1, height: 0.0001, curveSegments: 3,
                    font: "helvetiker", style: "normal",
                    bevelThickness: 1, bevelSize: 0.05, bevelEnabled: true,
                    material: 0, extrudeMaterial: 1
                });
                text = new THREE.Mesh(cg, this.cmaterial);
                text.position.z = 1;
                G.scene.add(text);
                this.textGeometries.push(text);
                
            }
            
            
        },
        _getWorldCoords : function(event) {

            var body = event.data ? event.data.body : G.player.body;
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
        eventMouseMove : function(e){
            var self = G.player;
            if (moving) {
                force = self.body.position.vsub(self._getWorldCoords(e)).unit().mult(speed);
            }
        },
        eventMouseDown : function(e){
            var self = G.player;
            moving = true;
            force = self.body.position.vsub(self._getWorldCoords(e)).unit().mult(speed);
        },
        eventMouseUp : function(e){
            moving = false;
            force = new CANNON.Vec3(0, 0, 0);
        },

        initCollisionPlane : function() {
            var cpgeometry = new THREE.PlaneGeometry(3000, 3000);
            var cpmaterial = new THREE.MeshLambertMaterial({
                color : 'red'
            });

            collisionPlane = new THREE.Mesh(cpgeometry, cpmaterial);
            // G.scene.add(collisionPlane);
        },
        reset : function(){
            this.dead = false;
            this.body.position = new cv3(0,0,0);
            this.body.angularVelocity = new cv3(0,0,10);
            counter = 10;
            counterDecr = 0;
        },
        update : function(delta) {
            this.body.velocity = this.body.velocity.mult(0.9).vadd(force.negate().mult(0.1));
            if(G.camera.state == 1){
                this.body.velocity = new cv3(0,0,0);
            }
            counterDecr+=delta;
            if(counterDecr > 1000){
                counter -= 1;
                counterDecr = 0;
                
            }
            this._super();
            this.body.position.z = 0;
            for(var i = 0; i < this.textGeometries.length; i++){
                this.textGeometries[i].position.x = this.mesh.position.x-0.8;
                this.textGeometries[i].position.y = this.mesh.position.y-0.5;
                if(i == counter){
                    this.textGeometries[i].visible = true;
                }
                else{
                    this.textGeometries[i].visible = false;
                }
            }
            
            this.pointLight.position.x = this.body.position.x;
            this.pointLight.position.y = this.body.position.y-2;
            this.pointLight.position.z = this.body.position.z+5;
        }

    });
    return Player;
});