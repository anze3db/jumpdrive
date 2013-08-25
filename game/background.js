define(["spaceobject"], function(SpaceObject){
    var mesh;
    var light;
    var objects = [];
    var Background = Class.extend({
        init: function(){
            this.initMesh();
            
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
            
            this.light = light = new THREE.PointLight(0xffffff, 1, 700);
            light.position.y = 790;
            light.position.z = -450;
            light.position.x = 400;
            G.scene.add(light);
            
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
                G.scene.add(o);
                objects.push(o);

            }
            
            
            G.scene.add(this.mesh);
        },
        unload : function(){
            
            G.scene.remove(mesh);
            G.scene.remove(this.light);
            var obj,i;
            for (i = objects.length - 1; i >= 0; i--) {
                obj = objects[i];
                G.scene.remove(objects[i]);
                objects.splice(i, 1);
            }
        }
    });
    return Background;
});