/* Shared visual feedback services for Baby App activities. */
(function (window) {
    'use strict';

    const defaultColors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF9F1C', '#9B5DE5', '#1A1A1A'];

    window.ParticleEngine = Object.freeze({
        createTrail(x, y, options = {}) {
            if (Math.random() > (options.frequency ?? 0.4)) return;
            const particle = document.createElement('div');
            const colors = options.colors || defaultColors;
            const sizeLimit = Math.max(14, Math.round(Math.min(window.innerWidth, window.innerHeight) * 0.0625));
            const size = Math.floor(Math.random() * (sizeLimit - 14 + 1)) + 14;
            particle.className = 'particle';
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.left = `${x + (Math.random() * 20 - 10)}px`;
            particle.style.top = `${y + (Math.random() * 20 - 10)}px`;
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 800);
        },

        createExplosion(x, y, count = 20, colors = defaultColors) {
            const centerX = Math.max(20, Math.min(window.innerWidth - 20, x));
            const centerY = Math.max(20, Math.min(window.innerHeight - 20, y));
            for (let index = 0; index < count; index += 1) {
                const particle = document.createElement('div');
                const angle = (index / count) * Math.PI * 2;
                const distance = Math.random() * 70 + 30;
                const size = Math.floor(Math.random() * 16) + 8;
                const destinationX = centerX + Math.cos(angle) * distance;
                const destinationY = centerY + Math.sin(angle) * distance;
                particle.className = 'particle';
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.left = `${centerX}px`;
                particle.style.top = `${centerY}px`;
                particle.animate([
                    { transform: 'translate(-50%, -50%) scale(1)', left: `${centerX}px`, top: `${centerY}px`, opacity: 1 },
                    { transform: 'translate(-50%, -50%) scale(0)', left: `${destinationX}px`, top: `${destinationY}px`, opacity: 0 }
                ], { duration: 600 + Math.random() * 300, easing: 'cubic-bezier(0.25, 1, 0.5, 1)', fill: 'forwards' });
                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 900);
            }
        }
    });
})(window);
