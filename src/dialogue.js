// Dialogue engine
// Loads data from a .json and runs the node graph.
console.log("dialogue.js loaded sucessfully!");

// Get elements from page:
const box       = document.getElementById('dialogue-box');
const speakerEl = document.getElementById('speaker');
const textEl    = document.getElementById('dialogue-text');
const choicesEl = document.getElementById('choices');
const hintEl    = document.getElementById('continue-hint');
const nextSFX   = document.getElementById('next-sound');

nextSFX.volume = 0.2; // Made silent for now

let dialogueData;

async function loadDialogue(path) {
  // reset previous dialogue
  currentNode = null;

  const response = await fetch(path);
  dialogueData = await response.json();
  showNode(dialogueData.start);
}

function applyVariables(text) {
  return text.replace(/\{(.*?)\}/g, (match, key) => {
    return dialogueVars[key] ?? match;
  });
}

function showNode(nodeKey) {
  showDialogueBox();

  if (!nodeKey) return endDialogue();

  const node = dialogueData.nodes[nodeKey];
  if (!node) return console.error('Missing node:', nodeKey);

  // Trigger node event
  if (node.event) {
    triggerEvent(node.event);
  }

  // Speaker
  speakerEl.textContent = node.speaker || '';
  // Speaker color
  const speakerColors = {
    'Crab': '#9c160c',
    'You':  '#09386e',
  };
  const colorS = speakerColors[node.speaker] || '#000000';
  speakerEl.style.color = colorS;

  // Animate text in
  textEl.className = 'text-animate';
  textEl.textContent = applyVariables(node.text);

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
      btn.textContent = applyVariables(choice.text);
      btn.onclick = (e) => {
        e.stopPropagation();
        showNode(choice.next);
      };
      choicesEl.appendChild(btn);
    });

  } else if (node.next) {
    nextSFX.play();
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

function refreshCenter(item) {
    // Temporarily clear transform so getBoundingClientRect reflects true position
    const prev = item.style.transform;
    item.style.transform = '';
    const rect = item.getBoundingClientRect();
    centers.set(item, {
        x: rect.left + rect.width  / 2,
        y: rect.top  + rect.height / 2,
        reach: Math.max(rect.width, rect.height) * 2
    });
    item.style.transform = prev;
}

function moveObject(id, xPercent, yPercent) {
  const el = document.getElementById(id);
  el.style.left = xPercent + "%";
  el.style.bottom = yPercent + "%";

  // Re-cache center so parallax tilt uses the new position
  setTimeout(() => refreshCenter(el), 400);
}

function scaleObject(id, newValue)
{
  const el = document.getElementById(id);
  el.style.scale = newValue;
}
