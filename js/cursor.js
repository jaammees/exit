var Cursor = function() {
  var cursor = document.getElementById('block-cursor');
  var cursorEntities = [];

  var toolEntity = document.createElement('a-plane');
  toolEntity.setAttribute('rotation', '-90 0 0');
  toolEntity.setAttribute('position', '0 -0.52 0');
  toolEntity.setAttribute('scale', '0.9 0.9 0.9');
  toolEntity.setAttribute('color', '#444444');
  toolEntity.setAttribute('visible', false);
  cursor.append(toolEntity);
  cursorEntities.push(toolEntity);

  for(var i = 0; i < TOOL_COUNT; i++) {
    var toolEntity = document.createElement('a-entity');
    toolEntity.setAttribute('visible', false);
    cursor.append(toolEntity);  
    typeBlock = new Block(i + 1, 0.4, toolEntity);
    cursorEntities.push(toolEntity);
  }

  var type = false;
  var typeBlock = null;
  var typeEntity = null;
  var visible = false;

  this.setType = function(blockType) {
    //console.log('set cursor type' + blockType);
    if(blockType === type) {
      // already this type
      return;
    }

    type = blockType;
    for(var i = 0; i < TOOL_COUNT + 1; i++) {
      
      cursorEntities[i].setAttribute('visible', i == type);
    }

    /*
    if(typeEntity) {
      // remove old cursor
      //typeEntity.parentNode.removeChild(typeEntity);
      cursor.removeChild(typeEntity);
      typeEntity = null;
    }

    if(type != 0) {
      typeEntity = document.createElement('a-entity');
      cursor.append(typeEntity);
    }

    typeBlock = new Block(type, 0.4, typeEntity);

    if(!typeEntity) {
      // create eraser
      
      typeEntity = document.createElement('a-plane');
      typeEntity.setAttribute('rotation', '-90 0 0');
      typeEntity.setAttribute('position', '0 -0.52 0');
      typeEntity.setAttribute('scale', '0.9 0.9 0.9');
      typeEntity.setAttribute('color', '#444444');
      cursor.append(typeEntity);
    }
    */

    if(typeEntity) {
      if(!visible ) {
        cursor.setAttribute('visible', 'false');
      }
    }
  }

  this.setPosition = function(x, y, z) {
    cursor.setAttribute('position', new THREE.Vector3(x, y, z));
  }

  this.setVisible = function(cursorVisible) {
    if(cursorVisible != visible) {
      if(cursorVisible) {
        cursor.setAttribute('visible', 'true');
      } else {
        cursor.setAttribute('visible', 'false');
      }
      visible = cursorVisible;
    }
  }
}