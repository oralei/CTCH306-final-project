console.log("modern.js loaded sucessfully!");
SceneManager.init('modern')

// Integer that hold scene state for tracking:
var sceneState = 0;
console.log(sceneState);

speakerColors['Crab'] = '#ffffff';
speakerColors['You']  = '#ffffff';
// ----- Sounds -----
var warSound = new Audio('/data/medieval/audio/war-sounds.mp3');
warSound.volume = 0.5;

var churchSound = new Audio('/data/medieval/audio/bell.mp3');
churchSound.volume = 0.5;

// CRAB OBJECT
document.getElementById('crab').addEventListener('click', () => {
  if (sceneState == 0){
    loadDialogue('/data/medieval/crab1.json');
  }
  else if (sceneState == 3){
    loadDialogue('/src/look-around.json');
    console.log("You need to progress! Scene State: " + sceneState);
  }
  else{
    loadDialogue('/src/look-around.json');
    console.log("You need to progress! Scene State: " + sceneState);
  }
});

// Radio Tower OBJECT
document.getElementById('radio-tower').addEventListener('click', () => {
  if (sceneState == 1){
    warSound.play();
    loadDialogue('/data/medieval/war.json');
  }
  else{
    loadDialogue('/src/look-around.json');
    console.log("You need to progress! Scene State: " + sceneState);
  }
});

// Factory OBJECT
document.getElementById('factory').addEventListener('click', () => {
  if (sceneState == 2){
    churchSound.currentTime = 0;
    churchSound.play();
    loadDialogue('/data/medieval/church.json');
  }
  else{
    loadDialogue('/src/look-around.json');
    console.log("You need to progress! Scene State: " + sceneState);
  }
});

// ------- Phone OBJECT ----------
var phoneUp = false;
var hasWIFI = false;
const phone = document.getElementById('phone-main')

phone.addEventListener('click', () => {
  if (phoneUp == false)
  {
    if (hasWIFI == false)
    {
      phone.classList.add("phone-no-wifi");
    }
    phone.classList.add("phone-up");
    phoneUp = true;
  }
  else
  {
    if (hasWIFI == false)
    {
      loadDialogue('/data/modern/needWIFI.json');
      phone.classList.remove("phone-no-wifi");
    }
    phone.classList.remove("phone-up")
    phoneUp = false;
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