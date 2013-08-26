define(function(){
   
    var StaticObject = Class.extend({
        init: function(){
            this.initMesh();
        },
        initMesh : function(){
            this.geometry = this.geometry ? this.geometry :  new THREE.CubeGeometry(1, 1, 1);
            this.material = this.material ? this.material :new THREE.MeshLambertMaterial({
                color: 'red' 
            });
            this.mesh = new THREE.Mesh(this.geometry, this.material);
            G.scene.add(this.mesh);
        },
        unload : function(){
            G.scene.remove(this.mesh);
        }
    });
    return StaticObject;
});