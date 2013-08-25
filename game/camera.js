define(function() {

    var timer = 0;
    var shakeDuration = 0;
    var shake = false;
    var shakeVector = new cv3(0,0,0);
    var directionalLight;
    var state = 0;

    var Camera = Class.extend({

        init : function() {
            var self = this;

            this.pc = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000),
                    this.pc.position.z = 50;

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
            if(state == 0){
                this.pc.lookAt(new THREE.Vector3(Game.player.body.position.x, 
                        Game.player.body.position.y, 0));
                
            }
            else if(state == 1){
                pos.x = 0;
                pos.y = 0;
                pos.z = 50;
                this.pc.lookAt(new THREE.Vector3(0,0,0));
                return;
            }
            else if(state == 2){
                pos.x = 0;
                pos.y = 50;
                pos.z = 0;
                this.pc.lookAt(new THREE.Vector3(0,0,0));
                return;
            }
            else if(state == 3){
                pos.x = 50;
                pos.y = 0;
                pos.z = 0;
                this.pc.lookAt(new THREE.Vector3(0,0,0));
                return;
            }
            
            if (shake && timer < shakeDuration) {
                //timer += delta;
                
                //console.log(res.z, res.y);
                
                pos.y = pPos.y * 0.01 + pos.y*0.99;
                
            } else {
                shake = false;
                pos.x = playerPos.x;
                pos.y = playerPos.y - 50;
                pos.z = 50;
            }

        },
        nextState : function(){
            state += 1;
            state %= 4;
        }
    });
    return Camera;
});