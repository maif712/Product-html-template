/*!
 * Coverflow Carousel JavaScript
 */
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-3d');
    if (!carousel) return;

    const items = Array.from(document.querySelectorAll('.carousel-3d-item'));
    const prevButton = document.querySelector('.carousel-3d-prev');
    const nextButton = document.querySelector('.carousel-3d-next');

    const totalItems = items.length;
    let currentIndex = 0;
    let autoPlayInterval;

    function updateCarousel() {
        items.forEach((item, i) => {
            let offset = i - currentIndex;
            if (offset < -totalItems / 2) offset += totalItems;
            if (offset > totalItems / 2) offset -= totalItems;

            const scale = Math.max(0, 1 - Math.abs(offset) * 0.2);
            const rotateY = -offset * 35;
            const translateX = offset * (window.innerWidth < 768 ? 100 : 150);
            const translateZ = -Math.abs(offset) * 150;
            const zIndex = 10 - Math.abs(offset);
            const opacity = Math.max(0, 1 - Math.abs(offset) * 0.3);

            let transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;

            if (offset === 0) {
                 transform = `translateX(0) translateZ(50px) rotateY(0deg) scale(1.1)`;
            }

            item.style.transform = transform;
            item.style.zIndex = zIndex;
            item.style.opacity = opacity;
        });
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            goToIndex(currentIndex + 1);
        }, 4000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function goToIndex(index) {
        currentIndex = (index % totalItems + totalItems) % totalItems; // Handles positive and negative wrapping
        updateCarousel();
    }

    // Event Listeners
    nextButton.addEventListener('click', () => {
        goToIndex(currentIndex + 1);
    });

    prevButton.addEventListener('click', () => {
        goToIndex(currentIndex - 1);
    });

    items.forEach((item, i) => {
        item.addEventListener('click', () => {
            if (i !== currentIndex) {
                goToIndex(i);
            }
        });
    });

    document.querySelector('.carousel-3d-container').addEventListener('mouseenter', stopAutoPlay);
    document.querySelector('.carousel-3d-container').addEventListener('mouseleave', startAutoPlay);

    // Initial setup
    updateCarousel();
    startAutoPlay();
});
