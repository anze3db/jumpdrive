define([ "spaceobject" ], function(SpaceObject) {

    var collisionPlane;
    
    var moving = false;
    var force = new CANNON.Vec3(0, 0, 0);
    var speed = 20;
    var counter = 10;
    var counterDecr = 0;
    var colldown = 100;
    

    var Player = SpaceObject.extend({

        dead : false,
        damage : 0,
        lastCollision : 0,
        init : function() {
            var self = this;
            this.lastCollision = 0;
            this.geometry = new THREE.SphereGeometry(2, 10, 10);
            this._super();
            this.body.addEventListener("collide",self.collision);
            
            this.mesh.material.color.set(0x888888);
            
            this.initLight();
            this.initText();
            this.initCollisionPlane();
            this.reset();
            this.body.position.z = 2800;
            G.zoomOut = true;
            this.dead = true;
            

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
                G.scene.add(text);
                this.textGeometries.push(text);
                
            }
            
            
        },
        collision : function(e){
            if(counter > 9) return;
            if(new Date() - G.player.lastCollision  > colldown){
                G.player.damage += G.hardcore ? 0.4 : 0.2;
                G.player.lastCollision  = +new Date();
                G.collisions += 1;
                if(G.player.damage > 1){
                    
                    G.deaths += 1;
                    
                    if ( !$('#story').is(':visible') ) 
                        $('#story').fadeIn('slow', function() {});
                    $("#sc").html(" &gt; You've killed us all! <br /> &gt; But it's okay, press [right mouse button] to <strong style='color:green'>continue</strong>."); 
                    
                    
                    G.player.dead = true;
                    if(G.hardcore){
                        G.currentLevel = 0;
                    }
                }
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
            if(this.dead) this.damage = 0;
            this.dead = false;
            this.body.angularVelocity = new cv3(0,0,10);
            counter = 10;
            counterDecr = 0;
        },
        update : function(delta) {
            this.body.velocity = this.body.velocity.mult(0.9).vadd(force.negate().mult(0.1));
            if(G.camera.state == 1){
                this.body.velocity = new cv3(0,0,0);
            }
            
            if(moving){
                
                G.traveled += delta;
            }
            
            counterDecr+=delta;
            if(!this.dead && counterDecr > 1000){
                counter -= 1;
                counterDecr = 0;
                if(counter < 0 && !G.ended){
                    G.startZoomOut();
                }
                
            }
            if(G.ended || !G.start){
                counter = 10;
            }
            
            if(G.zoomOut == true){
                this.body.position.z = 0.99 * this.body.position.z + 0.01*900;
                this.body.position.y = 0.9 * this.body.position.y + 0.1*0;
                this.body.position.x = 0.9 * this.body.position.x + 0.1*0;
                counter = 10;
                counterRecr = 0;
                if(this.body.position.z > 800){
                    this.body.position.z = 800;
                    if(G.start) G.startZoomIn();
                }
            }
            else if(G.zoomIn == true){
                this.body.position.z = 0.99 * this.body.position.z + 0.1*-10;
                counter = 10;
                counterRecr = 0;
                if(this.body.position.z < 0){
                    
                    G.stopZoomIn();
                }
            }
            this._super();
            //this.body.position.z = 0;
            for(var i = 0; i < this.textGeometries.length; i++){
                this.textGeometries[i].position.x = this.mesh.position.x-0.8;
                this.textGeometries[i].position.y = this.mesh.position.y-0.5;
                this.textGeometries[i].position.z = this.mesh.position.z+1;
                if(i == counter){
                    this.textGeometries[i].visible = true;
                }
                else{
                    this.textGeometries[i].visible = false;
                }
            }
            this.material.color.setRGB(1, 1*(1-this.damage),1*(1-this.damage));
            this.pointLight.position.x = this.body.position.x;
            this.pointLight.position.y = this.body.position.y-2;
            this.pointLight.position.z = this.body.position.z+5;
            
        }

    });
    return Player;
});