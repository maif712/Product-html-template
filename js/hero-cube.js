/*!
 * Interactive Hero Cube
 */
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    const cube = document.querySelector('.cube');

    if (!heroSection || !cube) {
        return;
    }

    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation based on mouse position relative to the center
        // The further from the center, the more it rotates.
        const rotateY = (x - centerX) * 0.05; // Adjust multiplier for sensitivity
        const rotateX = (y - centerY) * -0.05; // Invert for natural feel

        // Set the custom properties on the cube element
        cube.style.setProperty('--rotate-x', `${rotateX}deg`);
        cube.style.setProperty('--rotate-y', `${rotateY}deg`);
    });

    // Reset to default position when mouse leaves
    heroSection.addEventListener('mouseleave', () => {
        cube.style.setProperty('--rotate-x', `-25deg`);
        cube.style.setProperty('--rotate-y', `-25deg`);
    });
});
