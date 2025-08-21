/*!
 * Fancy Mouse Trail Effect (v3 - Serpentine Motion)
 */
document.addEventListener('DOMContentLoaded', () => {
    // Only run on screens wider than a typical mobile phone
    if (window.innerWidth < 768) {
        return;
    }

    const dots = [];
    const numDots = 20;
    const cursor = { x: 0, y: 0 };
    let angle = 0;

    // Create the dots
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('trail-dot');
        document.body.appendChild(dot);
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
        // Move the first dot directly to the cursor
        dots[0].x = cursor.x;
        dots[0].y = cursor.y;

        // Animate the rest of the dots
        dots.forEach((dot, index) => {
            if (index === 0) return; // Skip the first dot

            const leader = dots[index - 1];

            // Move each dot towards the one in front of it
            dot.x += (leader.x - dot.x) * 0.3; // Slower easing for a longer trail
            dot.y += (leader.y - dot.y) * 0.3;

            // Calculate scale and opacity
            const scale = (numDots - index) / numDots;
            const opacity = scale * 0.8;

            // Calculate serpentine offset
            const wiggleFactor = 15;
            const offsetX = Math.sin(angle + index * 0.4) * wiggleFactor * scale;
            const offsetY = Math.cos(angle + index * 0.4) * wiggleFactor * scale;

            // Apply the transform, including the wiggle
            // The translate moves the top-left corner, so we offset by half the scaled size
            const size = 12 * scale;
            const transformX = dot.x + offsetX - size / 2;
            const transformY = dot.y + offsetY - size / 2;

            dot.element.style.transform = `translate(${transformX}px, ${transformY}px) scale(${scale})`;
            dot.element.style.opacity = opacity;
        });

        angle += 0.1; // Increment angle for the next frame
        requestAnimationFrame(animateDots);
    }

    // Hide trail when mouse leaves the window
    document.addEventListener('mouseleave', () => {
        dots.forEach(dot => dot.element.style.opacity = '0');
    });

    // Show trail when mouse enters the window
     document.addEventListener('mouseenter', () => {
        dots.forEach(dot => dot.element.style.opacity = '1');
    });

    animateDots();
});
