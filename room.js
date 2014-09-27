var camera, scene, renderer;
var controls;
var cube;
var min = 100, max = 1000, norm = 400;
var width = norm, height = norm, depth = norm;
var yRotationSpeed = 0.001;

var maxRise = height/2-20, minRise = -(height/2-30);

var x = 0;
var y = 25;
var z = 25;

var tall = false;
var wide = false;
var narrow = false;
var shorter = false;
var cylinder = false;
var rise = 0;
var rotate = true;
var shake = false;
var closer = false;
var shakeCount = 0;
var shakeAmount = 10;

var materialStates = [false, false, false, false, false, false];
var materials;

var objs = {};

var init = function() {
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0xfffa00, 1);
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.x = x;
  camera.position.y = y;
  camera.position.z = z;
  scene = new THREE.Scene();

  controls = new THREE.TrackballControls( camera );

  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;

  controls.noZoom = false;
  controls.noPan = false;

  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

  controls.keys = [ 65, 83, 68 ];

  controls.addEventListener( 'change', renderer );

  // Tempory state change - JBG
  window.addEventListener("keydown", function(e) {
    if (e.keyCode == 87) {
      narrow = !narrow;
    } else if(e.keyCode == 72) {
      shorter = !shorter;
    } else if(e.keyCode == 67) {
      cylinder = !cylinder;
    } else if(e.keyCode == 82) {
      rise++;
    }
  });

  //var geometry = new THREE.BoxGeometry( 200, 200, 200 );
  //var texture = THREE.ImageUtils.loadTexture( 'textures/crate.gif' );
  //texture.anisotropy = renderer.getMaxAnisotropy();
  //var material = new THREE.MeshBasicMaterial( { map: texture } );
  //mesh = new THREE.Mesh( geometry, material );
  //scene.add( mesh );

  /*
  var materials = [];
  for(var i = 0; i < 6; i++) {
    var img = new Image();
    img.src = i + '.png';
    var tex = new THREE.Texture(img);
    img.tex = tex;
    img.onload = function() {
      this.tex.needsUpdate = true;
    };
    var mat = new THREE.MeshBasicMaterial({color: 0xffffff, map: tex});
    var mat = new THREE.MeshBasicMaterial({ wireframe: true, color: 'blue' });
    materials.push(mat);
  }
  */

  //var cubeGeo = new THREE.BoxGeometry(200,200,200);
  //cube = new THREE.Mesh(cubeGeo, new THREE.MeshBasicMaterial());

       
  /*
  materials = [
    //new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true, transparent: true, opacity: 0.1 } ),
    //new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true, transparent: true, opacity: 0.1 } ),
    //new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, transparent: true, opacity: 0.1 } )
    new THREE.MeshBasicMaterial( { color: 0xffffff } ),
    new THREE.MeshBasicMaterial( { color: 0xffffff } ),
    new THREE.MeshBasicMaterial( { color: 0xffffff } ),
    new THREE.MeshBasicMaterial( { color: 0xffffff } ),
    new THREE.MeshBasicMaterial( { color: 0xffffff } ),
    new THREE.MeshBasicMaterial( { color: 0xffffff } )
  ];
  */

  
  //var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  //material.side = THREE.BackSide;
  //cube = new THREE.Mesh(new THREE.BoxGeometry(400, 400, 400), material);

  updateMaterials();


  cube = new THREE.Mesh(new THREE.BoxGeometry( width, height, depth ),  new THREE.MeshFaceMaterial( materials ));
  //cube = new THREE.EdgesHelper( mesh, 0x000000 );
  //cube.material.linewidth = 2;
  //cube = THREE.SceneUtils.createMultiMaterialObject( new THREE.SphereGeometry( 75, 20, 10 ), materials );
  //scene.add( cube );

  /*
  var ambient = new THREE.AmbientLight( 0x999999 );
  scene.add( ambient );
  */

  var directionalLight = new THREE.DirectionalLight( 0xffffff );
  directionalLight.position.set( 0, 0, 1 ).normalize();
  scene.add( directionalLight );

  /*
  THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
  THREE.Loader.Handlers.add( /\.tga$/i, new THREE.TGALoader() );
  var loader = new THREE.OBJMTLLoader();

  loader.load( 'grass/Grass_02.obj', 'grass/Grass_02.mtl', function (object) {
    scene.add( object );
  });
  */

  //var edges = new THREE.WireframeHelper(cube, 0x000000);
  //edges.material.linewidth = 3;
  //scene.add(edges)

  //cube.rotation.x = Math.PI * 0.1;
  //scene.add( cube );

  window.addEventListener( 'resize', onWindowResize, false );

}

var onWindowResize = function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  controls.handleResize();
  renderer.render( scene, camera );
}

var animate = function() {
  requestAnimationFrame( animate );
  checkStates();
  //cube.rotation.x += 0.005;
  renderer.render( scene, camera );
  controls.update();
}

var checkStates = function() {

  // Get taller - jbg
  if(tall && height < max) {
    height += 1;
  } else if(!tall && height > norm) {
    height -= 1;
  }

  // Get fatter - jbg
  if(wide && width < max) {
    width += 1;
  } else if(!wide && width > norm) {
    width -= 1;
  }

  // Get skinnier - JBG
  if(narrow && width > min) {
    width -= 1;
  } else if(!narrow && width < norm) {
    width += 1;
  }

  // Get shorterer - JBG`
  if(shorter && height > min) {
    height -= 1;
  } else if(!shorter && height < norm) {
    height += 1;
  }

  // Get closer - JBG`
  if(closer && depth > min) {
    depth -= 1;
  } else if(!closer && depth < norm) {
    depth += 1;
  }

  // Handle 3 rise cases up, down, back to normal - JBG
/*
  if(rise % 3 == 1 && camera.position.y < height/2) {
    camera.position.y += 1;
  } else if(rise % 3 == 2 && camera.position.y > -height/2+y) {
    camera.position.y -= 1;
  } else if(rise % 3 == 0 && camera.position.y != y) {
    camera.position.y += camera.position.y > y ? -1 : 1;
  } 
*/

  // Adjust camera if we are leaving the room - JBG
/*
  if(camera.position.y > cube.position.y + height / 2) {
    camera.position.y = cube.position.y + height / 2;
  } else if(camera.position.y < cube.position.y - height / 2) {
    camera.position.y = cube.position.y - height / 2;
  }

  if(camera.position.x > cube.position.x + width / 2) {
    camera.position.x = cube.position.x + width / 2;
  } else if(camera.position.x < cube.position.x - width / 2) {
    camera.position.x = cube.position.x - width / 2;
  }
*/

  if(rotate) {
    cube.rotation.y += yRotationSpeed;
  }

  if(shake) {
    doShake();
  }

  var rot = cube.rotation;
  var scale = cube.scale;
  var position = cube.position;
  scene.remove(cube);
  if(cylinder)
    cube = new THREE.Mesh(new THREE.CylinderGeometry(width / 2, width / 2, height, 50), new THREE.MeshFaceMaterial( materials ));
  else 
    cube = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth),  new THREE.MeshFaceMaterial( materials ));

//var raycaster = new THREE.Raycaster(camera.position, new THREE.Vector3(camera.position).normalize());
//var intersects = raycaster.intersectObjects(cube);
//console.log(intersects);
  
  scene.add(cube);

  cube.rotation.x = rot.x;
  cube.rotation.y = rot.y;
  cube.rotation.z = rot.z;

  cube.scale.set(scale.x, scale.y, scale.z);
  cube.position.set(position.x, position.y, position.z);

  for(var key in objs) {
    obj = objs[key];
    //obj.rotation.x = rot.x;
    //obj.rotation.y = rot.y;
    //obj.rotation.z = rot.z;
  }

  //console.log('Camera: ' + camera.position.x + ' ' + camera.position.y + ' ' + camera.position.z);
}

var updateMaterials = function() {
  var img = new Image();
  img.src = 'Grid.png';
  var tex = new THREE.Texture(img);
  img.tex = tex;
  img.onload = function() {
    this.tex.needsUpdate = true;
  };
   
  var opaqueMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map: tex,  side: THREE.DoubleSide});
  var transparentMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map: tex,  side: THREE.DoubleSide, transparent: true, opacity: 0.0});
  materials = [
    materialStates[0] ? transparentMaterial : opaqueMaterial,
    materialStates[1] ? transparentMaterial : opaqueMaterial,
    materialStates[2] ? transparentMaterial : opaqueMaterial,
    materialStates[3] ? transparentMaterial : opaqueMaterial,
    materialStates[4] ? transparentMaterial : opaqueMaterial,
    materialStates[5] ? transparentMaterial : opaqueMaterial,
    materialStates[6] ? transparentMaterial : opaqueMaterial
  ];
}

var addObject = function(name, objFile, position, scale) {
  var loader = new THREE.OBJLoader();
  loader.load(objFile, function (object) {
    object.position.set(position[0], position[1], position[2]);
    object.scale.set(scale[0], scale[1], scale[2]);
    scene.add(object);
    objs[name] = object;
  });
};

var removeObject = function(name) {
  scene.remove(objs[name]);
}

var doShake = function() {
  if(++shakeCount % shakeAmount == 0) {
    camera.position.x = Math.floor(Math.random() * 2) + 1;
  } else if(shakeCount % shakeAmount == 1) {
    camera.position.y = Math.floor(Math.random() * 2) + 1;
  } else if(shakeCount % shakeAmount == 2) {
    camera.position.z = Math.floor(Math.random() * 2) + 1;
  }
};

init();
animate();

