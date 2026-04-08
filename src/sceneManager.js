console.log("sceneManager.js loaded sucessfully!");

// ─────────────────────────────────────────────────────────────
//  SceneManager
//  Handles random scene selection, visited-scene tracking,
//  and fade-to-black / fade-from-black transitions.
//
//  SETUP
//  ─────
//  1. Drop this file in your /src/ folder.
//  2. Add to every scene page (before closing </body>),
//     BEFORE your scene's intro.js:
//       <script src="src/sceneManager.js"></script>
//       <script src="data/egypt/egypt.js"></script>
//  3. In your dialogue JSON, use this event on the node that
//     should end the scene:
//       "event": "go_to_next_scene"
//  4. In each scene's JS file, call SceneManager.init() with
//     that scene's key as the very first line:
//       SceneManager.init('egypt');
//
//  SCENES REGISTRY
//  ───────────────
//  Add every era page here. "url" is the path from the root.
//  "key" is the unique ID stored in sessionStorage.
// ─────────────────────────────────────────────────────────────

const SCENES = [
  { key: 'intro',      url: 'index.html'},  // intro hub
  { key: 'dinosaurs',  url: 'data/dinosaurs/dinosaurs.html'},
  // Removed for now { key: 'egypt',      url: '/data/egypt/egypt.html'},
  { key: 'medieval',   url: 'data/medieval/medieval.html'},
  { key: 'modern',     url: 'data/modern/modern.html'},
  { key: 'outro',      url: 'data/outro/outro.html'},
];

// Keys that are NEVER picked randomly.
// start at intro; outro is always the final stop.
const FIXED_SCENES = ['intro', 'outro'];

const ERA_SCENES = SCENES.filter(s => !FIXED_SCENES.includes(s.key));

const STORAGE_KEY = 'tdc_visited_scenes'; // tdc = "things don't change"


// ─── Overlay ──────────────────────────────────────────────────
// A full-screen black div injected once per page load.

function getOverlay() {
  let el = document.getElementById('scene-fade-overlay');
  if (!el) {
    el = document.createElement('div');
    el.id = 'scene-fade-overlay';
    Object.assign(el.style, {
      position:      'fixed',
      inset:         '0',
      background:    '#000',
      opacity:       '0',
      pointerEvents: 'none',
      zIndex:        '9999',
      transition:    'opacity 0.8s ease',
    });
    document.body.appendChild(el);
  }
  return el;
}


// ─── Fade helpers ─────────────────────────────────────────────

function fadeToBlack(duration = 800) {
  return new Promise(resolve => {
    const overlay = getOverlay();
    overlay.style.transition  = `opacity ${duration}ms ease`;
    overlay.style.pointerEvents = 'all'; // block clicks while fading
    overlay.style.opacity     = '1';
    setTimeout(resolve, duration);
  });
}

function fadeFromBlack(duration = 900) {
  return new Promise(resolve => {
    const overlay = getOverlay();
    overlay.style.transition  = `opacity ${duration}ms ease`;
    overlay.style.opacity     = '0';
    setTimeout(() => {
      overlay.style.pointerEvents = 'none';
      resolve();
    }, duration);
  });
}


// ─── Visited scene storage ────────────────────────────────────

function getVisited() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function markVisited(key) {
  const visited = getVisited();
  if (!visited.includes(key)) {
    visited.push(key);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(visited));
  }
}

function getUnvisitedEras() {
  const visited = getVisited();
  return ERA_SCENES.filter(s => !visited.includes(s.key));
}

function allErasVisited() {
  return getUnvisitedEras().length === 0;
}


// ─── Navigation ───────────────────────────────────────────────

async function goToScene(key) {
  const scene = SCENES.find(s => s.key === key);
  if (!scene) {
    console.error('[SceneManager] Unknown scene key:', key);
    return;
  }
  await fadeToBlack(800); // 1. Fade to black
  
  // 2. HOLD THE BLACK SCREEN FOR 400ms BEFORE NAVIGATING
  await new Promise(resolve => setTimeout(resolve, 400)); 
  
  window.location.href = scene.url; // 3. Jump to next page
}

async function goToNextScene() {
  if (allErasVisited()) {
    await goToScene('outro');
  } else {
    const unvisited = getUnvisitedEras();
    const next = unvisited[Math.floor(Math.random() * unvisited.length)];
    await goToScene(next.key);
  }
}


// ─── Public API ───────────────────────────────────────────────

const SceneManager = {

  /**
   * Call once at the top of each scene's JS file.
   * Records the visit and fades in from black on load.
   *
   * @param {string} sceneKey  Must match a key in SCENES[].
   */
  init(sceneKey) {
    // 1. AUTO-RESET: If we are loading the main title page, clear all progress!
    if (sceneKey === 'intro') {
      this.reset();
    }

    markVisited(sceneKey);

    // Page starts fully black; fade in once the DOM is ready.
    const overlay = getOverlay();
    overlay.style.transition    = 'none';
    overlay.style.opacity       = '1';
    overlay.style.pointerEvents = 'all';

    // HOLD THE BLACK SCREEN FOR 500ms ON NEW PAGE LOAD
    // Only auto-fade-in for non-intro scenes
    if (sceneKey !== 'intro') {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setTimeout(() => {
            fadeFromBlack(900);
          }, 500);
        })
      );
}

    console.log(
      `[SceneManager] "${sceneKey}" loaded | ` +
      `visited: [${getVisited().join(', ')}] | ` +
      `eras remaining: ${getUnvisitedEras().length}`
    );
  },

  /** Navigate directly to any scene by key. */
  goTo: goToScene,

  /** Go to a random unvisited era, or the ending if all done. */
  next: goToNextScene,

  /** How many era scenes are still unvisited. */
  remaining() { return getUnvisitedEras().length; },

  /** True once every era has been visited. */
  allErasVisited,

  /** Wipe progress. */
  reset() {
    sessionStorage.removeItem(STORAGE_KEY);
    console.log('[SceneManager] Progress reset.');
  },

  /** 2. PLAY AGAIN: Wipes progress and initiates a fade-transition back to the intro */
  async restart() {
    this.reset();
    await goToScene('intro');
  },

  fadeInScene(duration = 900) {
    fadeFromBlack(duration);
  },
  /** Fade the scene in from black. Call this after the intro menu is dismissed. */
};

// ─── Hook into dialogue.js triggerEvent ───────────────────────
// dialogue.js calls triggerEvent(name) for node events.
// sceneManager.js must be loaded BEFORE the scene's intro.js
// so that the scene's triggerEvent can call _super() cleanly.
//
// Usage in any JSON node:
//   "event": "go_to_next_scene"

const _superTriggerEvent =
  typeof triggerEvent === 'function' ? triggerEvent : null;
