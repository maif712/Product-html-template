/*!
 * Interactive Shard Trail (v5 - Explode on Click)
 */
document.addEventListener('DOMContentLoaded', () => {
    // Only run on screens wider than a typical mobile phone
    if (window.innerWidth < 768) {
        return;
    }

    const dots = [];
    const numDots = 20;
    const cursor = { x: 0, y: 0 };
    let hue = 0;
    let isExploding = false;

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

    // Listen for clicks
    window.addEventListener('click', () => {
        if (isExploding) return;
        isExploding = true;

        dots.forEach(dot => {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 200 + 100;
            const explosionX = dot.x + Math.cos(angle) * distance;
            const explosionY = dot.y + Math.sin(angle) * distance;

            dot.element.style.transform = `translate(${explosionX}px, ${explosionY}px) scale(0)`;
            dot.element.style.opacity = '0';
        });

        setTimeout(() => {
            isExploding = false;
        }, 600);
    });

    // Animation loop
    function animateDots() {
        if (!isExploding) {
            // Move the first dot towards the cursor
            dots[0].x += (cursor.x - dots[0].x) * 0.3;
            dots[0].y += (cursor.y - dots[0].y) * 0.3;

            // Animate the rest of the dots
            for (let i = 1; i < numDots; i++) {
                const leader = dots[i - 1];
                dots[i].x += (leader.x - dots[i].x) * 0.3;
                dots[i].y += (leader.y - dots[i].y) * 0.3;
            }

            // Apply styles to all dots
            dots.forEach((dot, index) => {
                const scale = (numDots - index) / numDots;
                const transformX = dot.x - (10 * scale);
                const transformY = dot.y - (10 * scale);

                dot.element.style.transform = `translate(${transformX}px, ${transformY}px) scale(${scale})`;
                dot.element.style.opacity = '1';
                dot.element.style.backgroundColor = `hsl(${hue + index * 10}, 100%, 70%)`;
            });
        }

        hue++;
        requestAnimationFrame(animateDots);
    }

    animateDots();
});
