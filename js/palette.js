var Palette = function(cursor) {
  var _this = this;

  var toolColor = '#999999';
  var toolUnavailableColor = '#555555';
  var toolHoverColor = '#bbbbbb';
  var toolSelectedColor = '#dddddd';
  var paletteEntity = null;
  var toolText = null;
  var toolTextShadow = null;
  var currentToolIndex = false;
  var tools = [];

  var toolCount = [];
  var toolCountText = [];

  var createPalette = function() {
    paletteEntity = document.getElementById('palette');
    
    toolText = document.createElement('a-text');
    toolText.setAttribute('value', 'Selected Tool');
    toolText.setAttribute('scale', '4 4 4');
    toolText.setAttribute('rotation', '-90 0 0');
    toolText.setAttribute('color', '#eeeeee');
    toolText.setAttribute('position', '-0.5 0.1 -1');
    paletteEntity.append(toolText);
    
    for(var i = 0; i < 6; i++) {
      var tool = document.createElement('a-entity');
      tool.setAttribute('position', new THREE.Vector3(i, 0, 0));
      tool.setAttribute("tool-index", i);
      tools.push(tool);

      var box = document.createElement('a-box');
      box.setAttribute('scale', '0.9 0.1 0.9');
      box.setAttribute('color', '#9a9a9a');
      box.setAttribute('class', 'clickable');
      
      tool.append(box);

      var text = document.createElement('a-text');
      text.setAttribute('color', '#cccccc');
      text.setAttribute('align', 'center');
      text.setAttribute('rotation', '-90 0 0');
      text.setAttribute('position', '-0 0 0.64');
      text.setAttribute('width', '5');
      if(i == 0) {
        text.setAttribute('value', '');
      } else {
        text.setAttribute('value', '0');
      }
      text.setAttribute('scale', '1.6 1.6 1.6');
      tool.append(text);
      toolCountText.push(text);
      toolCount.push(0);

      if(i != 0) {
        var blockEntity = document.createElement('a-entity');
        //var blockEntity = block.getEntity();
        blockEntity.setAttribute("position", new THREE.Vector3(0, 0.6, 0));
        blockEntity.setAttribute('tool-index', i);
        tool.append(blockEntity);
        var block = new Block(i, 1, blockEntity);

      }


      paletteEntity.append(tool);

      
      tool.addEventListener('mouseenter', function(event) {
        var toolIndex = parseInt(event.target.parentNode.getAttribute('tool-index'), 10);
        if(toolIndex !== currentToolIndex) {
          if(toolIndex == 0 || toolCount[toolIndex] > 0) {
            setToolColor(toolIndex, toolHoverColor);
          }
          setToolText(toolIndex);
        }        

      });

      tool.addEventListener('mouseleave', function(event) {
        var toolIndex = parseInt(event.target.parentNode.getAttribute('tool-index'), 10);
        if(toolIndex !== currentToolIndex) {
          if(toolIndex == 0 || toolCount[toolIndex] > 0) {
            setToolColor(toolIndex, toolColor);
          }
          setToolText(currentToolIndex);
        }

      });

      tool.addEventListener('click', function(event) {
        g_sound.init();
        g_sound.playSound(SOUND_CLICK);
        
        var toolIndex = parseInt(event.target.parentNode.getAttribute('tool-index'), 10);
        if(toolIndex == 0 || toolCount[toolIndex] > 0) {

          _this.selectTool(toolIndex);
        }
      });


    }
  }

  
  var getToolName = function(index) {
    switch(index) {
      case 0:
        return "Remove";        
      case 1:
        return "North";
      case 2:
        return "East";
      case 3:
        return "South";
      case 4:
        return "West";
      case 5:
        return "Jump";            
      }
      return "";
  }

  _this.setToolCount = function(index, count) {
    if(index > 0 && index < toolCountText.length) {
      if(count <= 0) {
        count = 0;
        setToolColor(index, toolUnavailableColor);
      } else {
        setToolColor(index, toolColor);
      }

      toolCountText[index].setAttribute('value', count);
      toolCount[index] = parseInt(count, 10);

    }
  }

  _this.getToolCount = function(index) {
    if(index > 0) {
      return toolCount[index];
    }
    return 1;
  }

  var setToolText = function(index) {
    toolText.setAttribute("value", getToolName(index));
//    toolTextShadow.setAttribute("value", getToolName(index));
  }

  _this.selectTool = function(index) {
    index = parseInt(index, 10);

    if(index !== 0 && _this.getToolCount(index) == 0) {
      return;
    }

    if(index !== currentToolIndex) {
      if(currentToolIndex !== false && (_this.getToolCount(currentToolIndex) > 0 || currentToolIndex == 0) )  {
        setToolColor(currentToolIndex, toolColor);
      }
      currentToolIndex = index;
      setToolColor(currentToolIndex, toolSelectedColor);
      
      setToolText(index);

      cursor.setType(index);
    }
  }

  var setToolColor = function(index, color) {
    var tool = tools[index];
    tool.children[0].setAttribute('color', color);
  }


  createPalette();
  //selectTool(1);

  _this.getEntity = function() {
    return paletteEntity;
  }

  _this.getCurrentToolIndex = function() {
    return currentToolIndex;
  }
}
