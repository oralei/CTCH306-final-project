console.log("medieval.js loaded sucessfully!");
SceneManager.init('medieval')

// Integer that hold scene state for tracking:
var sceneState = 0;
console.log(sceneState);

// ----- Sounds ----
var warSound = new Audio('data/medieval/audio/war-sounds.mp3');
warSound.volume = 0.5;

var churchSound = new Audio('data/medieval/audio/bell.mp3');
churchSound.volume = 0.5;

// CRAB OBJECT
document.getElementById('crab').addEventListener('click', () => {
  if (sceneState == 0){
    loadDialogue('data/medieval/crab1.json');
  }
  else if (sceneState == 3){
    loadDialogue('src/look-around.json');
    console.log("You need to progress! Scene State: " + sceneState);
  }
  else{
    loadDialogue('src/look-around.json');
    console.log("You need to progress! Scene State: " + sceneState);
  }
});

// WAR OBJECT
document.getElementById('war').addEventListener('click', () => {
  if (sceneState == 1){
    warSound.play();
    loadDialogue('data/medieval/war.json');
  }
  else{
    loadDialogue('src/look-around.json');
    console.log("You need to progress! Scene State: " + sceneState);
  }
});

// CHURCH OBJECT
document.getElementById('church').addEventListener('click', () => {
  if (sceneState == 2){
    churchSound.currentTime = 0;
    churchSound.play();
    loadDialogue('data/medieval/church.json');
  }
  else{
    loadDialogue('src/look-around.json');
    console.log("You need to progress! Scene State: " + sceneState);
  }
});

/* DEBUG BUTTON
document.getElementById('nextSceneBtn').addEventListener('click', () => {
  SceneManager.next();
}); */

function triggerEvent(eventName) {
  switch(eventName) {
    case "add_state":
      sceneState++;
      console.log(sceneState);
      break;
    case "bell":
      churchSound.play();
      break;
    case "change_scene":
      SceneManager.next();
      break;
  }
}