var LevelSelect = function(cursor) {
  var _this = this;

  var entity = null;

  var tileColor = '#999999';
  var tileUnavailableColor = '#333333';
  var tileHoverColor = '#bbbbbb';
  //var toolSelectedColor = '#dddddd';

  var levelSelectWidth = 0;
  var levelSelectDepth = 0;
  var levelSelectScale = 2;
  var levelClicked = false;

  var tiles = [];
  var levelText = [];

  var levelAvailable = [];

  var state = 0;
  var tileScale = 0;
  var STATE_SHOWING = 1;
  var STATE_HIDING  = 2;
  var STATE_VISIBLE = 3;
  var STATE_HIDDEN = 4;

  var createLevelSelect = function() {
    var levelCount = levels.length;
    var tilesAcross = 4;
    var tileWidth = 1;
    var tileHeight = 1;
    var tileSpacing = 0.4;
    levelSelectWidth = tilesAcross * (tileWidth + tileSpacing) - tileSpacing * 1.5;
    levelSelectDepth = Math.ceil(levelCount / tilesAcross) * (tileHeight + tileSpacing);
    

    entity = document.getElementById('level-select');
    entity.setAttribute('visible', false);
    entity.setAttribute('position', new THREE.Vector3(-(levelSelectScale * levelSelectWidth/2), -10.5, 0));
    entity.setAttribute('scale', '2 2 2');
    


    var titleText = document.createElement('a-text');
    titleText.setAttribute('value', 'Level Select');
    titleText.setAttribute('scale', '4 4 4');
    //titleText.setAttribute('rotation', '-90 0 0');
    titleText.setAttribute('color', '#eeeeee');
    //titleText.setAttribute('width', 10);
//    titleText.setAttribute('align', 'center');

    
    titleText.setAttribute('position', new THREE.Vector3(0.05, 1.6, -levelSelectDepth + 0.5));
    entity.append(titleText);



    for(var i = 0; i < levelCount; i++) {
      levelAvailable.push(false);
      var x = tileSpacing + (i % tilesAcross) * (tileWidth + tileSpacing);
      var y = 0;
      var z = -tileSpacing - Math.floor(i / tilesAcross) * (tileHeight + tileSpacing);

      var tile = document.createElement('a-entity');
      tile.setAttribute('position', new THREE.Vector3(x, 0, z));      
      tile.setAttribute('level-index', i);

      var box = document.createElement('a-box');
      box.setAttribute('scale', new THREE.Vector3(tileWidth, 0.05, tileHeight));
      box.setAttribute('color', tileColor);
      box.setAttribute('class', 'clickable');
      tile.append(box);
      
      var text = document.createElement('a-text');
      text.setAttribute('color', '#eeeeee');
      text.setAttribute('align', 'center');
      text.setAttribute('rotation', '-90 0 0');
      text.setAttribute('position', '0 0.1 0');
//      text.setAttribute('width', '5');
      var levelNumber = i + 1;
      text.setAttribute('value', levelNumber);
      text.setAttribute('scale', '2.6 2.6 2.6');
      tile.append(text);

      levelText.push(text);
      tiles.push(tile);

      entity.append(tile);

      box.addEventListener('mouseenter', function(event) {
        var levelIndex = parseInt(event.target.parentNode.getAttribute('level-index'), 10);
        if(_this.getLevelAvailable(levelIndex)) {
          setTileColor(levelIndex, tileHoverColor);
        }
      });

      box.addEventListener('mouseleave', function(event) {
        var levelIndex = parseInt(event.target.parentNode.getAttribute('level-index'), 10);
        if(_this.getLevelAvailable(levelIndex)) {
          setTileColor(levelIndex, tileColor);
        }
      });

      box.addEventListener('click', function(event) {
        var levelIndex = parseInt(event.target.parentNode.getAttribute('level-index'), 10);
        if(_this.getLevelAvailable(levelIndex)) {

          g_sound.init();
          g_sound.playSound(SOUND_CLICK);

          var levelIndex = parseInt(event.target.parentNode.getAttribute('level-index'), 10);
          gotoLevel(levelIndex);
        }
        

      });      
    }

    levelAvailable[0] = true;
    
  }



  var setTileColor = function(index, color) {
    var tile = tiles[index];
    tile.children[0].setAttribute('color', color);

    if(color == tileUnavailableColor) {
      levelText[index].setAttribute('color', '#999999');
    } else {
      levelText[index].setAttribute('color', '#eeeeee');
    }
  }


  _this.tick = function(time, timeDelta) {

    switch(state) {
      case STATE_SHOWING:
        tileScale += timeDelta / 500;
        if(tileScale > 1) {
          tileScale = 1;
          state = STATE_VISIBLE;
        }
        setTileScale(tileScale);
        break;
      case STATE_HIDING:
        tileScale -= timeDelta / 500;
        if(tileScale < 0.01) {
          tileScale = 0.01;
          entity.setAttribute('visible', false);
          entity.setAttribute('position', new THREE.Vector3(-(levelSelectScale * levelSelectWidth/2), -10.5, 0));
          state = STATE_HIDDEN;

          setTimeout(function() {
            g_playfield.startLevel(levelClicked);
          }, 20);


          return;
        }

        setTileScale(tileScale);
        break;
    }

  }

  var setTileScale = function(scale) {
    tileScale = scale;
    for(var i = 0; i < tiles.length; i++) {
      tiles[i].setAttribute('scale', new THREE.Vector3(scale, scale, scale));
    }
  }

  _this.show = function() {
    setTileColors();
    setTileScale(0.01);
    state = STATE_SHOWING;

    entity.setAttribute('visible', true);
    entity.setAttribute('position', new THREE.Vector3(-(levelSelectScale * levelSelectWidth/2), -0.5, 0));

    
  }

  _this.setLevelAvailable = function(index, available) {
    if(index < levelAvailable.length) {
      levelAvailable[index] = available;
    }

  }

  _this.getLevelAvailable = function(index) {
    
    return levelAvailable[index];
  }

  var setTileColors = function() {
    for(var i = 0; i < tiles.length; i++) {
      if(_this.getLevelAvailable(i)) {
        setTileColor(i, tileColor);
      } else {
        setTileColor(i, tileUnavailableColor);
      }
    }
  }

  var gotoLevel = function(levelIndex) {
    levelClicked = levelIndex;
    state = STATE_HIDING;
  }


  createLevelSelect();
  setTileColors();

}