define([ "camera", "player", "level"], function(Camera, Player, Level) {

    var world, scene, camera, renderer, timeStep = 1 / 60, level;
    var prevTime = +new Date();

    Game = {

        init : function() {
 
            G.initThree();
            G.initCannon();
            G.initPlayer();
            G.initLights();
            
            G.loadLevel();

            G.update();
            
            
            

        },
        initThree : function() {

            this.scene = scene = new THREE.Scene();

            this.renderer = renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
        },
        initCannon : function() {

            this.world = world = new CANNON.World();
            world.gravity.set(0, 0, 0);
            world.broadphase = new CANNON.NaiveBroadphase();
            world.solver.iterations = 1;
        },
        initPlayer : function() {
            this.camera = camera = new Camera();
            this.player = player = new Player();
        },
        initLights : function(){
            
            
//             add subtle ambient lighting
            
            // directional lighting
            var light = new THREE.Light( 0x111111 ); // soft white light
            scene.add( light );
            
        },
        loadLevel : function(){
            this.level = level = new Level();
            world.gravity = level.gravity;
            
        },
        update : function() {
            requestAnimationFrame(G.update);
            G.updatePhysics();
            G.render();
        },
        updatePhysics : function() {

            var delta = new Date() - prevTime;
            prevTime = +new Date();
            
            camera.update(delta);
            if(player.dead) return;
            
            // Step the physics world
            player.update(delta);
            world.step(timeStep);
            
            level.update(delta);
            
        },
        render : function() {
            renderer.render(scene, this.camera.pc);
        }

    };
    return Game;
});
