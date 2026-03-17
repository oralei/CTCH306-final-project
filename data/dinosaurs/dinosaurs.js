console.log("dinosaurs.js loaded sucessfully!");
SceneManager.init('dinosaurs')

// Integer that hold scene state for tracking:
var sceneState = 0;
console.log(sceneState);

document.getElementById('crab').addEventListener('click', () => {
  if (sceneState == 0){
    loadDialogue('/data/dinosaurs/crab1.json');
  }
  else if (sceneState == 2){
    loadDialogue('/data/dinosaurs/crab2.json');
  }
  else{
    loadDialogue('/src/look-around.json');
    console.log("You need to progress! Scene State: " + sceneState);
  }
});

document.getElementById('trex').addEventListener('click', () => {
  if (sceneState == 1){
    loadDialogue('/data/dinosaurs/trex-dialogue.json');
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
    case "switch_scene":
      SceneManager.next();
      break;
  }
}