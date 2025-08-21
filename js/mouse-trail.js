/*!
 * Fancy Mouse Trail Effect
 */
document.addEventListener('DOMContentLoaded', () => {
    // Only run on screens wider than a typical mobile phone
    if (window.innerWidth < 768) {
        return;
    }

    const dots = [];
    const numDots = 15;
    const cursor = {
        x: 0,
        y: 0,
    };

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
        let prevDot = dots[0];

        // Move the first dot towards the cursor
        prevDot.x += (cursor.x - prevDot.x) * 0.6;
        prevDot.y += (cursor.y - prevDot.y) * 0.6;

        // Animate the first dot
        prevDot.element.style.transform = `translate(${prevDot.x}px, ${prevDot.y}px)`;

        // Animate the rest of the dots
        for (let i = 1; i < numDots; i++) {
            const currentDot = dots[i];
            const leader = dots[i - 1];

            currentDot.x += (leader.x - currentDot.x) * 0.6;
            currentDot.y += (leader.y - currentDot.y) * 0.6;

            // Calculate scale and opacity based on position in the trail
            const scale = (numDots - i) / numDots;
            const opacity = scale * 0.7;

            currentDot.element.style.transform = `translate(${currentDot.x}px, ${currentDot.y}px) scale(${scale})`;
            currentDot.element.style.opacity = opacity;

            // Set size of the dot
            const size = scale * 12;
            currentDot.element.style.width = `${size}px`;
            currentDot.element.style.height = `${size}px`;
        }

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
