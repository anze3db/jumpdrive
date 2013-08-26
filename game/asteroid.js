define([ 'spaceobject' ], function(SpaceObject) {
    var Asteroid = SpaceObject.extend({
        size : 5,
        initMesh : function(){
            this.geometry = new THREE.SphereGeometry(
                    Math.ceil(Math.random()*this.size), 
                    Math.ceil(Math.random()*2)+2, 
                    Math.ceil(Math.random()*2)+2);
            this.material = new THREE.MeshLambertMaterial({
                color: 'brown' 
            });
            this.mesh = new THREE.Mesh(this.geometry, this.material);
            G.scene.add(this.mesh);
        }
    });
    return Asteroid;
});