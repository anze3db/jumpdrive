define([ "camera", "player", "levels/level6", "levels/level5", "levels/level4", "levels/level3", "levels/level2",
        "levels/level1", "levels/level0", "input" ], function(Camera, Player, Level6, Level5, Level4, Level3, Level2,
        Level1, Level0, Input) {

    var world, scene, camera, renderer, timeStep = 1 / 60, level, stats;
    var prevTime = +new Date();
    var levels = [ new Level0, new Level1, new Level2, new Level3, new Level4, new Level5, new Level6 ];
    var tutorial = true;
    
    Game = {
        
        removeMe : [],
        currentLevel : 0,
        collisions : 0,
        deaths : 0,
        traveled : 0,
        zoomOut : false,
        zoomIn : false,
        hardcore : false,
        start : false,
        ended : false,
        init : function() {

            if (!G.checkWebGL())
                return;
            G.initThree();
            G.initCannon();
            G.initPlayer();
            G.initLights();
            //G.initStats();
            G.initInput();

            G.loadLevel();
            $('#story').fadeIn('slow', function() {});
            $("#sc").html("&gt; Greetings captain, my name is Arnold J. Rimmer. I'm your new navigation officer.<br />&gt; I've heard good things about this ship, the Jump Drive is really impressive. It only has <strong style='color:blue;'>10 SECONDS</strong> of cooldown.<br />&gt; Press your [right mouse button] when you'll be ready for the first jump.");
            G.update();

        },
        checkWebGL : function() {
            if (!Detector.webgl) {
                document.body.appendChild(Detector.getWebGLErrorMessage());
                return false;
            }
            return true;
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
            world.defaultContactMaterial.contactEquationStiffness = 1e3;
            world.defaultContactMaterial.contactEquationRegularizationTime = 1;
            world.solver.tolerance = 0.1;
        },
        initPlayer : function() {
            this.camera = camera = new Camera();
            this.player = player = new Player();
        },
        initLights : function() {

            // add subtle ambient lighting

            // directional lighting
            var light = new THREE.Light(0x111111); // soft white light
            scene.add(light);

        },
        initStats : function() {
            // STATS
            stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.bottom = '0px';
            stats.domElement.style.zIndex = 100;
            document.body.appendChild(stats.domElement);
        },
        initInput : function() {
            this.input = new Input();
        },
        loadLevel : function() {

            if (this.currentLevel == levels.length) {
                this.endGame();
                this.ended = true;
                return;
            }

            this.level = level = levels[this.currentLevel];
            level.load();

        },
        nextStory : function(){
            
            
        },
        restartLevel : function() {
            if (!player.dead)
                return;
            G.startZoomOut();
        },
        nextLevel : function() {
            if (this.ended)
                return;
            level.unload();
            if (!G.player.dead)
                this.currentLevel += 1;

            this.loadLevel();
        },
        startZoomOut : function() {
            if(G.player.dead){
                $("#sc").html("Here we go, good as new."); 
            }
            else if(levels[this.currentLevel].outStory == ""){
                $('#story').fadeOut('slow', function() {});
            }
            else{
                if ( !$('#story').is(':visible') ) 
                    $('#story').fadeIn('slow', function() {});
                $("#sc").html(levels[this.currentLevel].outStory);  
            }
            this.zoomOut = true;
        },
        startZoomIn : function() {
            if(tutorial){
                tutorial = false;
                $("#sc").html(levels[0].story);  
            }
            
            
            this.zoomOut = false;
            this.nextLevel();
            G.player.reset();
            this.zoomIn = true;
            
        },
        stopZoomIn : function(){
            G.zoomIn = false;
            
            if(this.currentLevel == levels.length){
                //$("#sc").html("&gt; <strong style='color:red'>GOOD</strong> news: It wasn't a black hole! <strong style='color:green'>BAD</strong> news: It's the end of the game. Thanks for playing! <br /> &gt; If this was too easy, try out the <strong style='color:purple'>hardcore mode</strong> [long press right mouse button]");
            }
            else if(levels[this.currentLevel].story == ""){
                $('#story').fadeOut('slow', function() {});
            }
            else{
                if ( !$('#story').is(':visible') ) 
                    $('#story').fadeIn('slow', function() {});
                $("#sc").html(levels[this.currentLevel].story);  
            }
                
        },
        endGame : function() {
            $('#end').fadeIn('slow', function() {});
            if(this.hardcore){
                $("#hcp").html("You are really <strong style='color:green'>awesome</strong>, but I bet you already knew that. Here enjoy this <a href='http://www.youtube.com/watch?v=E4TLto-nKfU'>video</a> as a reward for your hard work!");
                $("#hardcore").fadeIn('slow', function() {});
                
                
            }
            $('#gstats').fadeIn('slow', function() {});
            $("#colls").html(G.collisions);
            $("#deaths").html(G.deaths);
            $("#traveled").html(G.traveled);
            this.ended = true;
        },
        update : function() {
            requestAnimationFrame(G.update);
            G.updatePhysics();
            G.render();
        },
        updatePhysics : function() {

            for (i = this.removeMe.length - 1; i >= 0; i--) {
                this.world.remove(this.removeMe[i]);
                this.removeMe.splice(i, 1);
            }

            var delta = new Date() - prevTime;
            prevTime = +new Date();

            player.update(delta);
            camera.update(delta);
            if (player.dead || this.ended)
                return;

            // Step the physics world

            world.step(timeStep);

            //stats.update();
            level.update(delta);

        },
        render : function() {
            renderer.render(scene, this.camera.pc);
        }

    };
    return Game;
});
