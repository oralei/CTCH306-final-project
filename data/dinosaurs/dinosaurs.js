console.log("dinosaurs.js loaded sucessfully!");
SceneManager.init('dinosaurs')

// Integer that hold scene state for tracking:
var sceneState = 0;
console.log(sceneState);

questMarker = document.getElementById('exclaim');

// ---------- SOUNDS -------------
var dinoSound1 = new Audio('data/dinosaurs/audio/grumble.mp3');
var dinoSound2 = new Audio('data/dinosaurs/audio/dino_roar.mp3');
var meteorAmbience = new Audio('data/dinosaurs/audio/meteorTheme.wav');
var meteorSound = new Audio('data/dinosaurs/audio/meteorFire.mp3');

// CRAB OBJECT
document.getElementById('crab').addEventListener('click', () => {
  if (sceneState == 0){
    loadDialogue('data/dinosaurs/dino-crab1.json');
  }
  else if (sceneState == 2){
    loadDialogue('data/dinosaurs/dino-crab2.json');
  }
  else{
    loadDialogue('src/look-around.json');
    console.log("You need to progress! Scene State: " + sceneState);
  }
});

// TREX OBJECT
document.getElementById('trex').addEventListener('click', () => {
  if (sceneState == 1){
    dinoSound2.currentTime = 0;
    dinoSound2.play();
    loadDialogue('data/dinosaurs/trex-dialogue.json');
  }
  else{
    loadDialogue('src/look-around.json');
    dinoSound1.currentTime = 0;
    dinoSound1.play();
    console.log("You need to progress! Scene State: " + sceneState);
  }
});

// METEOR OBJECT
document.getElementById('meteor').addEventListener('click', () => {
  if (sceneState == 3){
    loadDialogue('data/dinosaurs/meteor.json');
    meteorSound.play();
  }
  else{
    loadDialogue('src/look-around.json');
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
    case "crab_thinks":
      hasThought = true;
      break;
    case "add_exlaim":
      questMarker.classList.remove("hidden");
      break;
    case "remove_exlaim":
      questMarker.classList.add("hidden");
      break;
  }
}

function ShowMeteor()
{
  sceneState++;
  console.log(sceneState);
  meteorAmbience.play()
  document.getElementById('meteor').classList.remove("hidden");
  document.getElementById('sky-bg').classList.add("red-sky");
}

function MeteorCrash()
{
  setTimeout(() => {
    console.log("Waited for 1 seconds");
  }, 1000); // 1000 milliseconds = 1 seconds
  SceneManager.next();
}