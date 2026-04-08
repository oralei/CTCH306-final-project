console.log("intro.js loaded sucessfully!");
SceneManager.init('intro')

requestAnimationFrame(() => requestAnimationFrame(() => {
  setTimeout(() => {
    const menu = document.getElementById('main-menu');
    menu.style.transition = 'none';      // instant, no fade
    menu.style.opacity = '1';
    menu.style.pointerEvents = 'all';
    menu.classList.add('visible');

    // Re-enable transition for when Play dismisses it
    setTimeout(() => {
      menu.style.transition = 'opacity 0.8s ease';
    }, 50);

    SceneManager.fadeInScene(600);
  }, 300);
}));

var playButtonSound = new Audio('data/coastline/audio/playButton.mp3');

// Play button: fade menu out, then fade scene in
document.getElementById('play-btn').addEventListener('click', () => {
  playButtonSound.play();
  const menu = document.getElementById('main-menu');
  menu.style.transition = 'opacity 3s ease';
  menu.style.opacity = '0';
  menu.style.pointerEvents = 'none';

  setTimeout(() => {
    menu.style.display = 'none';
    SceneManager.fadeInScene(900);
  }, 3000);
});

// Dialogue Variables
const dialogueVars = {
  time: (getTime().getHours()+":"+(getTime().getMinutes() < 10 ? '0' : '') + getTime().getMinutes())
};



document.getElementById('crab').addEventListener('click', () => {
  moveObject('crab', 13, 13);
  scaleObject('crab', 1.1)
  loadDialogue('data/intro/intro.json');
  document.getElementById("crab").src="data/coastline/media/testCrab.png";
});

document.getElementById('seagull').addEventListener('click', () => {
  seagullSound.play();
  loadDialogue('data/intro/seagull.json');
});

var crabSound = new Audio('src/crab-sounds/crabSound1.wav');
crabSound.volume = 1;
var seagullSound = new Audio('data/coastline/audio/seagull.mp3');

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