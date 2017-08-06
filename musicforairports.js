const SAMPLE_LIBRARY = {
  'Oboe': [
    { note: 'A', octave: 4, file: 'Samples/Oboe/oboe-a#4.wav'},
    { note: 'A', octave: 5, file: 'Samples/Oboe/oboe-a#5.wav'},
    { note: 'C', octave: 4, file: 'Samples/Oboe/oboe-C#4.wav'},
    { note: 'C', octave: 5, file: 'Samples/Oboe/oboe-C#5.wav'},
    { note: 'C', octave: 6, file: 'Samples/Oboe/oboe-C6.wav'},
    { note: 'E', octave: 4, file: 'Samples/Oboe/oboe-e4.wav'},
    { note: 'E', octave: 5, file: 'Samples/Oboe/oboe-e5.wav'},
    { note: 'G', octave: 4, file: 'Samples/Oboe/oboe-g4.wav'},
    { note: 'G', octave: 5, file: 'Samples/Oboe/oboe-g5.wav'}
  ],
  'Grand Piano': [
    { note: 'A',  octave: 4, file: 'Samples/Grand Piano/piano-f-a4.wav' },
    { note: 'A',  octave: 5, file: 'Samples/Grand Piano/piano-f-a5.wav' },
    { note: 'A',  octave: 6, file: 'Samples/Grand Piano/piano-f-a6.wav' },
    { note: 'C',  octave: 4, file: 'Samples/Grand Piano/piano-f-c4.wav' },
    { note: 'C',  octave: 5, file: 'Samples/Grand Piano/piano-f-c5.wav' },
    { note: 'C',  octave: 6, file: 'Samples/Grand Piano/piano-f-c6.wav' },
    { note: 'D#',  octave: 4, file: 'Samples/Grand Piano/piano-f-d#4.wav' },
    { note: 'D#',  octave: 5, file: 'Samples/Grand Piano/piano-f-d#5.wav' },
    { note: 'D#',  octave: 6, file: 'Samples/Grand Piano/piano-f-d#6.wav' },
    { note: 'F#',  octave: 4, file: 'Samples/Grand Piano/piano-f-f#4.wav' },
    { note: 'F#',  octave: 5, file: 'Samples/Grand Piano/piano-f-f#5.wav' },
    { note: 'F#',  octave: 6, file: 'Samples/Grand Piano/piano-f-f#6.wav' }
  ],
  'Cello': [
    { note: 'A',  octave: 4, file: 'Samples/Cello/cello-a4.wav' },
    { note: 'A',  octave: 5, file: 'Samples/Cello/cello-a5.wav' },
    { note: 'A',  octave: 6, file: 'Samples/Cello/cello-a6.wav' },
    { note: 'C',  octave: 4, file: 'Samples/Cello/cello-c4.wav' },
    { note: 'C',  octave: 5, file: 'Samples/Cello/cello-c5.wav' },
    { note: 'C',  octave: 6, file: 'Samples/Cello/cello-c6.wav' },
    { note: 'D#',  octave: 4, file: 'Samples/Cello/cello-d#4.wav' },
    { note: 'D#',  octave: 5, file: 'Samples/Cello/cello-d#5.wav' },
    { note: 'D#',  octave: 6, file: 'Samples/Cello/cello-d#6.wav' },
    { note: 'F#',  octave: 4, file: 'Samples/Cello/cello-f#4.wav' },
    { note: 'F#',  octave: 5, file: 'Samples/Cello/cello-f#5.wav' },
    { note: 'F#',  octave: 6, file: 'Samples/Cello/cello-f#6.wav' }
  ],
  'Timpani': [
    { note: 'A',  octave: 1, file: 'Samples/Percussion/timpani-roll-a1.wav' },
    { note: 'C',  octave: 1, file: 'Samples/Percussion/timpany-roll-c1.wav' },
    { note: 'C',  octave: 2, file: 'Samples/Percussion/timpany-roll-c2.wav' },
    { note: 'C',  octave: 6, file: 'Samples/Cello/cello-c6.wav' },
    { note: 'D#',  octave: 4, file: 'Samples/Cello/cello-d#4.wav' },
    { note: 'D#',  octave: 5, file: 'Samples/Cello/cello-d#5.wav' },
    { note: 'D#',  octave: 6, file: 'Samples/Cello/cello-d#6.wav' },
    { note: 'F#',  octave: 4, file: 'Samples/Cello/cello-f#4.wav' },
    { note: 'F#',  octave: 5, file: 'Samples/Cello/cello-f#5.wav' },
    { note: 'F#',  octave: 6, file: 'Samples/Cello/cello-f#6.wav' }
  ],
  'Bass Drum': [
    { note: 'F', octave: 4, file: 'Samples/Percussion/bass_drum-f.wav'}
  ],
  'Chorus': [
    { note: 'A',  octave: 4, file: 'Samples/Chorus/chorus-female-a4.wav' },
    { note: 'A',  octave: 5, file: 'Samples/Chorus/chorus-female-a5.wav' },
    { note: 'C',  octave: 5, file: 'Samples/Chorus/chorus-female-c5.wav' },
    { note: 'C',  octave: 6, file: 'Samples/Chorus/chorus-female-c6.wav' },
  ]
};

const OCTAVE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

let audioContext = new AudioContext();

// Control variable, set to start time when playing begins
let playingSince = null;

function fetchSample(path) {
  return fetch(encodeURIComponent(path))
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer));
}

function noteValue(note, octave) {
  return octave * 12 + OCTAVE.indexOf(note);
}

function getNoteDistance(note1, octave1, note2, octave2) {
  return noteValue(note1, octave1) - noteValue(note2, octave2);
}

function getNearestSample(sampleBank, note, octave) {
  let sortedBank = sampleBank.slice().sort((sampleA, sampleB) => {
    let distanceToA =
      Math.abs(getNoteDistance(note, octave, sampleA.note, sampleA.octave));
    let distanceToB =
      Math.abs(getNoteDistance(note, octave, sampleB.note, sampleB.octave));
    return distanceToA - distanceToB;
  });
  return sortedBank[0];
}

function flatToSharp(note) {
  switch (note) {
    case 'Bb': return 'A#';
    case 'Db': return 'C#';
    case 'Eb': return 'D#';
    case 'Gb': return 'F#';
    case 'Ab': return 'G#';
    default:   return note;
  }
}

function getSample(instrument, noteAndOctave) {
  let [, requestedNote, requestedOctave] = /^(\w[b\#]?)(\d)$/.exec(noteAndOctave);
  requestedOctave = parseInt(requestedOctave, 10);
  requestedNote = flatToSharp(requestedNote);
  let sampleBank = SAMPLE_LIBRARY[instrument];
  let sample = getNearestSample(sampleBank, requestedNote, requestedOctave);
  let distance =
    getNoteDistance(requestedNote, requestedOctave, sample.note, sample.octave);
  return fetchSample(sample.file).then(audioBuffer => ({
    audioBuffer: audioBuffer,
    distance: distance
  }));
}

function playSample(instrument, note, destination, delaySeconds = 0) {
  getSample(instrument, note).then(({audioBuffer, distance}) => {
    let playbackRate = Math.pow(2, distance / 12);
    var bufferSource = audioContext.createBufferSource();

    bufferSource.buffer = audioBuffer;
    bufferSource.playbackRate.value = playbackRate;

    bufferSource.connect(destination);
    bufferSource.start(audioContext.currentTime + delaySeconds);
  });
}

function stopSample() {
  bufferSource.stop();
}

function startLoop(instrument, note, destination, loopLengthSeconds, delaySeconds) {
  playSample(instrument, note, destination, delaySeconds);
  setInterval(
    () => playSample(instrument, note, destination, delaySeconds),
    loopLengthSeconds * 1000
  );
  return true;
}

fetchSample('AirportTerminal.wav').then(convolverBuffer => {
  $(".update-instrument1").click(function () {
    /*** Instrument 1 ***/
    var instrument1 = document.getElementById("instrument-1");
    var loop1 = document.getElementById("loop1").value;
    var loopNum = parseInt(loop1);
    var delay1 = document.getElementById("delay1").value;
    var delayNum = parseInt(delay1);
    var note = document.getElementById("notes");
    var sharpFlat = document.getElementById("sharpFlat");
    var octave = document.getElementById("octave");
    var noteValue = note.value+sharpFlat.value+octave.value;
    let convolver, runningLoops;
    convolver = audioContext.createConvolver();
    convolver.buffer = convolverBuffer;
    convolver.connect(audioContext.destination);

    var selectInstrument1 = $(".instrument1:checked").val();
    startLoop(selectInstrument1, noteValue, convolver, loopNum, delayNum);


    var random1 = Math.floor((Math.random() * 30) + 1);
    var random2 = Math.floor((Math.random() * 30) + 1);
    var random3 = Math.floor((Math.random() * 30) + 1);
    var random4 = Math.floor((Math.random() * 30) + 1);
    var random5 = Math.floor((Math.random() * 30) + 1);
    var random6 = Math.floor((Math.random() * 30) + 1);

    /*startLoop('Grand Piano', 'Eb5', convolver, random1, random2);
    startLoop('Grand Piano', 'F5',  convolver, random3, random4);
    startLoop('Grand Piano', 'Ab5', convolver, random5, random6);*/
  });
    
  /*startLoop('Grand Piano', 'Ab5', convolver, 1, 1);*/
  /*startLoop('Cello', 'F4',  convolver, loop, delay);*/
  /*startLoop('Cello', 'F4',  convolver, 19.7, 4.0);*/
  /*startLoop('Bass Drum', 'F4', convolver, 30, 2);
  startLoop('Timpani', 'A1', convolver, 10, 6);
  startLoop('Timpani', 'C2', convolver, 5, 7);
  startLoop('Cello', 'Ab4', convolver, 17.8, 8.1);
  startLoop('Cello', 'C5',  convolver, 21.3, 5.6);
  startLoop('Grand Piano', 'Eb5', convolver, 30, 15);
  startLoop('Grand Piano', 'F5',  convolver, 16, 2);
  startLoop('Grand Piano', 'Ab5', convolver, 20, 3);*/
  
});














