document.getElementById('crab').addEventListener('click', () => {
  moveObject('crab', 15, 5)
  loadDialogue('data/intro/intro.json');
});

// Dialogue engine
// Loads data from a .json and runs the node graph.

const box       = document.getElementById('dialogue-box');
const speakerEl = document.getElementById('speaker');
const textEl    = document.getElementById('dialogue-text');
const choicesEl = document.getElementById('choices');
const hintEl    = document.getElementById('continue-hint');

let dialogueData;

async function loadDialogue() {
  const response = await fetch('data/intro/intro.json');
  dialogueData = await response.json();
  showNode(dialogueData.start);
}

function showNode(nodeKey) {
  showDialogueBox();

  if (!nodeKey) return endDialogue();

  const node = dialogueData.nodes[nodeKey];
  if (!node) return console.error('Missing node:', nodeKey);

  // Speaker
  speakerEl.textContent = node.speaker || '';

  // Animate text in
  textEl.className = 'text-animate';
  textEl.textContent = node.text;

  // Reset state
  choicesEl.innerHTML = '';
  hintEl.classList.remove('visible');
  box.classList.remove('ended');
  box.onclick = null;
  textEl.classList.remove('done', 'has-choices');

  if (node.choices && node.choices.length) {
    // Branch: render choice buttons
    hintEl.classList.remove('visible');
    box.classList.remove('clickable');
    textEl.classList.add('has-choices');
    node.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.textContent = choice.text;
      btn.onclick = (e) => {
        e.stopPropagation();
        showNode(choice.next);
      };
      choicesEl.appendChild(btn);
    });

  } else if (node.next) {
    // Linear: click box to advance
    box.classList.add('clickable');
    textEl.classList.add('done');
    hintEl.classList.add('visible');
    box.onclick = () => showNode(node.next);

  } else {
    // End of branch
    endDialogue();
  }
}

function endDialogue() {
  box.onclick = null;
  hintEl.classList.remove('visible');
  textEl.classList.add('done');
  setTimeout(hideDialogueBox, 200);
}

// Dialogue box show and hide animations:

function showDialogueBox() {
  const box = document.getElementById('dialogue-box');
  box.style.display = 'block';
  requestAnimationFrame(() => requestAnimationFrame(() => box.classList.add('visible')));
}

function hideDialogueBox() {
  const box = document.getElementById('dialogue-box');
  box.style.transform = 'translateX(-50%) translateY(100px)';
  box.classList.remove('visible');
    setTimeout(() => {
    box.style.display = 'none';
    box.style.transform = '';
  }, 500);
}

function moveObject(id, xPercent, yPercent) {
  const el = document.getElementById(id);
  el.style.left = xPercent + "%";
  el.style.bottom = yPercent + "%";
}
