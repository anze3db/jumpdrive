define(["spaceobject"], function(SpaceObject){
    var mesh;
    var light;
    var Background = Class.extend({
        objects : [],
        init: function(){
            this.initMesh();
            for(var i = 0; i < this.objects.length; i++){
                G.scene.add(this.objects[i]);
            }
            
        },
        initMesh : function(){
            this.geometry = new THREE.SphereGeometry(300, 20, 20);
            this.material = new THREE.MeshLambertMaterial({
                color: 'blue' 
            });
            //this.geometry = new THREE.CubeGeometry(2, 2, 2);
            this.mesh = mesh = new THREE.Mesh(this.geometry, this.material);
            mesh.position.z = -900;
            mesh.position.y = 590;
            
            this.objects.push(this.mesh);
            
            this.light = light = new THREE.PointLight(0xffffff, 1, 700);
            light.position.y = 790;
            light.position.z = -450;
            light.position.x = 400;
            //G.scene.add(light);
            this.objects.push(this.light);
            
            this.geometry = new THREE.CubeGeometry(2, 2, 2);
            this.material = new THREE.MeshLambertMaterial({
                color: 'gray' 
            });
            var o;
            for ( var i = 0; i < 500; i++) {
                //this.geometry = new THREE.CubeGeometry(2, 2, 2);
                o = new THREE.Mesh(this.geometry, this.material);
                o.position.x = (Math.random() - 0.5) *510;
                o.position.y = (Math.random() - 0.5) *510;
                o.position.z = (Math.random()+2) * -20;
                this.objects.push(o);

            }
            
            
            
        },
        unload : function(){
            var i;
            for (i = this.objects.length - 1; i >= 0; i--) {
                G.scene.remove(this.objects[i]);
                this.objects.splice(i, 1);
            }
        }
    });
    return Background;
});