// find elements
const playButton = document.getElementById("playButton");
const reverbSlider = document.getElementById("performanceTester");
const introModal = document.getElementById("introDialog");
const modalCloseButton = document.getElementById("dialogCloseButton");
// set global variables
let isPlaying = false;

// create synth
const synth = new Tone.Synth({
  oscillator: {
    type: "fatsawtooth",
    count: 3,
    spread: 10,
  },
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.5,
    release: 0.1,
    attackCurve: "exponential",
  },
});

// create reverb
const reverb = new Tone.Reverb(2);

const loop = new Tone.Loop((time) => {
  synth.triggerAttackRelease("C4", "8n", time);
}, "2n").start(0);

// start/stop playback
function playPause() {
  if (!isPlaying) {
    Tone.Transport.start();
    playButton.textContent = "⏸";
    isPlaying = true;
  } else {
    playButton.textContent = "▶";
    Tone.Transport.pause();
    isPlaying = false;
  }
}

// add to button
playButton.addEventListener("click", playPause);

// run when dialog closed
function toneInit() {
  synth.chain(reverb, Tone.Destination);
}

/* to get the backdrop working we need to open the modal with js */
introModal.showModal();
/* add an eventlistener */
modalCloseButton.addEventListener("click", () => {
  introModal.close();
});
/* initialize the synthesizer when the modal is closed */
introModal.addEventListener("close", toneInit);

/////// optimising examples
function changeReverbDecay(newVerbDecayAmt) {
  reverb.set({ decay: newVerbDecayAmt });
}

function changeReverbFeedback() {
  let circle = document.getElementById("circle");
  let slider = document.getElementById("performanceTester");
  console.log(circle);
  circle.style.height = slider.value * 2 + "rem";
  circle.style.width = slider.value * 2 + "rem";
}

reverbSlider.addEventListener("input", (e) => {
  console.log(e);
  changeReverbDecay(e.target.value);
  changeReverbFeedback();
});
