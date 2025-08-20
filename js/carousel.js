/*!
 * 3D Carousel JavaScript
 */
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-3d');
    if (!carousel) return;

    const items = document.querySelectorAll('.carousel-3d-item');
    const prevButton = document.querySelector('.carousel-3d-prev');
    const nextButton = document.querySelector('.carousel-3d-next');

    const totalItems = items.length;
    const angle = 360 / totalItems;
    const radius = 300; // Adjust this to change the circle radius

    let currentIndex = 0;
    let autoPlayInterval;

    function setupCarousel() {
        items.forEach((item, i) => {
            const rotation = i * angle;
            item.style.transform = `rotateY(${rotation}deg) translateZ(${radius}px)`;
        });
    }

    function rotateCarousel() {
        const targetAngle = -currentIndex * angle;
        carousel.style.transform = `rotateY(${targetAngle}deg)`;
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            currentIndex++;
            rotateCarousel();
        }, 4000); // Change slide every 4 seconds
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Event Listeners
    nextButton.addEventListener('click', () => {
        currentIndex++;
        rotateCarousel();
    });

    prevButton.addEventListener('click', () => {
        currentIndex--;
        rotateCarousel();
    });

    // Pause on hover
    document.querySelector('.carousel-3d-container').addEventListener('mouseenter', stopAutoPlay);
    document.querySelector('.carousel-3d-container').addEventListener('mouseleave', startAutoPlay);


    // Initial setup
    setupCarousel();
    rotateCarousel();
    startAutoPlay();
});
