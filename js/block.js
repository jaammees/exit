var BLOCK_EMPTY        = 0;
var BLOCK_NORTH        = 1;
var BLOCK_EAST         = 2;
var BLOCK_SOUTH        = 3;
var BLOCK_WEST         = 4;
var BLOCK_JUMP         = 5;
var BLOCK_SWITCH_RED   = 6;
var BLOCK_SWITCH_GREEN = 7;
var BLOCK_SPIKES       = 8;
var BLOCK              = 9;
var BLOCK_RED          = 10;
var BLOCK_GREEN        = 11;
var BLOCK_EXIT         = 12;

var ARROW_COLOR = '#cc6633';
var ARROW_COLOR_ACTIVE = '#ee9988';

var Block = function(blockType, opacityValue, blockEntity) {
  var _this = this;

  var entity = false;
  if(typeof blockEntity != 'undefined') {
    entity = blockEntity;
  }

  var opacity = 1;
  if(typeof opacityValue != 'undefined') {
    opacity = opacityValue;
  }

  // some entities that make up blocks
  var button = null;
  var triangle = null;
  var plane = null;
  var box = null;
  var torusList = [];
  var torusStep = [];

  var lastTime = 0;
  var exitUsed = false;

  var type = blockType;

  _this.setSwitchDown = function(switchType) {
    
    switch(type) {
      case BLOCK_SWITCH_GREEN:
        if(switchType == 'green') {
          button.setAttribute('position', new THREE.Vector3(0, -0.56, 0));
          
        } else {
          button.setAttribute('position', new THREE.Vector3(0, -0.5, 0));
        }
        break;
      case BLOCK_SWITCH_RED:
        if(switchType == 'red') {
          button.setAttribute('position', new THREE.Vector3(0, -0.56, 0));
        } else {
          button.setAttribute('position', new THREE.Vector3(0, -0.5, 0));
        }
        break;    
      case BLOCK_RED:
        if(switchType == 'red') {
          box.setAttribute('material', 'opacity: 1;transparent: false');
          box.setAttribute('class', 'clickable');
          box.setAttribute('shadow', 'receive: true; cast: true');

        } else {
          box.setAttribute('material', 'opacity: 0.1;transparent: true');
          box.setAttribute('class', '');
          box.setAttribute('shadow', 'receive: false; cast: false');
        }
        break;
      case BLOCK_GREEN:
        if(switchType == 'green') {
          box.setAttribute('material', 'opacity: 1;transparent: false');
          box.setAttribute('class', 'clickable');
          box.setAttribute('shadow', 'receive: true; cast: true');
        } else {
          box.setAttribute('material', 'opacity: 0.1;transparent: true');
          box.setAttribute('class', '');
          box.setAttribute('shadow', 'receive: false; cast: false');
          
        }
        break;    
    }

  }

// create the entity
  var createEntity = function() {
    switch(type) {
      case BLOCK:
        entity = createBlockEntity();
        break;
      case BLOCK_RED:
        entity = createColorBlockEntity('red');
        break;
      case BLOCK_GREEN:
        entity = createColorBlockEntity('green');
        break;
      case BLOCK_NORTH:
        entity = createArrowEntity(180);      
        break;
      case BLOCK_EAST:
        entity = createArrowEntity(90);      
        break;
      case BLOCK_SOUTH:
        entity = createArrowEntity(0);      
        break;
      case BLOCK_WEST:
        entity = createArrowEntity(270);      
        break;
      case BLOCK_JUMP:
        entity = createJumpEntity();
        break;              
      case BLOCK_SWITCH_RED:
        entity = createSwitchEntity('#f00', '#e00');
        break;
      case BLOCK_SWITCH_GREEN:
        entity = createSwitchEntity('#0c0', '#0b0');
        break;
      case BLOCK_EXIT:
        entity = createExitEntity();
        break;
        /*
      case BLOCK_SPIKES:
        entity = _this.spikesTemplate.cloneNode(true);
        break;
        */

    }

  }


  _this.setExitUsed = function() {
    if(type == BLOCK_EXIT) {
      exitUsed = true;
    }
  },

  _this.getExitUsed = function() {
    return exitUsed;
  }

  _this.tick = function(time, timeDelta) {
    if(type == BLOCK_EXIT) {
      var timeThreshold = 60;
      var stepValue = 0.03;
      if(exitUsed) {
        timeThreshold = 14;
        stepValue = 0.22;
      }
      if(time - lastTime > timeThreshold) {
        lastTime = time;
        var exitFinished = true;
        var multiplier = 0.3;
        for(var i = 0; i < torusList.length; i++) {
          if(torusStep[i] !== false) {
            var value = (torusStep[i] + stepValue);
            if(!exitUsed || value < torusList.length) {
              value = value % torusList.length;
              torusStep[i] = value;
              torusList[i].setAttribute('scale', new THREE.Vector3(0.5 + value * multiplier, 0.5 + value * multiplier, 0.5 + value * multiplier));
              torusList[i].setAttribute('position', new THREE.Vector3(0, -0.5 + value * (multiplier - 0.1), 0));
              exitFinished = false;
            } else {
              torusStep[i] = false;
              torusList[i].setAttribute('visible', false);              
            }
          }
        }

        if(exitFinished) {
          type = BLOCK_EMPTY;

        }
      }
    }

    
  }

  var createExitEntity = function() {
    if(entity === false) {
      entity = document.createElement('a-entity');
    }

    for(var i = 0; i < 4; i++) {
      var torus = document.createElement('a-torus');
      //torus.setAttribute('color', 'orange');
      torus.setAttribute('material', 'flatShading: true; color: orange')
      torus.setAttribute('rotation', '90 0 0');
      torus.setAttribute('radius', '0.25');
      torus.setAttribute('radius-tubular', '0.03');
      //torus.setAttribute('position', '0 -0.5 0');
      torus.setAttribute('segments-radial', '2');
      torus.setAttribute('scale', new THREE.Vector3(0.5 + i * 0.3, 0.5 + i * 0.3, 0.5 + i * 0.3));
      torus.setAttribute('position', new THREE.Vector3(0, -0.5 + i * 0.2, 0));
      //torus.setAttribute('transparent', 'true');
      //torus.setAttribute('opacity', 1 - i/4);
      torus.setAttribute('shadow', 'receive: false; cast: true');
      entity.append(torus);
      torusList.push(torus);
      torusStep.push(i);
    }
    
    
    return entity;
  }

  var createSwitchEntity = function(colorButton, colorBase) {
    if(entity === false) {
      entity = document.createElement('a-entity');
    }

    button = document.createElement('a-cylinder');
    button.setAttribute('color', colorButton);
    button.setAttribute('height', 0.2);
    button.setAttribute('radius', 0.2);
    button.setAttribute('position', '0, -0.5, 0');
    button.setAttribute('segments-radial', 16);
    button.setAttribute('shadow', 'receive: true; cast: true');
//    return button;
    entity.append(button);
    var cylinder = document.createElement('a-cylinder');
    cylinder.setAttribute('color', colorBase);
    cylinder.setAttribute('height', 0.04);
    cylinder.setAttribute('radius', 0.29);
    cylinder.setAttribute('position', '0, -0.5, 0');
    cylinder.setAttribute('segments-radial', 16);
    cylinder.setAttribute('shadow', 'receive: true; cast: true');
    entity.append(cylinder);
    return entity;
  }

  var createBlockEntity = function() {
    if(entity === false) {
      entity = document.createElement('a-entity');
    }
    box = document.createElement('a-box');
    box.setAttribute('color', '#eeeeee');
    box.setAttribute('scale', '0.9 0.9 0.9');
    box.setAttribute('shadow', 'receive: true; cast: true');
    box.setAttribute('class', 'clickable');

    entity.append(box);
    return entity;
  }


  var createColorBlockEntity = function(color) {
    if(entity === false) {
      entity = document.createElement('a-entity');
    }
    box = document.createElement('a-box');
    
    box.setAttribute('color', color);
    box.setAttribute('material', 'transparent: true; opacity: 0.5');
    box.setAttribute('scale', '0.9 0.9 0.9');
    box.setAttribute('shadow', 'receive: true; cast: true');
    box.setAttribute('class', 'clickable');
    entity.append(box);
    return entity;
  }

  var createJumpEntity = function() {
//    <a-box  scale="0.3 0.05 0.3" position="0 -0.5 0" material="color: #555"></a-box>
//    <a-box   shadow="receive: true;"  scale="0.5 0.01 0.5" position="0 -0.45 0" material="color: yellow"></a-box>

    if(entity === false) {
      entity = document.createElement('a-entity');
    }
    box = document.createElement('a-box');
    box.setAttribute('scale', '0.3 0.05 0.3');
    box.setAttribute('position', '0 -0.5 0');
    box.setAttribute('material', 'color: #555');

    if(opacity != 1) {
      box.setAttribute('transparent', 'true');
      box.setAttribute('opacity', opacity);    
    }

    entity.append(box);

    box = document.createElement('a-box');
    box.setAttribute('scale', '0.5 0.02 0.5');
    box.setAttribute('position', '0 -0.45 0');
    box.setAttribute('material', 'color: yellow');
    if(opacity != 1) {
      box.setAttribute('transparent', 'true');
      box.setAttribute('opacity', opacity);      
    } else {
      box.setAttribute('shadow', 'receive: true; cast: true');
    }

    entity.append(box);

    return entity;
  }

  var createArrowEntity = function(angle) {
    
    if(entity === false) {
      entity = document.createElement('a-entity');
    }

    
    triangle = document.createElement('a-triangle');
    triangle.setAttribute('shadow', 'receive: true');
    triangle.setAttribute('color', ARROW_COLOR);
    triangle.setAttribute('position', '0 -0.5 0.1');
    triangle.setAttribute('vertex-a', '0 0 0.2');
    triangle.setAttribute('vertex-b', '0.2 0 -0.2');
    triangle.setAttribute('vertex-c', '-0.2 0 -0.2');

    if(opacity != 1) {
      triangle.setAttribute('transparent', 'true');
      triangle.setAttribute('opacity', opacity);      
    }
    
    entity.append(triangle);
    plane = document.createElement('a-plane');
    plane.setAttribute('shadow', 'receive: true');
    plane.setAttribute('color', ARROW_COLOR);
    plane.setAttribute('scale', '0.2 0.15 1');
    plane.setAttribute('position', '0 -0.5 -0.175');
    plane.setAttribute('rotation', '-90 0 0');

    if(opacity != 1) {
      plane.setAttribute('transparent', 'true');
      plane.setAttribute('opacity', opacity);      
    }

    entity.append(plane);

    entity.setAttribute("rotation", { x: 0, y: angle, z: 0 });
    return entity;

  }


  _this.actorEnterBlock = function() {
    switch(type) {
      case BLOCK_NORTH:
      case BLOCK_SOUTH:
      case BLOCK_EAST:
      case BLOCK_WEST:
        triangle.setAttribute('color', ARROW_COLOR_ACTIVE);
        plane.setAttribute('color', ARROW_COLOR_ACTIVE);
        break;
      case BLOCK_JUMP:
        box.setAttribute('position', new THREE.Vector3(0, -0.4, 0));
        break;
    }
  }

  _this.actorExitBlock = function() {
    switch(type) {
      case BLOCK_NORTH:
      case BLOCK_SOUTH:
      case BLOCK_EAST:
      case BLOCK_WEST:
        triangle.setAttribute('color', ARROW_COLOR);
        plane.setAttribute('color', ARROW_COLOR);
        break;
      case BLOCK_JUMP:
        box.setAttribute('position', new THREE.Vector3(0, -0.47, 0));
        break;
  
    }
  }


  _this.getEntity = function() {
    return entity;
  }

  _this.setPosition = function(x, y, z) {
    entity.setAttribute("position", new THREE.Vector3(x, y, z));
    entity.setAttribute('isblock', 'yes');
  }

  _this.setScale = function(scale) {
    if(entity) {
      
      entity.setAttribute('scale', new THREE.Vector3(scale, scale, scale));
    }
  }

  createEntity();
}