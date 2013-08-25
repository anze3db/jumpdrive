define(function() {

    var timer = 0;
    var shakeDuration = 0;
    var shake = false;
    var shakeVector = new cv3(0,0,0);
    var directionalLight;
    var orbit;

    var Camera = Class.extend({
        state : 0,
        init : function() {
            var self = this;
            this.initKeys();
            this.pc = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000),
                    this.pc.position.z = 50;
            orbit = new THREE.OrbitControls( this.pc, G.renderer.domElement );

        },
        initKeys : function(){
            var self = this;
            $(window).keypress(function(e){
                if(e.charCode == 99){
                    self.nextState();
                }
            });
        },
        shake : function(duration, vector) {
            shakeDuration = duration;
            timer = 0;
            shake = true;
            shakeVector = vector;
        },
        resize : function() {
            // handle browser resize
        },
        update : function(delta) {
            var pos = this.pc.position;
            var playerPos = G.player.mesh.position;
            var pPos = G.player.body.position;
            if(this.state == 0){
                this.pc.lookAt(new THREE.Vector3(Game.player.body.position.x, 
                        Game.player.body.position.y, 0));
                
            }
            else if(this.state == 1){
                orbit.update();
                return;
            }
            
            if (shake && timer < shakeDuration) {
                //timer += delta;
                
                //console.log(res.z, res.y);
                
                pos.y = pPos.y * 0.01 + pos.y*0.99;
                pos.z = pos.z * 0.99 + 10*0.01;
                
            } else {
                shake = false;
                pos.x = playerPos.x;
                pos.y = playerPos.y - 30;
                pos.z = 50;
            }

        },
        nextState : function(){
            this.state += 1;
            this.state %= 2;
        }
    });
    return Camera;
});