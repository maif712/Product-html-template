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
 * Springy/Watery Navigation Hover Effect
 */
document.addEventListener('DOMContentLoaded', () => {
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links > li > a');
    const highlight = document.querySelector('.nav-highlight');

    if (!navLinksContainer || !highlight) return;

    let target = { x: 0, y: 0, width: 0, height: 0, opacity: 0 };
    let current = { ...target };
    let velocity = { x: 0, y: 0, width: 0, height: 0 };

    // Physics parameters
    const stiffness = 0.1;
    const damping = 0.6;

    function updateTarget(element) {
        if (!element) {
            target.opacity = 0;
            return;
        }
        const rect = element.getBoundingClientRect();
        const containerRect = navLinksContainer.getBoundingClientRect();
        target.x = rect.left - containerRect.left;
        target.y = rect.top - containerRect.top;
        target.width = rect.width;
        target.height = rect.height;
        target.opacity = 1;
    }

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => updateTarget(link));
    });

    navLinksContainer.addEventListener('mouseleave', () => updateTarget(null));

    function animate() {
        // Update position
        let forceX = (target.x - current.x) * stiffness;
        velocity.x = (velocity.x + forceX) * damping;
        current.x += velocity.x;

        let forceY = (target.y - current.y) * stiffness;
        velocity.y = (velocity.y + forceY) * damping;
        current.y += velocity.y;

        // Update size
        let forceWidth = (target.width - current.width) * stiffness;
        velocity.width = (velocity.width + forceWidth) * damping;
        current.width += velocity.width;

        let forceHeight = (target.height - current.height) * stiffness;
        velocity.height = (velocity.height + forceHeight) * damping;
        current.height += velocity.height;

        // Update opacity
        current.opacity += (target.opacity - current.opacity) * 0.1;

        highlight.style.transform = `translate(${current.x}px, ${current.y}px)`;
        highlight.style.width = `${current.width}px`;
        highlight.style.height = `${current.height}px`;
        highlight.style.opacity = current.opacity;

        requestAnimationFrame(animate);
    }

    animate();
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
