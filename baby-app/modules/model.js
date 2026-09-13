/* Shared data and small pure helpers for Baby App activities. */
(function (window) {
    'use strict';

    const tapColors = Object.freeze([
        '#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C', '#FF9F1C', '#9B5DE5',
        '#F72585', '#7209B7', '#4CC9F0', '#06D6A0', '#EF476F', '#118AB2'
    ]);
    const tapFrequencies = Object.freeze([523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50]);

    window.BabyModel = Object.freeze({
        tapColors,
        tapFrequencies,
        randomItem(items) {
            return items[Math.floor(Math.random() * items.length)];
        },
        nextColor(currentColor) {
            if (tapColors.length < 2) return tapColors[0];
            let nextColor;
            do nextColor = this.randomItem(tapColors);
            while (nextColor === currentColor);
            return nextColor;
        }
    });
})(window);
