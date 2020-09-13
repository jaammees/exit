var ACTOR_FRIEND = 1
var ACTOR_ENEMY  = 2

var ACTOR_STATE_NORMAL  = 1;
var ACTOR_STATE_EXITING = 2;
var ACTOR_STATE_EXITED  = 3;


var Actor = function(actorType) {
  var _this = this;

  var type = actorType;

  var entity = null;
  var body = null;
  var leftEye = null;
  var rightEye = null;


  var onGround = true;
  var leftFoot = null;
  var leftFootAngle = Math.PI / 2;
  var leftFootDirection = 1;
  var rightFoot = null;
  var rightFootAngle = Math.PI / 2;
  var rightFootDirection = -1;

  var speed = 0.002;//0.003;
  var position = new THREE.Vector3(0, 0, 0);
  var gridPosition = new THREE.Vector3(0, 1, 0);
  var direction = new THREE.Vector3(1, 0, 0);

  var scan = null;
  var scanHolder = null;

  var scanDirection = 1;
  var scanAngle = 0;

  var reachedExit = false;


  var state = ACTOR_STATE_NORMAL;

  var playedFallSound = false;
  var exitStartTime = false;

  _this.removeEntity = function() {
    entity.parentNode.removeChild(entity);
  }

  _this.createEntity = function() {
    entity = document.createElement('a-entity');

    if(type == ACTOR_FRIEND) {
      body = document.createElement('a-sphere');
      body.setAttribute('scale', '0.7 0.9 0.7');
      body.setAttribute('radius', '0.4');
      //body.setAttribute('radius', '0.05');
      body.setAttribute('position', '0 -0.15 0');
      body.setAttribute('material', 'color: green');
      body.setAttribute('shadow', 'receive: true; cast: true');
      
      entity.append(body);

      leftEye = document.createElement('a-box');
      leftEye.setAttribute('position', '0.4 0.12 -0.2');
      leftEye.setAttribute('scale', '0.02 0.2 0.2');
      leftEye.setAttribute('material', 'color: white');
      body.append(leftEye);

      rightEye = document.createElement('a-box');
      rightEye.setAttribute('position', '0.4 0.1.2 0.2');
      rightEye.setAttribute('scale', '0.02 0.2 0.2');
      rightEye.setAttribute('material', 'color: white');
      body.append(rightEye);

      leftFoot = document.createElement('a-sphere');
      leftFoot.setAttribute('radius', '0.16');
      leftFoot.setAttribute('position', '0 -0.5 -0.24');
      leftFoot.setAttribute('material', 'color: red');
      leftFoot.setAttribute('phi-length', '180');
      leftFoot.setAttribute('rotation', '-90 0 0');
      leftFoot.setAttribute('scale', '1 0.4 0.6')
      entity.append(leftFoot);

      rightFoot = document.createElement('a-sphere');
      rightFoot.setAttribute('radius', '0.16');
      rightFoot.setAttribute('position', '0 -0.5 0.24');
      rightFoot.setAttribute('material', 'color: red');
      rightFoot.setAttribute('phi-length', '180');
      rightFoot.setAttribute('rotation', '-90 0 0');
      rightFoot.setAttribute('scale', '1 0.4 0.6')
      entity.append(rightFoot);
    }

    if(type == ACTOR_ENEMY) {
      body = document.createElement('a-box');
      body.setAttribute('scale', '0.6 0.8 0.6');
      body.setAttribute('position', '0 -0.15 0');
      body.setAttribute('material', 'color: black');
      body.setAttribute('shadow', 'receive: true; cast: true');
      entity.append(body);

      leftEye = document.createElement('a-box');
      leftEye.setAttribute('position', '0.4 0.2 0');
      leftEye.setAttribute('scale', '0.4 0.25 0.6');
      leftEye.setAttribute('material', 'color: white');
      body.append(leftEye);

      rightEye = document.createElement('a-box');
      rightEye.setAttribute('position', '0.0 0.4 0');
      rightEye.setAttribute('scale', '0.3 0.3 0.3');
      rightEye.setAttribute('material', 'color: #554444');
      body.append(rightEye);

      /*
      rightEye = document.createElement('a-box');
      rightEye.setAttribute('position', '0.4 0.1.2 0.2');
      rightEye.setAttribute('scale', '0.02 0.2 0.2');
      rightEye.setAttribute('material', 'color: white');
      body.append(rightEye);
*/

      scanHolder = document.createElement('a-entity');
      //scanHolder.setAttribute('rotation', '0 15 0');
      entity.append(scanHolder);

      scan = document.createElement('a-cone');
      //scan.setAttribute('color', 'red');
      scan.setAttribute('material', 'shader: flat; color: red');
      scan.setAttribute('transparent', 'true');
      scan.setAttribute('opacity', '0.5');
      /*
      scan.setAttribute('rotation', '40 -90 0');    
      scan.setAttribute('scale', '0.26 1.0 0.26');
      scan.setAttribute('position', '0.5 -0.23 0');
      */
     scan.setAttribute('rotation', '50 -90 0');    
     scan.setAttribute('scale', '0.26 1.4 0.26');
     scan.setAttribute('position', '0.5 -0.16 0');

      scan.setAttribute('segments-radial', '6');
      scanHolder.append(scan);

    }
    return entity;
  },

  _this.setPosition = function(x, y, z) {
    position.x = x;
    position.y = y;
    position.z = z;
    entity.setAttribute('position', new THREE.Vector3(x, y, z));
  }

  _this.setDirection = function(x, y, z) {
    var rotationY = 0;

    if(z == -1) {
      rotationY = 90;
    } else if(z == 1) {
      rotationY = 270;
    } else if(x == -1) {
      rotationY = 180;
    } else if(x == 1) {
      rotationY = 0;
    }

    entity.setAttribute('rotation', {
      x: 0,
      y: rotationY,
      z: 0
    });
    
    direction.x = x;
//    direction.y = y;
    direction.z = z;
  }

  var setReachedExit = function(time) {
    state = ACTOR_STATE_EXITING;
    
    exitStartTime = time;
  }


  var tickExiting = function(time) {
    var timeElapsed = time - exitStartTime;

    var scale = (1 -timeElapsed / 300);

    if(scale < 0.01) {
      scale = 0.01;
      state = ACTOR_STATE_EXITED;
      g_playfield.actorExited();
    }
    entity.setAttribute('scale', new THREE.Vector3(scale, scale, scale));
    

  }
  var tickNormal = function(time, timeDelta) {
    onGround = false;
    direction.y -= timeDelta * 0.009;// 0.009;


    var x = position.x + direction.x * timeDelta * speed;
    var y = position.y + direction.y * timeDelta * speed;
    var z = position.z + direction.z * timeDelta * speed;


    var gridX = Math.floor(x + 0.5);
    var gridY = Math.floor(y);
    var gridZ = Math.floor(z + 0.5);


    // set y direction to 0 if on the ground
    if(direction.y < 0 && g_playfield.getBlockType( gridX, gridY, gridZ ) == BLOCK) {
      onGround = true;
      gridY++
      y = gridY;
      direction.y = 0;
    } else {
      //body.setAttribute('color', 'green');
    }

    var blockType = g_playfield.getBlockType( gridX, gridY, gridZ );
    if(!onGround) {
      if(direction.y < 0) {
        blockType = BLOCK_EMPTY;
      }
    }

    var triggerBlock = false;

    // in middle of tile when x = gridX
    if(direction.x < 0) {
      if(gridX - x >= 0) {
        if(gridPosition.x != gridX) {
          // need to trigger
          triggerBlock = true;
        }
        if(blockType != BLOCK_JUMP && g_playfield.getBlockType( gridX - 1, gridY, gridZ ) == BLOCK) {
          // need to turn around
          _this.setDirection(1, 0, 0);
        }

        if(type == ACTOR_ENEMY && (gridX - 1 < 0 || (blockType != BLOCK_JUMP && direction.y == 0 && g_playfield.getBlockType(gridX - 1, gridY - 1, gridZ) == BLOCK_EMPTY))) {
          _this.setDirection(1, 0, 0);
        }

      }
    }

    if(direction.x > 0) {
      if(gridX - x <= 0) {
        if(gridPosition.x != gridX) {
          // need to trigger
          triggerBlock = true;
        }
        if(blockType != BLOCK_JUMP && g_playfield.getBlockType( Math.floor(gridX + 1), Math.floor(gridY), Math.floor(gridZ) ) == BLOCK) {
          // need to turn around
          _this.setDirection(-1, 0, 0);
        }

        if(type == ACTOR_ENEMY && (gridX + 1 >= gridWidth || (blockType != BLOCK_JUMP && direction.y == 0 && g_playfield.getBlockType(gridX + 1, gridY - 1, gridZ) == BLOCK_EMPTY))) {
          _this.setDirection(-1, 0, 0);
        }


      }
    }

    if(direction.z < 0) {
      if(gridZ - z >= 0) {
        if(gridPosition.z != gridZ) {
          // need to trigger
          triggerBlock = true;
        }
        if(blockType != BLOCK_JUMP && g_playfield.getBlockType( Math.floor(gridX), Math.floor(gridY), Math.floor(gridZ - 1) ) == BLOCK) {
          // need to turn around
          _this.setDirection(0, 0, 1);
        }

        if(type == ACTOR_ENEMY && (gridZ - 1 < 0 || (blockType != BLOCK_JUMP && direction.y == 0 && g_playfield.getBlockType(gridX, gridY - 1, gridZ - 1) == BLOCK_EMPTY))) {
          _this.setDirection(0, 0, 1);
        }

      }
    }

    if(direction.z > 0) {
      if(gridZ - z <= 0) {
        if(gridPosition.z != gridZ) {
          // need to trigger
          triggerBlock = true;
        }
        if(blockType != BLOCK_JUMP && g_playfield.getBlockType( Math.floor(gridX), Math.floor(gridY), Math.floor(gridZ + 1) ) == BLOCK) {
          // need to turn around
          _this.setDirection(0, 0, -1);
        }

        if(type == ACTOR_ENEMY && (gridZ + 1 >= gridDepth || (blockType != BLOCK_JUMP && direction.y == 0 && g_playfield.getBlockType(gridX, gridY - 1, gridZ + 1) == BLOCK_EMPTY))) {
          _this.setDirection(0, 0, -1);
        }
      }
    }


    if(onGround && triggerBlock) {

      g_playfield.actorExitBlock(gridPosition.x, gridPosition.y, gridPosition.z);

      gridPosition.x = gridX;
      gridPosition.y = gridY;
      gridPosition.z = gridZ;

      g_playfield.actorEnterBlock(gridPosition.x, gridPosition.y, gridPosition.z);

      switch(g_playfield.getBlockType(gridX, gridY, gridZ)) {
        case BLOCK_EAST:
          _this.setDirection(1, 0, 0);
          // make sure in the centre
          z = gridZ;
          break;
        case BLOCK_WEST:
          _this.setDirection(-1, 0, 0);
          // make sure in the centre
          z = gridZ;
          break;
        case BLOCK_NORTH:
          _this.setDirection(0, 0, -1);
          // make sure in the centre
          x = gridX;
          break;
        case BLOCK_SOUTH:
          _this.setDirection(0, 0, 1);
          // make sure in the centre
          x = gridX;
          break;
        case BLOCK_JUMP:
          g_sound.playSound(SOUND_JUMP);
          direction.y = 3.4;          
          break;    
        case BLOCK_SWITCH_RED:
          if(g_playfield.getSwitchDown() != 'red') {
            g_sound.playSound(SOUND_RED);
          }
          g_playfield.setSwitchDown('red');
          break;
        case BLOCK_SWITCH_GREEN:
          if(g_playfield.getSwitchDown() != 'green') {
            g_sound.playSound(SOUND_GREEN);
          }
          g_playfield.setSwitchDown('green');
          break;
        case BLOCK_EXIT:
          if(type == ACTOR_FRIEND) {
            if(!g_playfield.getExitUsed(gridX, gridY, gridZ)) {
              g_sound.playSound(SOUND_EXIT);
              setReachedExit(time);
              g_playfield.setExitUsed(gridX, gridY, gridZ);
            }
          }
          break;
      }

    }

    _this.setPosition(x, y, z);

    if(y < 0 && !playedFallSound) {
      playedFallSound = true;
      g_sound.playSound(SOUND_FALL);
    }
    if(y < -20) {
      g_playfield.restartLevel();
    }

    if(type == ACTOR_FRIEND) {
      animateFriend(time, timeDelta);
    }    

    if(type == ACTOR_ENEMY) {
      animateEnemy(time, timeDelta);

      if(g_playfield.gridHasFriend(gridX, gridY, gridZ)) {
        g_sound.playSound(SOUND_DIE);
        g_playfield.restartLevel();
      }

      var friend = g_playfield.gridHasFriend(gridX + direction.x, gridY, gridZ + direction.z);
      if(friend !== false) {
        var collision = false;

        var friendPosition = friend.getPosition();
        if(direction.x > 0) {
          collision = friendPosition.x - position.x < 0.8;
        }
        if(direction.x < 0) {
          collision = position.x - friendPosition < 0.8;
        }

        if(collision) {
          g_sound.playSound(SOUND_DIE);
          g_playfield.restartLevel();
        }

      }
    }

  }


  var animateFriend = function(time, timeDelta) {

    var offset = 0;

    var radiusX = 0.12;
    var radiusY = 0.06;
    var lowestY = -0.48;//-0.49;  

    rightFootAngle = (rightFootAngle +  timeDelta / 60);

    
    var footX = radiusX * Math.cos(-rightFootAngle);
    var footY = - 0.44 + radiusY * Math.sin(-rightFootAngle);
    if(footY < lowestY) {
      offset = lowestY - footY;
      footY = lowestY;
    }
    rightFoot.setAttribute('position', { x: footX, y: footY, z: 0.22 });

    leftFootAngle = rightFootAngle + Math.PI;//(leftFootAngle +  timeDelta / 200);
    var footX = radiusX * Math.cos(-leftFootAngle);
    var footY = -0.44 + radiusY * Math.sin(-leftFootAngle);
    if(footY < lowestY) {
      offset = lowestY - footY;
      footY = lowestY;
    }

    leftFoot.setAttribute('position', { x: footX, y: footY, z: -0.22 });

    body.setAttribute('position', new THREE.Vector3(0, -0.15 + offset, 0));
/*
    leftFootAngle = (leftFootAngle + leftFootDirection * timeDelta / 500) % Math.PI;
    if(leftFootAngle < 1.2 * Math.PI / 4 && leftFootDirection < 0) {
      leftFootDirection = 1;
    }
    if(leftFootAngle > 2.5 * Math.PI / 4 && leftFootDirection > 0) {
      leftFootDirection = -1;
    }
    
    var footX = 0.4 * Math.cos(-leftFootAngle);
    var footY = 0.5 * Math.sin(-leftFootAngle);
    leftFoot.setAttribute('position', { x: footX, y: footY, z: -0.22 });

    rightFootAngle = (rightFootAngle + rightFootDirection * timeDelta / 500) % Math.PI;
    if(rightFootAngle < 1.2 * Math.PI / 4 && rightFootDirection < 0) {
      rightFootDirection = 1;
    }
    if(rightFootAngle > 2.5 * Math.PI / 4 && rightFootDirection > 0) {
      rightFootDirection = -1;
    }


    var footX = 0.4 * Math.cos(-rightFootAngle);
    var footY = 0.5 * Math.sin(-rightFootAngle);
    rightFoot.setAttribute('position', { x: footX, y: footY, z: 0.22 });
*/


  }  

  var animateEnemy = function(time, timeDelta) {
    scanAngle += scanDirection * timeDelta / 40;

    if(scanAngle > 14) {
      scanDirection = -1;
      rightEye.setAttribute('color', '#ff1111');
    }

    if(scanAngle < -14) {
      scanDirection = 1;
      rightEye.setAttribute('color', '#ff1111');
    }


    if(scanAngle > -4 && scanAngle < 4) {
      rightEye.setAttribute('color', '#554444');
    }

    scanHolder.setAttribute('rotation', new THREE.Vector3(0, scanAngle, 0));
  }

  _this.tick = function(time, timeDelta) {
    switch(state) {
      case ACTOR_STATE_NORMAL:
        tickNormal(time, timeDelta);
        break;
      case ACTOR_STATE_EXITING:
        tickExiting(time, timeDelta);
        break;
    }

  }

  _this.getType = function() {
    return type;
  }

  _this.getState = function() {
    return state;
  }

  _this.getX = function() {
    return gridPosition.x;
  }

  _this.getY = function() {
    return gridPosition.y;
  }

  _this.getZ = function() {
    return gridPosition.z;
  }

  _this.getPosition = function() {
    return position;
  }

}
