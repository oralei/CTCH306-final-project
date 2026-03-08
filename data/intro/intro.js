console.log("intro.js loaded sucessfully!");
SceneManager.init()

// Dialogue Variables
const dialogueVars = {
  time: (getTime().getHours()+":"+(getTime().getMinutes() < 10 ? '0' : '') + getTime().getMinutes())
};

document.getElementById('crab').addEventListener('click', () => {
  moveObject('crab', 15, 5);
  scaleObject('crab', 1.1)
  loadDialogue('data/intro/intro.json');
  document.getElementById("crab").src="../data/coastline/media/testCrab.png";
});

document.getElementById('seagull').addEventListener('click', () => {
  seagullSound.play();
});

var crabSound = new Audio('../src/crab-sounds/crabSound1.wav');
crabSound.volume = 1;
var seagullSound = new Audio('../data/coastline/audio/seagull.mp3');

function triggerEvent(eventName) {
  switch(eventName) {
    case "play_crab_sound":
      crabSound.play();
      break;
    case "switch_scene":
      SceneManager.next();
      break;
  }
}

function getTime()
{
  const date = new Date();
  return date
}