console.log("outro.js loaded sucessfully!");
SceneManager.init('outro');

// Integer that hold scene state for tracking:
var sceneState = 0;
console.log(sceneState);

var turnedBack = true;

// ---------- SOUNDS -------------
var crabSound = new Audio('data/dinosaurs/audio/grumble.mp3');

// CRAB OBJECT
document.getElementById('crab').addEventListener('click', () => {
  if (sceneState >= 0){
    sceneState = 1;
    loadDialogue('data/outro/crab1.json');
  }
  else{
    loadDialogue('src/look-around.json');
    console.log("You need to progress! Scene State: " + sceneState);
  }
});

// MOON OBJECT
document.getElementById('moon').addEventListener('click', () => {
  if (sceneState == 0){
    loadDialogue('data/outro/moon.json');
  }
  else{
    console.log("Nope.");
  }
});

function triggerEvent(eventName) {
  switch(eventName) {
    case "add_state":
      sceneState++;
      console.log(sceneState);
      break;
    case "turn_around":
      console.log("pee");
      turnAround();
      break;
    case "restart_game":
      SceneManager.restart();
      break;
  }
}

function turnAround()
{
  if (turnAround == true)
  {
    // now facing player
    document.getElementById("crab").src="data/coastline/media/testCrab.png";
    triggerJump(document.getElementById("crab"));
    turnAround = false;
  }
  else
  {
    // now facing away
    document.getElementById("crab").src="data/coastline/media/crabBackview.png";
    triggerJump(document.getElementById("crab"));
    turnAround = true;
  }
}

function triggerJump(element) {
  element.classList.add('jumping');

  element.addEventListener('animationend', () => {
    element.classList.remove('jumping');
  }, { once: true });  // "once: true" auto-removes the listener after it fires
}