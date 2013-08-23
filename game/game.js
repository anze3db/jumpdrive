define([], function () {
  

	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer(); 
	camera = new THREE.PerspectiveCamera(ANGLE = 45,400/300, NEAR = 0.1, FAR = 1000);
	sphere = new THREE.Mesh( new THREE.SphereGeometry(50, 16, 16), new THREE.MeshLambertMaterial({color:0xCC000000}));
	pointLight = new THREE.PointLight(0xFFFFFF);

	scene.add(pointLight);
	scene.add(sphere);
	scene.add(camera);
	camera.position.z = 300;
	camera.lookAt(new THREE.Vector3(0,0,0));
	pointLight.position.z = 100;

	game = {	
			
		init : function(){
			
			renderer.setSize(400, 300);
			document.body.appendChild(renderer.domElement);
			
		},
		render : function(){
			requestAnimationFrame(game.render); 
			renderer.render(scene, camera);
		}		
	};
	return game;
});
