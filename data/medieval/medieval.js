console.log("medieval.js loaded sucessfully!");
SceneManager.init('medieval')

// Integer that hold scene state for tracking:
var sceneState = 0;
console.log(sceneState);


// CRAB OBJECT
document.getElementById('crab').addEventListener('click', () => {
  if (sceneState == 0){
    loadDialogue('/data/medieval/crab1.json');
  }
  else if (sceneState == 2){
    loadDialogue('/data/medieval/crab2.json');
  }
  else{
    loadDialogue('/src/look-around.json');
    console.log("You need to progress! Scene State: " + sceneState);
  }
});

// TREX OBJECT
document.getElementById('war').addEventListener('click', () => {
  if (sceneState == 1){
    loadDialogue('/data/medieval/war.json');
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