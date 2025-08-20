/*!
 * Main JavaScript file for the application.
 * Handles theme switching.
 */

document.addEventListener('DOMContentLoaded', () => {
    const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-dash');
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Apply the saved theme on initial load
    document.documentElement.setAttribute('data-theme', currentTheme);

    const updateToggleIcons = (theme) => {
        themeToggles.forEach(toggle => {
            if (toggle) {
                toggle.innerHTML = theme === 'dark' ? '🌙' : '☀️';
            }
        });
    };

    // Set the toggle buttons' initial state
    updateToggleIcons(currentTheme);

    // Add event listener for all theme toggle buttons
    themeToggles.forEach(toggle => {
        if (toggle) {
            toggle.addEventListener('click', () => {
                let newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateToggleIcons(newTheme);
            });
        }
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
