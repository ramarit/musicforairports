 const SAMPLE_LIBRARY = {
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
  ]
};

const OCTAVE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];



let audioContext = new AudioContext();

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

//turn flat notes to sharp
function flatToSharp(note) {
  switch (note) {
    case 'Bb' : return 'A#';
    case 'Db' : return 'C#';
    case 'Eb' : return 'D#';
    case 'Gb' : return 'F#';
    case 'Ab' : return 'G#';
    default: return note;
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
    distance: getNoteDistance(requestedNote, requestedOctave, nearestSample.note, nearestSample.octave)
  }));
}

function playSample(instrument, note, destination, delaySeconds = 0) {
  getSample(instrument,note).then(({audioBuffer, distance}) => {
    let playbackRate = Math.pow(2, distance / 12);
    let bufferSource = audioContext.createBufferSource();

    bufferSource.buffer = audioBuffer;
    bufferSource.playbackRate.value = playbackRate;

    bufferSource.connect(destination);
    bufferSource.start(audioContext.currentTime + delaySeconds);
  })
}

function startLoop(instrument, note, destination, loopLengthSeconds, delaySeconds) {
  playSample(instrument, note, destination, delaySeconds);
  setInterval(() => playSample(instrument, note, destination, delaySeconds), loopLengthSeconds * 1000);
}

fetchSample('AirportTerminal.wav').then(convolverBuffer => {

  let convolver = audioContext.createConvolver();
  convolver.buffer = convolverBuffer;
  convolver.connect(audioContext.destination);

  startLoop('Grand Piano', 'F4',  convolver, 10, 3);
  startLoop('Grand Piano', 'Ab4', convolver, 15, 2);
  startLoop('Grand Piano', 'C5',  convolver, 20, 19);
  startLoop('Grand Piano', 'Db5', convolver, 18, 9);
  startLoop('Grand Piano', 'Eb5', convolver, 30, 15);
  startLoop('Grand Piano', 'F5',  convolver, 16, 2);
  startLoop('Grand Piano', 'Ab5', convolver, 20, 3);
  startLoop('Cello', 'F4',  convolver, 19.7, 4.0);
  startLoop('Bass Drum', 'F4', convolver, 30, 2);
  startLoop('Timpani', 'A1', convolver, 10, 6);
  startLoop('Timpani', 'C2', convolver, 5, 7);
  /*startLoop('Cello', 'Ab4', convolver, 17.8, 8.1);
  startLoop('Cello', 'C5',  convolver, 21.3, 5.6);
  startLoop('Cello', 'Db5', convolver, 22.1, 12.6);
  startLoop('Cello', 'Eb5', convolver, 18.4, 9.2);
  startLoop('Cello', 'F5',  convolver, 20.0, 14.1);
  startLoop('Cello', 'Ab5', convolver, 17.7, 3.1);*/
})







