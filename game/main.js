require.config({ urlArgs: "v=" +  (new Date()).getTime() });
require(["game"], function(game) {
    
    
    // I know it's ugly but it works, make game a global object
    G = game;
    
	G.init();
	$(window).resize(G.camera.resize);
	G.render();
});
