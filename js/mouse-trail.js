/*!
 * Gooey Mouse Trail Effect (v4 - SVG Filter Approach)
 */
document.addEventListener('DOMContentLoaded', () => {
    // Only run on screens wider than a typical mobile phone
    if (window.innerWidth < 768) {
        return;
    }

    const trailContainer = document.createElement('div');
    trailContainer.className = 'trail-container';
    document.body.appendChild(trailContainer);

    const dots = [];
    const numDots = 10; // Fewer, larger dots work better for this effect
    const cursor = { x: 0, y: 0 };

    // Create the dots
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('trail-dot');
        trailContainer.appendChild(dot); // Append to the container
        dots.push({
            element: dot,
            x: 0,
            y: 0,
        });
    }

    // Listen for mouse movement
    window.addEventListener('mousemove', (e) => {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
    });

    // Animation loop
    function animateDots() {
        // Move the first dot towards the cursor
        dots[0].x += (cursor.x - dots[0].x) * 0.3;
        dots[0].y += (cursor.y - dots[0].y) * 0.3;
        dots[0].element.style.transform = `translate(${dots[0].x - 15}px, ${dots[0].y - 15}px)`;

        // Animate the rest of the dots
        for (let i = 1; i < numDots; i++) {
            const currentDot = dots[i];
            const leader = dots[i - 1];

            currentDot.x += (leader.x - currentDot.x) * 0.3;
            currentDot.y += (leader.y - currentDot.y) * 0.3;

            currentDot.element.style.transform = `translate(${currentDot.x - 15}px, ${currentDot.y - 15}px)`;
        }

        requestAnimationFrame(animateDots);
    }

    // Hide trail when mouse leaves the window
    document.addEventListener('mouseleave', () => {
        trailContainer.style.opacity = '0';
    });

    // Show trail when mouse enters the window
     document.addEventListener('mouseenter', () => {
        trailContainer.style.opacity = '1';
    });

    animateDots();
});
