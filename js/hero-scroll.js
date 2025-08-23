/*!
 * JS-Powered Seamless Infinite Scroll
 */
document.addEventListener('DOMContentLoaded', () => {
    const columns = document.querySelectorAll('.scrolling-column');
    if (!columns.length) {
        return;
    }

    // Use ResizeObserver to recalculate on window resize for robustness
    const observer = new ResizeObserver(() => {
        // Calculate the total height of the content in the first column
        // This assumes all columns have similar content structure
        let totalHeight = 0;
        const columnItems = columns[0].querySelectorAll('.product-card-sm');

        // We only calculate the height of the first half of the items,
        // since the second half is a duplicate for the infinite scroll effect.
        const halfLength = Math.floor(columnItems.length / 2);

        for (let i = 0; i < halfLength; i++) {
            totalHeight += columnItems[i].offsetHeight;
        }
        // Add the gap heights
        const gap = parseFloat(getComputedStyle(columns[0]).gap) || 16; // 1rem fallback
        totalHeight += (halfLength) * gap;


        // Create a dynamic stylesheet
        const styleSheet = document.createElement('style');
        document.head.appendChild(styleSheet);

        // Define the keyframes with the exact calculated height
        const keyframes = `
            @keyframes scroll-up {
                from { transform: translateY(0); }
                to { transform: translateY(-${totalHeight}px); }
            }
        `;
        styleSheet.sheet.insertRule(keyframes, 0);

        // Apply the animation to each column
        columns.forEach((column, index) => {
            column.style.animation = `scroll-up 40s linear infinite`;
            if (index % 2 !== 0) {
                // The odd columns (2nd, 4th, etc.) scroll in the opposite direction
                column.style.animationDirection = 'reverse';
            }
        });

        // Disconnect the observer after the first calculation if you don't need it to be responsive
        // observer.disconnect();
    });

    // Start observing the container
    const container = document.querySelector('.hero-visual');
    if (container) {
        observer.observe(container);
    }
});
