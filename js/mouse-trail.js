/*!
 * Fancy Mouse Trail Effect (v2 - New Approach)
 */
document.addEventListener('DOMContentLoaded', () => {
    // Only run on screens wider than a typical mobile phone
    if (window.innerWidth < 768) {
        return;
    }

    const dots = [];
    const numDots = 20;
    const cursor = { x: 0, y: 0 };

    // Create the dots
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('trail-dot');
        document.body.appendChild(dot);
        dots.push({
            element: dot,
            x: 0,
            y: 0,
            // Each dot gets a progressively slower easing factor
            ease: 0.1 + (i / numDots) * 0.5
        });
    }

    // Listen for mouse movement
    window.addEventListener('mousemove', (e) => {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
    });

    // Animation loop
    function animateDots() {
        dots.forEach((dot, index) => {
            // Move each dot towards the cursor at its own speed
            dot.x += (cursor.x - dot.x) * dot.ease;
            dot.y += (cursor.y - dot.y) * dot.ease;

            // Calculate scale and opacity based on its index
            const scale = (numDots - index) / numDots;
            const opacity = scale;

            // Apply the transform. The CSS handles the base size.
            // The translate moves the center of the element.
            dot.element.style.transform = `translate(${dot.x}px, ${dot.y}px) scale(${scale})`;
            dot.element.style.opacity = opacity;
        });

        requestAnimationFrame(animateDots);
    }

    // Hide trail when mouse leaves the window
    document.addEventListener('mouseleave', () => {
        dots.forEach(dot => {
            dot.element.style.opacity = '0';
            dot.element.style.transition = 'opacity 0.5s ease'; // Add transition for smooth fade out
        });
    });

    // Show trail when mouse enters the window
     document.addEventListener('mouseenter', () => {
        dots.forEach(dot => {
            dot.element.style.opacity = '1';
            dot.element.style.transition = 'opacity 0.1s ease'; // Fast fade in
        });
    });

    animateDots();
});
