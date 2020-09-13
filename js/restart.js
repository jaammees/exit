var Restart = function() {
  var restartEntity = document.getElementById('restart');

  var box = document.createElement('a-box');
  box.setAttribute('scale', '0.9 0.1 0.9');
  box.setAttribute('color', '#9a9a9a');
  box.setAttribute('class', 'clickable');
  restartEntity.append(box);

  var torus = document.createElement('a-torus');
  //torus.setAttribute('color', 'orange');
  torus.setAttribute('material', 'flatShading: true; color: red')
  torus.setAttribute('rotation', '90 0 0');
  torus.setAttribute('radius', '0.25');
  torus.setAttribute('radius-tubular', '0.03');
  torus.setAttribute('position', '0 0.1 0');
  torus.setAttribute('segments-radial', '2');
  torus.setAttribute('arc', '270');
  restartEntity.append(torus);
  
  var triangle = document.createElement('a-triangle');
  triangle.setAttribute('shadow', 'receive: true');
  triangle.setAttribute('color', 'red');
  triangle.setAttribute('material', 'flatShading: true; color: red')

  triangle.setAttribute('rotation', '-90 -90 0');
  triangle.setAttribute('position', '0.1 0.1 -0.24');
  triangle.setAttribute('scale', '0.3 0.3 0.3');
  restartEntity.append(triangle);

  var toolText = document.createElement('a-text');
  toolText.setAttribute('value', 'Restart');
  toolText.setAttribute('scale', '4 4 4');
  toolText.setAttribute('rotation', '-90 0 0');
  toolText.setAttribute('color', '#eeeeee');
  toolText.setAttribute('visible', 'false');
  toolText.setAttribute('position', '-2.5 0.1 -1');
  restartEntity.append(toolText);
  

  box.addEventListener('mouseenter', function(event) {
    box.setAttribute('color', '#bbbbbb');
    toolText.setAttribute('visible', 'true');
//    toolTextShadow.setAttribute('visible', 'true');
  });

  box.addEventListener('mouseleave', function(event) {
    box.setAttribute('color', '#9a9a9a');
    toolText.setAttribute('visible', 'false');
//    toolTextShadow.setAttribute('visible', 'false');
  });

  box.addEventListener('click', function(event) {
    g_sound.init();
    g_sound.playSound(SOUND_CLICK);
    g_playfield.restartLevel();
  });

  this.setPosition = function(x, y, z) {
    restartEntity.setAttribute('position', new THREE.Vector3(x, y, z));
  }


}