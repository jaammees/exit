var levels = [];


function levelCreatePlayfield(levelData) {
  var width = levelData[0];
  var depth = levelData[2];
  var y = 0;
  for(var z = 0; z < depth; z++) {
    for(var x = 0; x < width; x++) {
      levelData.push(x);
      levelData.push(y);
      levelData.push(z);
      levelData.push(BLOCK);
    }
  }
}

/********************************* LEVEL 0  *******************************/
var level = [
  // width, height, depth
  13, 20, 13,   
  // number of friends
  1, 
  // number of enemies
  0, 

  // friend position, direction
  5, 1, 11, 1, 0, 0,

  // enemy

  // tool count
  1, 1, 1, 1, 1,

  // blocks
  3, 1, 11, BLOCK_EAST,
  9, 1, 11, BLOCK_WEST,
  6, 1, 6, BLOCK_EXIT
];

levelCreatePlayfield(level);

levels.push(level);

/********************************* LEVEL 1  *******************************/

level = [
  // width, height, depth
  13, 20, 13,   
  // number of friends
  1, 
  // number of enemies
  0, 

  // friend position, direction
  5, 1, 11, 1, 0, 0,

  // enemy

  // tool count
  1, 0, 0, 0, 1,

  // blocks
  1, 1, 11, BLOCK_EAST,
  3, 1, 11, BLOCK_JUMP,
  11, 1, 11, BLOCK_WEST,
  9, 1, 11, BLOCK_JUMP,
  6, 1, 3, BLOCK_EXIT
];

for(var x = 0; x < 13; x++) {
  for(var z = 0; z < 13; z++) {
    if(z >= 10 || (x > 4 && x < 8 && z != 7) ) {
      level.push(x, 0, z, BLOCK);
    }
  }
}
//levelCreatePlayfield(level);
levels.push(level);



/********************************* LEVEL 2  *******************************/
var level = [
  // width, height, depth
  13, 20, 13,   
  // number of friends
  1, 
  // number of enemies
  3, 

  // friend position, direction
  5, 1, 11, 1, 0, 0,


  // enemy
  1, 1, 5, 1, 0, 0,
  11, 1, 7, -1, 0, 0,
  1, 1, 9, 1, 0, 0,

  // tool count
  1, 0, 0, 0, 0,

  // blocks
  3, 1, 11, BLOCK_EAST,
  9, 1, 11, BLOCK_WEST,
  6, 1, 3, BLOCK_EXIT
];

levelCreatePlayfield(level);

levels.push(level);







/********************************* LEVEL 3  *******************************/
var level = [
  // width, height, depth
  13, 20, 13,   
  // number of friends
  2, 
  // number of enemies
  1, 

  // friend position, direction
  6, 1, 10, 1, 0, 0,
  6, 1, 11, -1, 0, 0,


  // enemy
  1, 1, 7, 1, 0, 0,

  // tool count
  1, 0, 0, 0, 0,

  // blocks
  0, 1, 11, BLOCK,
  12, 1, 11, BLOCK,
  0, 1, 10, BLOCK,
  12, 1, 10, BLOCK,
  2, 1, 3, BLOCK_EXIT,
  10, 1, 3, BLOCK_EXIT
];

//levelCreatePlayfield(level);

for(var x = 0; x < 13; x++) {
  for(var z = 0; z < 13; z++) {
    if(z >= 10 || x < 5 ||  x > 7 || z == 7) {
      level.push(x, 0, z, BLOCK);
    }
  }
}


levels.push(level);





/********************************* LEVEL 4  *******************************/
var level = [
  // width, height, depth
  13, 20, 13,   
  // number of friends
  2, 
  // number of enemies
  2, 

  // friend position, direction
  6, 1, 10, 1, 0, 0,
  6, 1, 2, -1, 0, 0,

  // enemies
  2, 1, 6, 0, 0, 1,
  10, 1, 6, 0, 0, -1,

  // tool count
  0, 0, 0, 0, 0,

  // blocks
  2, 1, 2, BLOCK_SOUTH,
  10, 1, 2, BLOCK_WEST,
  10, 1, 10, BLOCK_NORTH,
  2, 1, 10, BLOCK_EAST,
  6, 1, 5, BLOCK_EXIT,
  6, 1, 7, BLOCK_EXIT
];

//levelCreatePlayfield(level);

for(var x = 0; x < 13; x++) {
  for(var z = 0; z < 13; z++) {
//    if(z >= 10 || x < 5 ||  x > 7 || z == 7) {
    if(z == 2 || z == 10
      || x == 2 || x == 10
      
      || ((z == 5 && x > 2 && x < 7) || (z == 7 && x > 5 && x < 10)  )
       ) {
      level.push(x, 0, z, BLOCK);
    }
//    }
  }
}


levels.push(level);





/********************************* LEVEL 5  *******************************/
var level = [
  // width, height, depth
  13, 20, 13,   
  // number of friends
  2, 
  // number of enemies
  0, 

  // friend position, direction
  6, 1, 11, -1, 0, 0,
  6, 1, 1, 1, 0, 0,

  // tool count
  1, 1, 1, 1, 1,

  // blocks
  11, 1, 11, BLOCK,
  1, 1, 11, BLOCK,

  3, 1, 11, BLOCK_SWITCH_RED,
  9, 1, 11, BLOCK_SWITCH_GREEN,

  11, 1, 1, BLOCK,
  1, 1, 1, BLOCK,



  5, 1, 6, BLOCK_EXIT,
  7, 1, 6, BLOCK_EXIT
];

//levelCreatePlayfield(level);

for(var x = 0; x < 13; x++) {
  for(var z = 0; z < 13; z++) {
    if(z < 4 || z > 9) {
      level.push(x, 0, z, BLOCK);
    }
  }
}

for(var z = 4; z < 10; z++) {
  level.push(5, 0, z, BLOCK_RED);  
  level.push(7, 0, z, BLOCK_GREEN);  
}
levels.push(level);








/********************************* LEVEL 6  *******************************/
var level = [
  // width, height, depth
  13, 20, 13,   
  // number of friends
  2, 
  // number of enemies
  0, 

  // friend position, direction
  1, 4, 10, 1, 0, 0,
  10, 4, 3, -1, 0, 0,

  // tool count
  1, 1, 1, 1, 2,

  // blocks

  9, 1, 10, BLOCK_SWITCH_RED,

  0, 4, 10, BLOCK_EAST,
  2, 4, 10, BLOCK_WEST,

  0, 4, 3, BLOCK_GREEN,
  12, 4, 3, BLOCK_GREEN,

  3, 1, 3, BLOCK_SWITCH_GREEN,
  9, 1, 3, BLOCK_SWITCH_GREEN,

  0, 1, 3, BLOCK,
  12, 1, 3, BLOCK,


  10, 3, 7, BLOCK_EXIT,
  6, 1, 7, BLOCK_EXIT
];


//levelCreatePlayfield(level);
for(var x = 0; x < 3; x++) {
  for(var z = 9; z < 12; z++) {
    level.push(x, 3, z, BLOCK);
  }
}

for(var x = 0; x < 13; x++) {
  level.push(x, 3, 3, BLOCK_GREEN);
}

for(var x = 5; x < 8; x++) {
  for(var z = 4; z < 5; z++) {
    level.push(x, 0, z, BLOCK_GREEN);
  }
}

for(var x = 5; x < 8; x++) {
  for(var z = 6; z < 9; z++) {
    level.push(x, 0, z, BLOCK_GREEN);
  }
}


for(var x = 0; x < 13; x++) {
  level.push(x, 0, 3, BLOCK);
}


for(var x = 4; x < 7; x++) {
  for(var z = 9; z < 12; z++) {
    level.push(x, 1, z, BLOCK);
  }
}

for(var x = 4; x < 12; x++) {
  for(var z = 6; z < 9; z++) {
    level.push(x, 2, z, BLOCK_RED);
  }
}


for(var x = 7; x < 12; x++) {
  for(var z = 9; z < 12; z++) {
    level.push(x, 0, z, BLOCK);
  }
}

levels.push(level);






/********************************* LEVEL 7  *******************************/
var level = [
  // width, height, depth
  13, 20, 13,   
  // number of friends
  4, 
  // number of enemies
  8, 

  // friend position, direction
  6, 2, 8, -1, 0, 0,
  6, 2, 4, 1, 0, 0,

  8, 2, 6, 0, 0, 1,
  4, 2, 6, 0, 0, -1,


  // enemies
  4, 1, 10, 1, 0, 0,
  //6, 1, 10, 1, 0, 0,
  8, 1, 10, 1, 0, 0,

  4, 1, 2, -1, 0, 0,
  //6, 1, 2, -1, 0, 0,
  8, 1, 2, -1, 0, 0,


  10, 1, 4, 0, 0, -1,
  //10, 1, 6, 0, 0, -1,
  10, 1, 8, 0, 0, -1,
  
  2, 1, 4, 0, 0, 1,
  //2, 1, 6, 0, 0, 1,
  2, 1, 8, 0, 0, 1,


  // tool count
  0, 0, 0, 0, 0,

  // blocks
  4, 2, 8, BLOCK_NORTH,
  8, 2, 8, BLOCK_WEST,

  4, 2, 4, BLOCK_EAST,
  
  8, 2, 4, BLOCK_SOUTH,


  10, 1, 2, BLOCK_WEST,
  7, 1, 2, BLOCK_JUMP,
  2, 1, 2, BLOCK_SOUTH,
  2, 1, 5, BLOCK_JUMP,
  2, 1, 10, BLOCK_EAST,
  5, 1, 10, BLOCK_JUMP,
  10, 1, 10, BLOCK_NORTH,
  10, 1, 7, BLOCK_JUMP,

  1, 1, 11, BLOCK_EXIT,
  11, 1, 1, BLOCK_EXIT,
  1, 1, 1, BLOCK_EXIT,
  11, 1, 11, BLOCK_EXIT,
];


for(var x = 0; x < 13; x++) {
  for(var z = 0; z < 13; z++) {
    level.push(x, 0, z, BLOCK);
  }
}

for(var x = 3; x < 10; x++) {
  for(var z = 3; z < 10; z++) {
    level.push(x, 1, z, BLOCK);
  }
}

levels.push(level);









/********************************* LEVEL 8  *******************************/
var level = [
  // width, height, depth
  13, 20, 13,   
  // number of friends
  1, 
  // number of enemies
  2, 

  // friend position, direction
  7, 1, 6, 1, 0, 0,

  // enemy
  4, 3, 10, 1, 0, 0,
  10, 3, 4, -1, 0, 0,

  // tool count
  1, 0, 0, 0, 1,

  // blocks
  1, 1, 7, BLOCK_SWITCH_RED,

  10, 3, 10, BLOCK_NORTH,
  10, 3, 4, BLOCK_WEST,
  4, 3, 4, BLOCK_SOUTH,
  4, 3, 10, BLOCK_EAST,

  7, 1, 12, BLOCK_EXIT
];

levelCreatePlayfield(level);

for(var y = 1; y < 3; y++) {
  for(var x = 4; x < 11; x++) {
    for(var z = 4; z < 11; z++) {
      if(x == 4 || x == 10 || z == 4 || z == 10) {
        if(y == 1) {
          level.push(x, y, z, BLOCK_GREEN);
        } else {
          level.push(x, y, z, BLOCK);

        }
      }
    }
  }
}

levels.push(level);





/********************************* LEVEL 9  *******************************/
var level = [
  // width, height, depth
  13, 20, 13,   
  // number of friends
  1, 
  // number of enemies
  1, 

  // friend position, direction
  9, 1, 11, 1, 0, 0,

  // enemy
  3, 1, 11, -1, 0, 0,
  // tool count
  5, 5, 5, 5, 5,

  // blocks
  8, 1, 11, BLOCK,
  12, 1, 11, BLOCK,
  10, 1, 10, BLOCK_GREEN,
  10, 1, 12, BLOCK,
  

  0, 1, 11, BLOCK,
  4, 1, 11, BLOCK,
  2, 1, 10, BLOCK_SWITCH_RED,
  2, 1, 8, BLOCK_SWITCH_GREEN,
  2, 1, 12, BLOCK,

  10, 1, 0, BLOCK_EXIT
];


for(var x = 0; x < 13; x++) {
  for(var z = 0; z < 13; z++) {
    if(x < 5) {
      level.push(x, 0, z, BLOCK);
    }

    if(x > 7) {
      if( (z < 10 && z > 6) || z == 0) {
        level.push(x, 0, z, BLOCK_RED);
      } else if(z > 2 && z < 5) {
        level.push(x, 0, z, BLOCK_GREEN);
      } else {
        level.push(x, 0, z, BLOCK);
      }
    }
  }
}

levels.push(level);







/********************************* LEVEL 10  *******************************/
var level = [
  // width, height, depth
  13, 20, 13,   
  // number of friends
  1, 
  // number of enemies
  5, 

  // friend position, direction
  3, 3, 12, 1, 0, 0,

  // enemy
  0, 3, 10, 1, 0, 0,
  0, 3, 7, 1, 0, 0,
  0, 3, 4, 1, 0, 0,

  12, 3, 9, -1, 0, 0,
//  12, 3, 7, -1, 0, 0,
  12, 3, 5, -1, 0, 0,


  // tool count
  9, 9, 9, 9, 0,

  // blocks

  8, 2, 11, BLOCK,

  
  
  0, 3, 12, BLOCK_EAST,
  3, 3, 12, BLOCK_WEST,

  //0, 3, 11, BLOCK,
  //4, 3, 11, BLOCK,
//  2, 3, 10, BLOCK_SWITCH_RED,
//  2, 3, 8, BLOCK_SWITCH_GREEN,
  

  6, 1, 11, BLOCK_EXIT
];


for(var x = 0; x < 13; x++) {
  for(var z = 0; z < 13; z++) {
    if(x == 0 || x == 4) {
      if(z > 3) {
        //level.push(x, 3, z, BLOCK);
      }
    }

    if(z < 3) {
      level.push(x, 2, z, BLOCK);

    } else {
      if(x < 4) {
        level.push(x, 2, z, BLOCK);
      }
      if(x > 8) {
          level.push(x, 2, z, BLOCK);
      }
    }

    if(z > 9 && x > 4 && x < 8) {
      level.push(x, 0, z, BLOCK);
    }
  }
}

levels.push(level);




/********************************* LEVEL 11  *******************************/
var level = [
  // width, height, depth
  13, 20, 13,   
  // number of friends
  1, 
  // number of enemies
  0, 

  // friend position, direction
  0, 4, 12, 0, 0, -1,

  // tool count
  9, 9, 9, 9, 9,

  // blocks

  
  //0, 3, 11, BLOCK,
  //4, 3, 11, BLOCK,
//  2, 3, 10, BLOCK_SWITCH_RED,
  11, 1, 11, BLOCK_EXIT,
  
  0, 4, 0, BLOCK_SOUTH,
  0, 4, 12, BLOCK_NORTH,
];

for(var z = 0; z < 13; z++) {
  level.push(0, 3, z, BLOCK);

  if(z == 10 || z == 11) {
    for(var x = 1; x < 5; x++) {
      level.push(x, 3, z, BLOCK);
    }
  }

  if(z == 2 || z == 1) {
    for(var x = 1; x < 7; x++) {
      level.push(x, 3, z, BLOCK);
    }

  }
}

for(var z = 1; z < 6; z++) {
  level.push(3, 0, z, BLOCK);
  level.push(2, 0, z, BLOCK);
}

for(var z = 0; z < 6; z++) {
  level.push(12, 0, z, BLOCK);
  level.push(11, 0, z, BLOCK);
}

for(var z = 0; z < 6; z++) {
  level.push(8, 0, z, BLOCK);
  level.push(9, 0, z, BLOCK);
}

for(var x = 5; x < 8; x++) {
  level.push(x, 1, 5, BLOCK);
  level.push(x, 1, 4, BLOCK);
}

for(var z = 10; z < 13; z++) {
  for(var x = 10; x < 13; x++) {
    level.push(x, 0, z, BLOCK);
  }
}


for(var z = 7; z < 10; z++) {
  for(var x = 5; x < 6; x++) {
    level.push(x, 0, z, BLOCK);
  }
}

for(var x = 5; x < 9; x++) {
  level.push(x, 0, 10, BLOCK);
}

for(var x = 0; x < 3; x++) {
  for(var z = 8; z < 12; z++) {
    level.push(x, 0, z, BLOCK);
  }
}

for(var x = 0; x < 5; x++) {
  level.push(x, 0, 0, BLOCK);
}

levels.push(level);





/************************************** 


var level100 = [
  13, 20, 13,   // width, height, depth
  1, // number of friends
  1, // number of enemies

  // friend position, direction
  8, 1, 9, 0, 0, 1,

//  5, 1, 5, 1, 0, 0,

  // enemy
  6, 2, 12, 1, 0, 0,

  // tool count
  1, 0, 0, 0, 0,

  // blocks
  2, 1, 10, BLOCK_EAST,
  4, 1, 10, BLOCK_SWITCH_GREEN,
  10, 1, 10, BLOCK_SOUTH,
  10, 1, 11, BLOCK_WEST,
  2, 1, 11, BLOCK_NORTH,
  8, 1, 7, BLOCK_JUMP,
  3, 1, 10, BLOCK,
  8, 1, 5, BLOCK,
  8, 1, 10, BLOCK,
  //8, 1, 5, BLOCK_WEST,
  6, 1, 5, BLOCK_RED,
  2, 1, 5, BLOCK_SOUTH,
  2, 1, 8, BLOCK_SWITCH_RED,
  6, 1, 8, BLOCK_EXIT,

  6, 1, 12, BLOCK,
  7, 1, 12, BLOCK,
  8, 1, 12, BLOCK,
];

levelCreatePlayfield(level100);

levels.push(level100);
*/