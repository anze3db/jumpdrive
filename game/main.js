require(["game"], function(game) {
    
    require.config({ urlArgs: "v=" +  (new Date()).getTime() });
    
    // I know it's ugly but it works, make game a global object
    G = game;
    
	G.init();
	$(window).resize(G.camera.resize);
	G.render();
});
