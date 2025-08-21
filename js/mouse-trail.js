/*!
 * Gooey Mouse Trail Effect (v5 - Smaller, More Visual)
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
    const numDots = 15; // Adjusted for a slightly longer but smaller trail
    const cursor = { x: 0, y: 0 };
    let hue = 0;

    // For speed detection
    let lastMousePos = { x: 0, y: 0 };
    let mouseSpeed = 0;

    // Create the dots
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('trail-dot');
        trailContainer.appendChild(dot);
        dots.push({
            element: dot,
            x: 0,
            y: 0,
        });
    }

    // Listen for mouse movement
    window.addEventListener('mousemove', (e) => {
        mouseSpeed = Math.hypot(e.clientX - lastMousePos.x, e.clientY - lastMousePos.y);
        lastMousePos = { x: e.clientX, y: e.clientY };
        cursor.x = e.clientX;
        cursor.y = e.clientY;
    });

    // Animation loop
    function animateDots() {
        // Ease the mouse speed back to 0
        mouseSpeed *= 0.96;

        // Move the first dot towards the cursor
        dots[0].x += (cursor.x - dots[0].x) * 0.4;
        dots[0].y += (cursor.y - dots[0].y) * 0.4;

        // Animate the rest of the dots
        for (let i = 1; i < numDots; i++) {
            const currentDot = dots[i];
            const leader = dots[i - 1];

            currentDot.x += (leader.x - currentDot.x) * 0.4;
            currentDot.y += (leader.y - currentDot.y) * 0.4;
        }

        // Apply styles to all dots
        dots.forEach((dot, index) => {
            const stretch = 1 + Math.min(mouseSpeed / 30, 1);
            const scale = (numDots - index) / numDots;

            // Offset to center the dot
            const size = 22; // Must match CSS width/height
            const transformX = dot.x - size / 2;
            const transformY = dot.y - size / 2;

            dot.element.style.transform = `translate(${transformX}px, ${transformY}px) scaleX(${stretch * scale}) scaleY(${(1 / stretch) * scale})`;
            dot.element.style.backgroundColor = `hsl(${hue + index * 15}, 100%, 70%)`;
        });

        hue++;
        requestAnimationFrame(animateDots);
    }

    animateDots();
});
