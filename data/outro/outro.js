console.log("outro.js loaded sucessfully!");
SceneManager.init('outro');

// Integer that hold scene state for tracking:
var sceneState = 0;
console.log(sceneState);

// ---------- SOUNDS -------------
var crabSound = new Audio('/data/dinosaurs/audio/grumble.mp3');

// CRAB OBJECT
document.getElementById('crab').addEventListener('click', () => {
  if (sceneState == 0){
    loadDialogue('/data/outro/crab1.json');
  }
  else if (sceneState == 2){
    loadDialogue('/data/dinosaurs/dino-crab2.json');
  }
  else{
    loadDialogue('/src/look-around.json');
    console.log("You need to progress! Scene State: " + sceneState);
  }
});

// MOON OBJECT
document.getElementById('moon').addEventListener('click', () => {
  if (sceneState == 0){
    loadDialogue('/data/outro/moon.json');
  }
  else{
    loadDialogue('/src/look-around.json');
    console.log("You need to progress! Scene State: " + sceneState);
  }
});

document.getElementById('nextSceneBtn').addEventListener('click', () => {
  SceneManager.next();
});

function triggerEvent(eventName) {
  switch(eventName) {
    case "add_state":
      sceneState++;
      console.log(sceneState);
      break;
    case "show_meteor":
      ShowMeteor()
      break;
    case "meteor_crash":
      MeteorCrash();
      break;
  }
}