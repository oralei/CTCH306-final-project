console.log("modern.js loaded sucessfully!");
SceneManager.init('modern')

// Integer that hold scene state for tracking:
var sceneState = 0;
console.log(sceneState);

speakerColors['Crab'] = '#ffffff';
speakerColors['You']  = '#ffffff';

// ----- Sounds -----
var satelliteSound = new Audio('data/modern/audio/satellite-sound.mp3');
var towerSound = new Audio('data/modern/audio/radio-tower.mp3');

// CRAB OBJECT
document.getElementById('crab').addEventListener('click', () => {
  if (sceneState == 0){
    loadDialogue('data/modern/crab1.json');
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

// Satellite OBJECT
document.getElementById('satellite').addEventListener('click', () => {
  if (sceneState == 1){
    satelliteSound.currentTime = 0;
    satelliteSound.play();
    loadDialogue('data/modern/satellite.json');
  }
  else{
    loadDialogue('src/look-around.json');
    console.log("You need to progress! Scene State: " + sceneState);
  }
});

// Radio Tower OBJECT
document.getElementById('radio-tower').addEventListener('click', () => {
  if (sceneState == 2){
    towerSound.currentTime = 0;
    towerSound.play();
    loadDialogue('data/modern/tower.json');
  }
  else{
    loadDialogue('src/look-around.json');
    console.log("You need to progress! Scene State: " + sceneState);
  }
});

// ------- Phone OBJECT ----------
var phoneUp = false;
var hasWIFI = false;
const phone = document.getElementById('phone-main');
const apps = document.getElementById('screen');
const internetApp = document.getElementById('internet-app');

phone.addEventListener('click', () => {
  if (phoneUp == false)
  {
    if (hasWIFI == false)
    {
      phone.classList.add("phone-no-wifi");
      phone.classList.add("phone-up");
      phoneUp = true;
    }
    else // has wifi, phone is on and able to be used
    {
      phone.classList.add("phone-on");
      apps.classList.remove("hidden");
      phone.classList.add("phone-up");
      phoneUp = true;
    }
  }
  else
  {
    if (hasWIFI == false)
    {
      loadDialogue('data/modern/needWIFI.json');
      phone.classList.remove("phone-no-wifi");
      phone.classList.remove("phone-up")
      phoneUp = false;
    }
    else // put away phone using button
    {
      phone.classList.remove("phone-on");
      apps.classList.add("hidden");
      phone.classList.remove("phone-up")
      phoneUp = false;
    }
  }
});

internetApp.addEventListener('click', () => {
  if (sceneState == 3){
    loadDialogue('data/modern/internet.json');
  }
});


// --------- EVENTS -------------

function triggerEvent(eventName) {
  switch(eventName) {
    case "add_state":
      sceneState++;
      console.log(sceneState);
      break;
    case "giveWIFI":
      hasWIFI = true;
      break;
    case "bell":
      churchSound.play();
      break;
    case "change_scene":
      SceneManager.next();
      break;
  }
}