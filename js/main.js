/*!
 * Main JavaScript file for the application.
 * Handles theme switching.
 */

document.addEventListener('DOMContentLoaded', () => {
    const themeToggles = document.querySelectorAll('.theme-toggle, .theme-toggle-dash');
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Apply the saved theme on initial load
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Add event listener for all theme toggle buttons
    themeToggles.forEach(toggle => {
        if (toggle) {
            toggle.addEventListener('click', () => {
                let newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });
        }
    });
});

/*!
 * Sliding Tab Navigation Effect
 */
document.addEventListener('DOMContentLoaded', () => {
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links > li > a');
    const highlight = document.querySelector('.nav-highlight');

    if (!navLinksContainer || !highlight) return;

    function highlightLink(e) {
        const link = e.target;
        const linkCoords = link.getBoundingClientRect();
        const containerCoords = navLinksContainer.getBoundingClientRect();

        const coords = {
            width: linkCoords.width,
            height: linkCoords.height,
            top: linkCoords.top - containerCoords.top,
            left: linkCoords.left - containerCoords.left
        };

        highlight.style.width = `${coords.width}px`;
        highlight.style.height = `${coords.height}px`;
        highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
        highlight.style.opacity = '1';
    }

    function hideHighlight() {
        highlight.style.opacity = '0';
    }

    navLinks.forEach(a => a.addEventListener('mouseenter', highlightLink));
    navLinksContainer.addEventListener('mouseleave', hideHighlight);
});

/*!
 * Mobile Navigation Toggle
 */
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const body = document.body;

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            body.classList.toggle('mobile-nav-open');
            const isExpanded = body.classList.contains('mobile-nav-open');
            hamburgerBtn.setAttribute('aria-expanded', isExpanded);
        });
    }
});

/*!
 * Toast Notification Function
 * @param {string} message - The message to display.
 * @param {string} type - 'success' or 'error'.
 */
function showToast(message, type = 'success') {
    const container = document.querySelector('.toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    toast.innerHTML = `
        <div class="toast-header">
            <span>${type.charAt(0).toUpperCase() + type.slice(1)}</span>
            <button class="close">&times;</button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Auto-dismiss
    const dismissTimeout = setTimeout(() => {
        toast.classList.remove('show');
        // Remove from DOM after transition
        toast.addEventListener('transitionend', () => toast.remove());
    }, 5000);

    // Manual dismiss
    toast.querySelector('.close').addEventListener('click', () => {
        clearTimeout(dismissTimeout);
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove());
    });
}
