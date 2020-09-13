// sounds
var SOUND_CLICK = 1;
var SOUND_EXIT = 2;
var SOUND_DIE = 3;
var SOUND_JUMP = 4;
var SOUND_FALL = 5;
var SOUND_GREEN = 6;
var SOUND_RED = 7;

var SOUND_REMOVE = 8;
var SOUND_PLACE = 9;
/*
var soundJump = 3;
var soundDash = 4;
var soundRed = 5;
var soundGreen = 6;
var soundBlue = 7;
var soundYellow = 8;
var soundPurple = 9;
*/
var SOUND_LEVEL_END = 10;

var Sound = function() {
  var audioContext = null;

  this.init = function() {
    if(audioContext == null) {
      audioContext = new AudioContext();
    }
  }

  // midi number to frequency
  var midiToFreq = function(note) {
    return (Math.pow(2, (note-69) / 12)) * 440.0;
  }

  // play a sound
  this.playSound = function(soundType) {
    if(audioContext == null) {
      return;
    }
    

    var time = audioContext.currentTime;
    var noteLength = 1/16;
    var attack = 1/64;
    var soundLength = noteLength;

    // create an envelope using gain
    var gain = audioContext.createGain();

    var audioSource = null;
    var biquadFilter = null;

    audioSource = audioContext.createOscillator();
    audioSource.type = 'square';
    audioSource.connect(gain);

    gain.connect(audioContext.destination);

    switch(soundType) {
      case SOUND_REMOVE:
        noteLength = 1 / 32;
        audioSource.type = 'triangle';
        audioSource.frequency.setValueAtTime(midiToFreq(69), time);    // G3

//        audioSource.frequency.setValueAtTime(midiToFreq(59), time + noteLength);  // D4
//        audioSource.frequency.setValueAtTime(midiToFreq(62), time + noteLength * 2);  // D4

        gain.gain.setValueAtTime(0, time);
//        gain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 1/128);
        gain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 1/16);

        gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + noteLength * 3);

        soundLength = noteLength * 3;

        break;
      case SOUND_PLACE:
      case SOUND_CLICK:
        noteLength = 1 / 32;
        audioSource.type = 'triangle';
        audioSource.frequency.setValueAtTime(midiToFreq(69), time);    // G3

//        audioSource.frequency.setValueAtTime(midiToFreq(59), time + noteLength);  // D4
//        audioSource.frequency.setValueAtTime(midiToFreq(62), time + noteLength * 2);  // D4

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 1/128);
//        gain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 1/16);

        gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + noteLength * 3);

        soundLength = noteLength * 3;
        
      /*
        noteLength = 1/16;
        audioSource.type = 'triangle';
        audioSource.frequency.setValueAtTime(midiToFreq(55), time);    // G3
        audioSource.frequency.setValueAtTime(midiToFreq(59), time + noteLength);  // D4
        audioSource.frequency.setValueAtTime(midiToFreq(62), time + noteLength * 2);  // D4

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 1/64);
        gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + noteLength * 3);

        soundLength = noteLength * 4;
*/
      break;

      case SOUND_FALL: 
        noteLength = 1/4;
        audioSource.type = 'triangle';
        audioSource.frequency.setValueAtTime(midiToFreq(62), time);   // G#3

        
        audioSource.frequency.linearRampToValueAtTime(midiToFreq(55), time + noteLength * 4); // c#3 49

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 1/128);
        gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + noteLength * 3);

        soundLength = noteLength * 4;
      break;

      case SOUND_DIE: 
        noteLength = 1/12;
        audioSource.type = 'sawtooth';
        audioSource.frequency.setValueAtTime(midiToFreq(56), time);   // G#3

       
        audioSource.frequency.linearRampToValueAtTime(midiToFreq(49), time + noteLength); // c#3 49

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + noteLength);
        gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + noteLength * 2);

        soundLength = noteLength * 2;

      break;
      case SOUND_JUMP:
        noteLength = 1/12;
        audioSource.type = 'triangle';
        audioSource.frequency.setValueAtTime(midiToFreq(55), time);    // G3
        audioSource.frequency.setValueAtTime(midiToFreq(62), time + noteLength);  // D4

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 1/64);
        gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + noteLength * 2);

        soundLength = noteLength * 2;

        break;
        /*
      case soundDash:
        audioSource.buffer = boostNoiseBuffer;

        biquadFilter.type = 'lowpass';

        biquadFilter.frequency.setValueAtTime(440, time);
        biquadFilter.frequency.linearRampToValueAtTime(440, time + noteLength * 2);  
        gain.gain.linearRampToValueAtTime(1, audioContext.currentTime + 1/64);
        gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + noteLength * 2);

        soundLength = noteLength * 2;
        break;
        */
      case SOUND_GREEN:
        noteLength = 1/4;
        audioSource.type = 'triangle';
        audioSource.frequency.setValueAtTime(midiToFreq(43), time);    // G2

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 1/32);
        gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + noteLength);

        soundLength = noteLength;

      break;
      case SOUND_RED:
        noteLength = 1/4;
        audioSource.type = 'triangle';
        audioSource.frequency.setValueAtTime(midiToFreq(47), time);    // b2

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 1/32);
        gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + noteLength);

        soundLength = noteLength;

      break;


      /*
      case soundYellow:
        noteLength = 1/4;
        audioSource.type = 'triangle';
        audioSource.frequency.setValueAtTime(midiToFreq(50), time);    // d3

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 1/32);
        gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + noteLength);

        soundLength = noteLength;

      break;  
      case soundPurple:
        noteLength = 1/4;
        audioSource.type = 'triangle';
        audioSource.frequency.setValueAtTime(midiToFreq(54), time);    // f#3

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 1/32);
        gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + noteLength);

        soundLength = noteLength;

      break;
      */
      case SOUND_EXIT:
        noteLength = 1/12;
        audioSource.type = 'triangle';
        audioSource.frequency.setValueAtTime(midiToFreq(55), time);    // G4
        audioSource.frequency.setValueAtTime(midiToFreq(62), time + noteLength);  // D4
        audioSource.frequency.setValueAtTime(midiToFreq(67), time + noteLength * 2);    // G4

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 1/64);
        gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + noteLength * 6);

        soundLength = noteLength * 6;

      break;
    }

    audioSource.start(audioContext.currentTime);
    audioSource.stop(audioContext.currentTime+soundLength);

  }
}
