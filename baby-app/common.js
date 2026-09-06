/* ==========================================
   Shared Baby App JavaScript module (common.js)
   Includes the Web Audio engine, particle effects, and automatic navigation
   ========================================== */

// 1. Web Audio engine with iOS Safari audio unlocking
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const audioCtx = AudioContextClass ? new AudioContextClass() : null;
let audioUnlockPromise = null;

function unlockAudio() {
    if (!audioCtx) return;

    // Keep resume() and source.start() inside the input event. iOS Safari
    // rejects audio nodes created from a later Promise callback as autoplay.
    if (audioCtx.state !== 'running' && !audioUnlockPromise) {
        audioUnlockPromise = Promise.resolve(audioCtx.resume())
            .catch(() => {})
            .then(() => { audioUnlockPromise = null; });
    }

    // Start this synchronously as part of the touch/pointer gesture.
    const buffer = audioCtx.createBuffer(1, 1, audioCtx.sampleRate);
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start(0);

    window.removeEventListener('touchstart', unlockAudio, true);
    window.removeEventListener('pointerdown', unlockAudio, true);
}
window.addEventListener('touchstart', unlockAudio, true);
window.addEventListener('pointerdown', unlockAudio, true);

const WebAudioEngine = {
    // Play a single tone (sine or triangle waveform)
    playTone(freq, duration = 0.12, type = 'sine', rampGain = true) {
        const ctx = audioCtx;
        if (!ctx) return;
        unlockAudio();

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);

        if (rampGain) {
            osc.frequency.exponentialRampToValueAtTime(freq * 1.15, now + duration);
        }

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + duration);
    },

    // Play a rising arpeggio (celebration or edge-wrap sound)
    playArpeggio(freqs = [523.25, 659.25, 783.99, 1046.50], noteDuration = 0.18, stepTime = 0.05) {
        const ctx = audioCtx;
        if (!ctx) return;
        unlockAudio();

        const baseTime = ctx.currentTime;
        freqs.forEach((freq, index) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const startTime = baseTime + index * stepTime;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(0.18, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + noteDuration);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(startTime);
            osc.stop(startTime + noteDuration);
        });
    }
};

// 2. Particle effects engine (ParticleEngine)
const ParticleEngine = {
    // Rainbow trail while dragging
    createTrail(x, y, options = {}) {
        if (Math.random() > (options.frequency || 0.4)) return;
        const p = document.createElement('div');
        p.className = 'particle';
        const colors = options.colors || ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF9F1C', '#9B5DE5', '#1A1A1A'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const maxSize = Math.max(14, Math.round(Math.min(window.innerWidth, window.innerHeight) * 0.0625));
        const size = Math.floor(Math.random() * (maxSize - 14 + 1)) + 14;

        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.backgroundColor = color;
        p.style.left = `${x + (Math.random() * 20 - 10)}px`;
        p.style.top = `${y + (Math.random() * 20 - 10)}px`;

        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800);
    },

    // Edge-wrap explosion effect
    createExplosion(x, y, count = 20) {
        const clampedX = Math.max(20, Math.min(window.innerWidth - 20, x));
        const clampedY = Math.max(20, Math.min(window.innerHeight - 20, y));

        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF9F1C', '#9B5DE5', '#1A1A1A'];

        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.floor(Math.random() * 16) + 8;

            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.backgroundColor = color;
            p.style.left = `${clampedX}px`;
            p.style.top = `${clampedY}px`;

            const angle = (i / count) * Math.PI * 2;
            const distance = Math.random() * 70 + 30;
            const destX = clampedX + Math.cos(angle) * distance;
            const destY = clampedY + Math.sin(angle) * distance;

            p.animate([
                { transform: 'translate(-50%, -50%) scale(1)', left: `${clampedX}px`, top: `${clampedY}px`, opacity: 1 },
                { transform: 'translate(-50%, -50%) scale(0)', left: `${destX}px`, top: `${destY}px`, opacity: 0 }
            ], {
                duration: 600 + Math.random() * 300,
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                fill: 'forwards'
            });

            document.body.appendChild(p);
            setTimeout(() => p.remove(), 900);
        }
    }
};

// 3. Automatically inject the floating home navigation button
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.home-nav-btn')) {
        const homeBtn = document.createElement('a');
        homeBtn.href = '../index.html';
        homeBtn.className = 'home-nav-btn';
        homeBtn.title = 'Back to Home Hub';
        homeBtn.innerHTML = '🏠';
        document.body.appendChild(homeBtn);
    }
});

/* Shared interaction model for the baby activities. */
const BabyModel = Object.freeze({
    tapColors: Object.freeze([
        '#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C',
        '#FF9F1C', '#9B5DE5', '#F72585', '#7209B7',
        '#4CC9F0', '#06D6A0', '#EF476F', '#118AB2'
    ]),

    tapFrequencies: Object.freeze([
        523.25, 587.33, 659.25, 698.46,
        783.99, 880.00, 987.77, 1046.50
    ]),

    randomItem(items) {
        return items[Math.floor(Math.random() * items.length)];
    },

    nextColor(currentColor) {
        const colors = this.tapColors;
        if (colors.length < 2) return colors[0];

        let nextColor;
        do {
            nextColor = this.randomItem(colors);
        } while (nextColor === currentColor);

        return nextColor;
    },

});
