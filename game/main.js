require(["game"], function(game) {
	require.config({ urlArgs: "v=" +  (new Date()).getTime() });

	game.init();
	//input.init(game);
	//$(window).resize(game.camera.update);
	game.render();
});
