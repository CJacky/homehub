/* Shared navigation for Baby App pages. */
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.home-nav-btn')) return;
    const homeButton = document.createElement('a');
    homeButton.href = '../index.html';
    homeButton.className = 'home-nav-btn';
    homeButton.title = 'Back to Home Hub';
    homeButton.setAttribute('aria-label', 'Back to Home Hub');
    homeButton.textContent = '🏠';
    document.body.appendChild(homeButton);
});
