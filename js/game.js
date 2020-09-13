AFRAME.registerComponent('game', {
  init: function() {
    g_playfield = new Playfield();
    g_playfield.init();
  },

  tick: function(time, elapsedTime) {
    while(elapsedTime > 0) {
      var timeDelta = 40;

      if(timeDelta > elapsedTime) {
        timeDelta = elapsedTime;
      }

      elapsedTime -= timeDelta;
      g_playfield.tick(time, timeDelta);// / 10);
    }    
  }
});