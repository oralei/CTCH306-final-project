console.log("dinosaurs.js loaded sucessfully!");
SceneManager.init('dinosaurs')

document.getElementById('crab').addEventListener('click', () => {
  loadDialogue('/data/dinosaurs/dinosaurs-1.json');
});

document.getElementById('nextSceneBtn').addEventListener('click', () => {
  SceneManager.next();
});