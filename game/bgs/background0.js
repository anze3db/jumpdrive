define(["asteroid", "bgs/background"], function(Asteroid, Background){

    var Background0 = Background.extend({
        initMesh : function(){
            this.geometry = new THREE.SphereGeometry(400, 20, 20);
            this.material = new THREE.MeshLambertMaterial({
                color: 'yellow' 
            });
            //this.geometry = new THREE.CubeGeometry(2, 2, 2);
            this.mesh = mesh = new THREE.Mesh(this.geometry, this.material);
            mesh.position.z = -900;
            mesh.position.y = 590;
            mesh.position.x = -400;
            this.objects.push(mesh);
            
            var light = new THREE.PointLight(0xffffff, 2, 700);
            light.position.y = 390;
            light.position.z = -250;
            light.position.x = -200;
            this.objects.push(light);
            
        }
    });
    return Background0;
});