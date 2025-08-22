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
 * Directional Aware Hover Effect for Navigation
 */
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');

    const getDirection = (e, element) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const w = rect.width;
        const h = rect.height;

        const top = Math.abs(y);
        const bottom = Math.abs(y - h);
        const left = Math.abs(x);
        const right = Math.abs(x - w);

        const min = Math.min(top, bottom, left, right);

        switch (min) {
            case left: return 'from-left';
            case right: return 'from-right';
            case top: return 'from-top';
            case bottom: return 'from-bottom';
            default: return 'from-left';
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            link.dataset.direction = getDirection(e, link);
        });

        link.addEventListener('mouseleave', (e) => {
            // Set the exit direction to be the same as the entry for a consistent out-animation
            link.dataset.direction = getDirection(e, link);
        });
    });
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
