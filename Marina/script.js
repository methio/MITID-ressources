
// we use P5.js library to create a canvas and create a display 
// we use P5.sound to easily load/play/manipulate audio in the navigator
// we use tone.js to create sounds and sequences

let song;
const playButton = document.getElementById('play-button');
const stopButton = document.getElementById('pause-button');
const toggleButton = document.getElementById('toggle-button');
let isPlaying = false;

const reverbSlider = document.getElementById('reverb');
let reverb; 
const volumeSlider = document.getElementById('volume');

const rateSlider = document.getElementById('rate');
let ratee;

// Sine wave oscillator
let sineOsc; 
const sineAmp = document.getElementById('sineAmp');
const sineFreq = document.getElementById('sineFreq');

let bg;
let volume = .5;


function preload() {
    song = loadSound('assets/subwoofer-lullaby.mp3');
}


function setup() {
    createCanvas(400, 400);
    reverb = new p5.Reverb();
    sineOsc = new p5.Oscillator('sine');
}

function draw() {
    background(map(volume, 0, 1, 0, 255));
    
}


// CONTROLS 
// playButton.addEventListener('click', () => {
//     song.play();
//     isPlaying = true;

// });

// stopButton.addEventListener('click', () => {
//     song.pause();
//     isPlaying = false;
// });

toggleButton.addEventListener('click', () => {
    if(isPlaying){
        song.pause();
        isPlaying = false;
        sineOsc.amp(0);



    }else{
        song.play();
        isPlaying = true;

        sineOsc.start();
        sineOsc.amp(.8);
    }

});


volumeSlider.addEventListener('input', (event) => {
    volume = parseFloat(event.target.value);
    console.log(volume, typeof(volume));
    song.setVolume(volume);
});

reverbSlider.addEventListener('input', (event) => {
    const rev = parseFloat(event.target.value);
    reverb.process(song, rev, 2);
    // song.amp(amplitude);
});

rateSlider.addEventListener('input', (event) => {
    ratee = parseFloat(event.target.value);
    console.log(ratee, typeof(ratee));
    song.rate(ratee);
});

sineAmp.addEventListener("input", (event) => {
    const amp = parseFloat(event.target.value);
    sineOsc.amp(amp);
});

sineFreq.addEventListener("input", (event) => {
    const freq = parseFloat(event.target.value);
    sineOsc.freq(freq);
});

const buttonNote = document.getElementById('button-note');
buttonNote.addEventListener('click', () => {
    playSound(monoSynth, 440, 500);
});

const playSound = (module, frequency, duration) => {
    let note = random(['Fb4', 'G4']);
    // note velocity (volume, from 0 to 1)
    let velocity = random();
    // time from now (in seconds)
    let time = 0;
    // note duration (in seconds)
    let dur = 1/6;

    module.play(note, velocity, time, dur);
};


// // Variable for frequency (middle C).
// let myFreq = 262;

// // Array of frequencies in C Major.
// let frequencies = [
//   myFreq,
//   myFreq * 9/8,
//   myFreq * 5/4,
//   myFreq * 4/3,
//   myFreq * 3/2,
//   myFreq * 5/3,
//   myFreq * 15/8,
//   myFreq * 2
// ];

// // Melody Object for C Major
// let melody = {
//   name: 'C Major Scale',
//  notesIndex: [0, 1, 2, 3, 4, 5, 6, 7],
//  tempo: 120
// };

// // Empty array for oscillator objects.
// let oscillators = [];

// // Calculate duration of each note in seconds.
// let noteDuration = 60 / melody.tempo;

// function setup() {
//   createCanvas(400, 400);

//   // Initialize oscillators and place in oscillators array.
//   for (let freq of frequencies) {
//     osc = new p5.Oscillator(freq);
//     oscillators.push(osc);
//   }

//   //set color mode to HSB (better for using notes to color keys)
//   colorMode(HSB);
// }

// function draw() {
//   background(220);
//   drawMelody();  
// }

// // Starts playing the note.
// function playNote(n) {
//   // Starts oscillator if needed.
//   if (oscillators[n].started === false) {
//     oscillators[n].start();

//     // Starts playing the note by increasing the volume with a 0.01 sec fade-in.
//     oscillators[n].amp(1, 0.01);
//   }

//   // Stops playing the note after number of seconds stored in noteDuration * 1000
//   setTimeout(stopNote, noteDuration * 1000, n); 
// }

// // Stops playing the note.
// function stopNote(n) {
//   // Lower oscillator volume to 0.
//   oscillators[n].amp(0, 0.01);

//   // Stop the oscillator.
//   oscillators[n].stop();
// }

// // Plays the notes in a melody.
// function play() {
//   // Read each [index, note] in melody.notesIndex
//   for (let [index, note] of melody.notesIndex.entries()) {
//     // Play each note at scheduled time
//     setTimeout(playNote, noteDuration * 1000 * index, note);
//   }
// }

// //play melody with mouse click
// function mousePressed() {
//   play();
// }