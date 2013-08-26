define(["enemyship"], function(EnemyShip){
    
    
    var LargeShip = EnemyShip.extend({
        initMesh : function(){
            this.geometry = this.geometry ? this.geometry :  new THREE.CubeGeometry(10, 10, 10);
            this.material = this.material ? this.material :new THREE.MeshLambertMaterial({
                color: 'orange' 
            });
            this.mesh = new THREE.Mesh(this.geometry, this.material);
            G.scene.add(this.mesh);
        }
    });
    return LargeShip;
});