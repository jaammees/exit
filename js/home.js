var Home = function() {
  var homeEntity = document.getElementById('home');

  var box = document.createElement('a-box');
  box.setAttribute('scale', '0.9 0.1 0.9');
  box.setAttribute('color', '#9a9a9a');
  box.setAttribute('class', 'clickable');
  homeEntity.append(box);

  var plane = document.createElement('a-plane');
  
  /*
  plane.setAttribute('material', 'flatShading: true; color: red')
  plane.setAttribute('rotation', '-90 0 0');
  plane.setAttribute('scale', '0.4 0.4 0.4');
  plane.setAttribute('position', '0 0.1 0.14');
  homeEntity.append(plane);
  */

 plane.setAttribute('material', 'flatShading: true; color: red')
 plane.setAttribute('rotation', '-90 0 0');
 plane.setAttribute('scale', '0.16 0.4 0.4');
 plane.setAttribute('position', '0.13 0.1 0.14');
 homeEntity.append(plane);

 plane = document.createElement('a-plane');
 plane.setAttribute('material', 'flatShading: true; color: red')
 plane.setAttribute('rotation', '-90 0 0');
 plane.setAttribute('scale', '0.16 0.4 0.4');
 plane.setAttribute('position', '-0.13 0.1 0.14');
 homeEntity.append(plane);

 plane = document.createElement('a-plane');
 plane.setAttribute('material', 'flatShading: true; color: red')
 plane.setAttribute('rotation', '-90 0 0');
 plane.setAttribute('scale', '0.4 0.2 0.4');
 plane.setAttribute('position', '-0.0 0.1 0.05');
 homeEntity.append(plane);

 
  plane = document.createElement('a-plane');
  plane.setAttribute('material', 'flatShading: true; color: red')
  plane.setAttribute('rotation', '-90 0 0');
  plane.setAttribute('scale', '0.1 0.4 0.4');
  plane.setAttribute('position', '0.15 0.1 -0.08');
  homeEntity.append(plane);

  
  var triangle = document.createElement('a-triangle');
  triangle.setAttribute('shadow', 'receive: true');
  triangle.setAttribute('color', 'red');
  triangle.setAttribute('material', 'flatShading: true; color: red')

  triangle.setAttribute('rotation', '-90 0 0');
  triangle.setAttribute('position', '0 0.1 -0.16');
  triangle.setAttribute('scale', '0.6 0.24 0.5');
  homeEntity.append(triangle);

  var toolText = document.createElement('a-text');
  toolText.setAttribute('value', 'Home');
  toolText.setAttribute('scale', '4 4 4');
  toolText.setAttribute('rotation', '-90 0 0');
  toolText.setAttribute('color', '#eeeeee');
  toolText.setAttribute('visible', 'false');
  toolText.setAttribute('position', '-1 0.1 -1');
  homeEntity.append(toolText);
  

  box.addEventListener('mouseenter', function(event) {
    box.setAttribute('color', '#bbbbbb');
    toolText.setAttribute('visible', 'true');
  });

  box.addEventListener('mouseleave', function(event) {
    box.setAttribute('color', '#9a9a9a');
    toolText.setAttribute('visible', 'false');
//    toolTextShadow.setAttribute('visible', 'false');
  });

  box.addEventListener('click', function(event) {
    g_sound.init();
    g_sound.playSound(SOUND_CLICK);
    //g_playfield.restartLevel();
    //console.log("HOME!!");
    g_playfield.gotoLevelSelect();
  });

  this.setPosition = function(x, y, z) {
    restartEntity.setAttribute('position', new THREE.Vector3(x, y, z));
  }


}