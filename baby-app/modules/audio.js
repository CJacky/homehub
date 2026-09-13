/* Shared audio services for Baby App activities. */
(function (window) {
    'use strict';

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const audioContext = AudioContextClass ? new AudioContextClass() : null;
    let unlockPromise = null;
    let warmupSource = null;

    function removeUnlockListeners() {
        ['touchstart', 'touchend', 'pointerdown', 'click'].forEach((eventName) => {
            window.removeEventListener(eventName, unlockAudio, true);
        });
    }

    function unlockAudio() {
        if (!audioContext) return Promise.resolve(false);

        if (audioContext.state !== 'running' && !unlockPromise) {
            const attempt = Promise.resolve(audioContext.resume())
                .then(() => audioContext.state === 'running')
                .catch(() => false);
            unlockPromise = attempt;
            attempt.then(() => {
                if (unlockPromise === attempt) unlockPromise = null;
            });
        }

        if (!warmupSource) {
            const buffer = audioContext.createBuffer(
                1,
                Math.ceil(audioContext.sampleRate * 0.5),
                audioContext.sampleRate
            );
            const source = audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(audioContext.destination);
            source.onended = () => { warmupSource = null; };
            source.start(0);
            warmupSource = source;
        }

        if (audioContext.state === 'running') {
            removeUnlockListeners();
            return Promise.resolve(true);
        }

        const pendingUnlock = unlockPromise || Promise.resolve(false);
        pendingUnlock.then((isReady) => {
            if (isReady) removeUnlockListeners();
        });
        return pendingUnlock;
    }

    ['touchstart', 'touchend', 'pointerdown', 'click'].forEach((eventName) => {
        window.addEventListener(eventName, unlockAudio, true);
    });

    window.WebAudioEngine = Object.freeze({
        unlock: unlockAudio,

        playTone(freq, duration = 0.12, type = 'sine', rampGain = true) {
            if (!audioContext) return;
            unlockAudio();

            const now = audioContext.currentTime;
            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();
            oscillator.type = type;
            oscillator.frequency.setValueAtTime(freq, now);
            if (rampGain) oscillator.frequency.exponentialRampToValueAtTime(freq * 1.15, now + duration);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
            oscillator.connect(gain).connect(audioContext.destination);
            oscillator.start(now);
            oscillator.stop(now + duration);
        },

        playArpeggio(freqs = [523.25, 659.25, 783.99, 1046.50], noteDuration = 0.18, stepTime = 0.05) {
            if (!audioContext) return;
            unlockAudio();

            const baseTime = audioContext.currentTime;
            freqs.forEach((freq, index) => {
                const oscillator = audioContext.createOscillator();
                const gain = audioContext.createGain();
                const startTime = baseTime + index * stepTime;
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(freq, startTime);
                gain.gain.setValueAtTime(0.18, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + noteDuration);
                oscillator.connect(gain).connect(audioContext.destination);
                oscillator.start(startTime);
                oscillator.stop(startTime + noteDuration);
            });
        }
    });
})(window);
