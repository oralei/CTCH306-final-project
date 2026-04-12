const items = document.querySelectorAll('.parallax-item');
console.log("parallax.js loaded sucessfully!");

const config = {
    maxTranslate: 50,  // Max pixels to slide
    maxRotate: 15,     // Max degrees to tilt
    perspective: 800   // Lower = more extreme 3D effect, Higher = flatter
};

const clamp = (v) => Math.max(-1, Math.min(1, v));

// Cache each element's natural center BEFORE any transforms are applied
const centers = new Map();
items.forEach(item => {
    const rect = item.getBoundingClientRect();
    centers.set(item, {
        x: rect.left + rect.width  / 2,
        y: rect.top  + rect.height / 2,
        reach: Math.max(rect.width, rect.height) * 2
    });
});

window.addEventListener('mousemove', (e) => {
    const xGlobal = (e.clientX / window.innerWidth - 0.5) * 2;
    const yGlobal = (e.clientY / window.innerHeight - 0.5) * 2;

    items.forEach(item => {
        const depth = parseFloat(item.getAttribute('data-depth')) || 0;
        const tilt  = parseFloat(item.getAttribute('data-tilt'))  || 0;

        // Translation: screen-relative for classic parallax feel
        const translateX = xGlobal * config.maxTranslate * depth * -1;
        const translateY = yGlobal * config.maxTranslate * depth * -1;

        // Tilt: relative to this element's own cached center
        const { x: cx, y: cy, reach } = centers.get(item);
        const xLocal = clamp((e.clientX - cx) / reach);
        const yLocal = clamp((e.clientY - cy) / reach);

        const rotateY = xLocal * config.maxRotate * tilt;
        const rotateX = yLocal * config.maxRotate * tilt * -1;

        item.style.transform = `
            perspective(${config.perspective}px)
            translate(${translateX}px, ${translateY}px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;
    });
});

document.addEventListener('mouseleave', () => {
    items.forEach(item => {
        item.style.transform = `perspective(${config.perspective}px) translate(0px, 0px) rotateX(0deg) rotateY(0deg)`;
    });
});

var hoverSound = new Audio('src/hoverSound.mp3');
hoverSound.volume = 0.7;

window.onHover = function()
{
    hoverSound.currentTime = 0;
    hoverSound.play();
}