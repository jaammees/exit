
var g_playfield = null;
var g_sound = null;
var gridWidth = 0;
var gridDepth = 0;
var gridHeight = 0;
var TOOL_COUNT = 5;

var Playfield = function() {
  var _this = this;
  var currentLevel = 0;


  var grid = [];
  var blocks = [];
  var actors = [];

  var playfield = null;
  var controls = null;

//  var scale = 0.3;

  var scene = null;
  var holder = null;
  var switchDown = false;
  var palette = null;
  var paletteEntity = null;
  var levelSelect = null;
  var restart = null;
  var home = null;
  var cursor = null;

  var cameraRotation = null;
  var vrMode = -1;


  var state = STATE_LEVEL_STARTING;


  var lastTime = false;
  var levelStartTime = false;
  var levelFinishTime = false;
  

  var STATE_LEVEL_STARTING  = 1;
  var STATE_PLAYING         = 2;
  var STATE_LEVEL_FINISHING = 3;
  var STATE_LEVEL_DONE      = 4;
  var STATE_LEVEL_RESTART   = 5;
  var STATE_GOTO_LEVEL_SELECT = 6;  
  var STATE_LEVEL_SELECT    = 7;


  var laser = null;

  _this.init = function() {
    g_sound = new Sound();

    cursor = new Cursor();
    palette = new Palette(cursor);
    paletteEntity = palette.getEntity();
    restart = new Restart();
    home = new Home();

    levelSelect = new LevelSelect();

    playfield = document.getElementById('playfield');
    controls = document.getElementById('controls');

    laser = document.getElementById('laser');

    holder = document.getElementById('holder');

    scene = document.querySelector('a-scene');
    cameraRotation = document.getElementById('camera-rotation');
    scene.addEventListener('enter-vr', function(event) {
    });

    scene.addEventListener('exit-vr', function(event) {
    });

    _this.startLevel(currentLevel);
  }

  var initGrid = function(width, height, depth) {
    gridWidth = width;
    gridHeight = height;
    gridDepth = depth;

    grid = [];

    for(var z = 0; z < depth; z++) {
      grid[z] = [];
      blocks[z] = [];
      for(var y = 0; y < height; y++) {
        grid[z][y] = [];
        blocks[z][y] = [];
        for(var x = 0; x < width; x++) {
          grid[z][y][x] = BLOCK_EMPTY;
          blocks[z][y][x] = null;
        }
      }
    }    
  }

  _this.startLevel = function(level) {

//    console.error("START LEVEL" + level);

    if(level > levels.length) {
      return;
    }

    playfield.setAttribute('visible', true);
    controls.setAttribute('visible', true);

    state = STATE_LEVEL_STARTING;
    levelStartTime = false;

    var levelData = levels[level];

    var index = 0;
    initGrid(levelData[index++], levelData[index++], levelData[index++]);

    var friendCount = levelData[index++];
    var enemyCount = levelData[index++];

    for(var i = 0; i < friendCount; i++) {
      newFriend(levelData[index++], levelData[index++], levelData[index++], levelData[index++], levelData[index++], levelData[index++]);
    }

    for(var i = 0; i < enemyCount; i++) {
      newEnemy(levelData[index++], levelData[index++], levelData[index++], levelData[index++], levelData[index++], levelData[index++]);
    }

    var toolSelected = false;
    palette.selectTool(0);
    for(var i = 0; i < TOOL_COUNT; i++) {
      
      palette.setToolCount(i + 1, levelData[index]);
      if(!toolSelected && levelData[index] > 0) {
        var toolIndex = i + 1;
        palette.selectTool(i + 1);
        toolSelected = true;
      }

      index++;
    }


    for(var i = index; i < levelData.length; i += 4) {
      gridAddBlock(levelData[i], levelData[i + 1], levelData[i + 2], levelData[i + 3]);
    }
    g_playfield.setSwitchDown('green');

    playfield.setAttribute("position", new THREE.Vector3(   
      -(gridWidth  / 2), 
      0,  
      -gridDepth  
    ));
/*
    playfield.setAttribute("position", new THREE.Vector3(   
      -(gridWidth * scale / 2), 
      0,  
      1
    ));
*/
  }

  _this.endLevel = function() {

  }

  _this.nextLevel = function() {
    currentLevel++;
    if(currentLevel >= levels.length) {
      currentLevel = 0;
    }
    this.startLevel(currentLevel);
  }

  var levelFinished = function() {
    for(var z = 0; z < gridDepth; z++) {
      for(var y = 0; y < gridHeight; y++) {
        for(var x = 0; x < gridWidth; x++) {
          if(blocks[z][y][x] != null) {
            var blockEntity = blocks[z][y][x].getEntity();
            blockEntity.parentNode.removeChild(blockEntity);
            blocks[z][y][x] = null;                
          }
        }
      }
    }


    for(var i = 0; i < actors.length; i++) {
      actors[i].removeEntity();
    }
    
    gridDepth = 0;
    gridWidth = 0;
    gridHeight = 0;
    grid = [];
    blocks = [];
    actors = [];

    if(state == STATE_LEVEL_RESTART) {
      currentLevel--;
    }

    if(state == STATE_GOTO_LEVEL_SELECT) {
      state = STATE_LEVEL_SELECT;
      playfield.setAttribute('visible', false);
      controls.setAttribute('visible', false);
      levelSelect.show();
    } else {
      state = STATE_LEVEL_DONE;

      setTimeout(function() {
        _this.nextLevel();
      }, 400);
    }
    
  }

  _this.restartLevel = function() {
    state = STATE_LEVEL_RESTART;
    levelFinishTime = false;
  }

  _this.gotoLevelSelect = function() {
    state = STATE_GOTO_LEVEL_SELECT;
    levelFinishTime = false;

  }

  _this.getExitUsed = function(x, y, z) {
    if(_this.getBlockType(x, y, z) == BLOCK_EXIT) {
      return blocks[z][y][x].getExitUsed();
    }

  }

  _this.setExitUsed = function(x, y, z) {
    if(_this.getBlockType(x, y, z) == BLOCK_EXIT) {
      blocks[z][y][x].setExitUsed();
    } else {
    }
  },

  _this.actorExited = function() {
    var friendsLeftCount = 0;
    for(var i = 0; i < actors.length; i++) {
      if(actors[i].getType() == ACTOR_FRIEND && actors[i].getState() !== ACTOR_STATE_EXITED) {
        friendsLeftCount++;
      }
    }

    if(friendsLeftCount == 0) {
      levelSelect.setLevelAvailable(currentLevel + 1, true);
      state = STATE_LEVEL_FINISHING;
      levelFinishTime = false;
    }
  },

  _this.getBlockType = function(x, y, z) {
    if(x >= 0 && x < gridWidth && y >= 0 && y < gridHeight && z >= 0 && z < gridDepth) {
      var blockType = grid[z][y][x];

      if(blockType == BLOCK_RED && switchDown == 'red') {
        blockType = BLOCK;
      }
      if(blockType == BLOCK_GREEN && switchDown == 'green') {
        blockType = BLOCK;
      }

      if(blockType == BLOCK_EXIT && blocks[z][y][x].getExitUsed()) {
        blockType = BLOCK_EMPTY;
        
      }
  

      return blockType;
    }

    return BLOCK_EMPTY;
  }


  var blockMouseEnter = function(event) {

    var block = event.target;
    if(block.getAttribute('isblock') == null) {
      block = block.parentNode;
    }
    
    var position = block.getAttribute('position');

    var x = parseInt(position.x, 10);
    var y = parseInt(position.y, 10);
    var z = parseInt(position.z, 10);


    
    
    if(x < 0 || x >= gridWidth || y < 0 || y >= gridHeight - 1 || z < 0 || z >= gridDepth) {
      cursor.setVisible(false);
      return;
    }

    if(_this.getBlockType(x, y, z) == BLOCK) {
      y++;
    }

    var currentBlockType = _this.getBlockType(x, y, z);
    
    if(currentBlockType > 5) {
      // cant replace these blocks
      return;
    }
    
    cursor.setPosition(x, y, z);
    cursor.setVisible(true);
  }

  var blockMouseLeave = function(event) {
    cursor.setVisible(false);
  }

  var blockMouseClick = function(event) {
    g_sound.init();
    var block = event.target;
    if(block.getAttribute('isblock') == null) {
      block = block.parentNode;
    }
    
    var position = block.getAttribute('position');

    var x = parseInt(position.x, 10);
    var y = parseInt(position.y, 10);
    var z = parseInt(position.z, 10);

    if(x < 0 || x >= gridWidth || y < 0 || y >= gridHeight - 1 || z < 0 || z >= gridDepth) {
      return;
    }

    if(_this.getBlockType(x, y, z) == BLOCK) {
      y++;
    }

    var currentToolIndex = palette.getCurrentToolIndex();
    var currentBlockType = _this.getBlockType(x, y, z);
    if(currentBlockType > 5 || currentBlockType == currentToolIndex) {
      // cant replace these blocks or replace with self
      return;
    }

    var currentToolCount = palette.getToolCount(currentToolIndex);
    if(currentToolCount <= 0) {
      return;
    }

    if(currentToolIndex !== false) {
      if(blocks[z][y][x] !== null) {
        var blockEntity = blocks[z][y][x].getEntity();
        blockEntity.parentNode.removeChild(blockEntity);
        blocks[z][y][x] = null;

        // put back in the palette
        var currentTypeCount = palette.getToolCount(currentBlockType);
        currentTypeCount++;
        if(currentBlockType !== 0) {
          palette.setToolCount(currentBlockType, currentTypeCount);
        }
      } 
    
      gridAddBlock(x, y, z, currentToolIndex);

      // remove from the palette
      palette.setToolCount(currentToolIndex, currentToolCount - 1);

      if(currentToolIndex == 0) {
        g_sound.playSound(SOUND_REMOVE);
      } else {
        g_sound.playSound(SOUND_PLACE);
      }

      if(currentToolIndex == 0 || palette.getToolCount(currentToolIndex) == 0) {
        if(currentBlockType != 0) {
          // if clicked on a block to replace it, now set it as selected
          palette.selectTool(currentBlockType);
        } else {
          palette.selectTool(0);
          for(var i = 0; i < TOOL_COUNT; i++) {
            if(palette.getToolCount(i + 1) > 0) {
              palette.selectTool(i + 1);
              break;
            }
          }
        }
      }

    }


  }

  var gridAddBlock = function(x, y, z, blockType) {
    grid[z][y][x] = blockType;

    var blockEntity = false;
    if(blockType !== 0) {
      blockEntity = document.createElement('a-entity');
      playfield.append(blockEntity);

    }

    var block = new Block(blockType, 1, blockEntity);//createBlock(blockType);
    //var blockEntity = block.getEntity();
    
    if(blockEntity !== false) {
      blocks[z][y][x] = block;

      block.setPosition(x, y, z);
      
      blockEntity.setAttribute('class', 'clickable');
      blockEntity.addEventListener('mouseenter', blockMouseEnter);
      blockEntity.addEventListener('mouseleave', blockMouseLeave);
      blockEntity.addEventListener('click', blockMouseClick);
    }
  }

  /*
  var displayGrid = function() {

    for(var z = 0; z < gridDepth; z++) {
      for(var y = 0; y < gridHeight; y++) {
        for(var x = 0; x < gridWidth; x++) {
          gridAddBlock(x, y, z, grid[z][y][x]);
        }
      }
    }
  }
*/
  var newFriend = function(x, y, z, dx, dy, dz) {
    var friend = new Actor(ACTOR_FRIEND);

    var friendEntity = friend.createEntity();
    friend.setPosition(x, y, z);
    friend.setDirection(dx, dy, dz);

    playfield.append(friendEntity);
    actors.push(friend);
  }

  var newEnemy = function(x, y, z, dx, dy, dz) {
    var enemy = new Actor(ACTOR_ENEMY);

    var enemyEntity = enemy.createEntity();
    enemy.setPosition(x, y, z);
    enemy.setDirection(dx, dy, dz);

    playfield.append(enemyEntity);
    actors.push(enemy);
  }

  var tickLevelStart = function(time, deltaTime) {
    if(levelStartTime === false) {
      levelStartTime = time;
    }

    var timeElapsed = time - levelStartTime;

    var scale = timeElapsed / 500;
    if(scale > 1) {
      scale = 1;
      state = STATE_PLAYING;
    }

    
    for(var z = 0; z < gridDepth; z++) {
      for(var y = 0; y < gridHeight; y++) {
        for(var x = 0; x < gridWidth; x++) {
          if(blocks[z][y][x] != null) {
            blocks[z][y][x].setScale(scale);
          }
        }
      }
    }
  }

  var tickLevelFinishing = function(time, deltaTime) {
    if(levelFinishTime === false) {
      levelFinishTime = time;
    }

    var timeElapsed = time - levelFinishTime;

    var scale = (1 - timeElapsed / 500);
    if(scale < 0.01) {
      scale = 0.01;
      levelFinished();
      return;
    }

    
    for(var z = 0; z < gridDepth; z++) {
      for(var y = 0; y < gridHeight; y++) {
        for(var x = 0; x < gridWidth; x++) {
          if(blocks[z][y][x] != null) {
            blocks[z][y][x].setScale(scale);
          }
        }
      }
    }
  }


  var tickPlaying = function(time, deltaTime) {
    for(var i = 0; i < actors.length; i++) {
      actors[i].tick(time, deltaTime);
    }

    for(var z = 0; z < gridDepth; z++) {
      for(var y = 0; y < gridHeight; y++) {
        for(var x = 0; x < gridWidth; x++) {
          if(blocks[z][y][x] != null) {
            blocks[z][y][x].tick(time, deltaTime);
          }
        }
      }
    }

  }

  _this.tick = function(time, deltaTime) {
    lastTime = time;
    if(scene.is('vr-mode')) {
      if(vrMode === false || vrMode == -1) {
        
        // enter vr
        cameraRotation.setAttribute('rotation', new THREE.Vector3(0, 0, 0));
        
        scene.removeAttribute('cursor');
        scene.removeAttribute('raycaster');
        holder.setAttribute('rotation', new THREE.Vector3(0, 180, 0));
        holder.setAttribute('position', new THREE.Vector3(0, -1.5, 1));
        vrMode = true;
      }
    } else {      
      
      if(vrMode === true || vrMode === -1) {
        
        cameraRotation.setAttribute('rotation', new THREE.Vector3(-45, 0, 0));
        scene.setAttribute('cursor', 'rayOrigin: mouse');
        scene.setAttribute('raycaster', 'objects: .clickable');

        holder.setAttribute('rotation', new THREE.Vector3(0, 0, 0));
        holder.setAttribute('position', new THREE.Vector3(0, -1, -2));

        vrMode = false;
      }
    }

    switch(state) {
      case STATE_LEVEL_STARTING:
        tickLevelStart(time, deltaTime);
        break;
      case STATE_PLAYING:
        tickPlaying(time, deltaTime);
        break;
      case STATE_LEVEL_FINISHING:
      case STATE_LEVEL_RESTART:
      case STATE_GOTO_LEVEL_SELECT:
        tickLevelFinishing(time, deltaTime);
        break;
      case STATE_LEVEL_SELECT:
        levelSelect.tick(time, deltaTime);
        break;
    }
  }


  // actor is entering a block
  _this.actorEnterBlock = function(x, y, z) {
    if(x >= 0 && x < gridWidth && y >= 0 && y < gridHeight && z >= 0 && z < gridDepth) {
      if(blocks[z][y][x] != null) {
        blocks[z][y][x].actorEnterBlock();
      }
    }
  }

  // actor is leaving a block
  _this.actorExitBlock = function(x, y, z) {
    if(x >= 0 && x < gridWidth && y >= 0 && y < gridHeight && z >= 0 && z < gridDepth) {
      if(blocks[z][y][x] != null) {
        blocks[z][y][x].actorExitBlock();
      }
    }
  }

  _this.setSwitchDown = function(switchType)  {
    switchDown = switchType;

    for(var z = 0; z < gridDepth; z++) {
      for(var y = 0; y < gridHeight; y++) {
        for(var x = 0; x < gridWidth; x++) {
          if(blocks[z][y][x] != null) {
            blocks[z][y][x].setSwitchDown(switchType);
          }
        }
      }
    }

  }

  _this.getSwitchDown = function() {
    return switchDown;
  }

  _this.gridHasFriend = function(x, y, z) {
    for(var i = 0; i < actors.length; i++) {
      if(actors[i].getType() == ACTOR_FRIEND) {
        if(actors[i].getX() == x && actors[i].getY() == y && actors[i].getZ() == z) {
          if(actors[i].getState() ==ACTOR_STATE_NORMAL) {
            return actors[i];
          }
        }
      }
    }
    return false;
  }
}