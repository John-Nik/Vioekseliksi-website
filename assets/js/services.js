let currentSlide = 0;

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateCarousel();
  }
}

function nextSlide() {
  if (currentSlide < 2 /* Number of slides - 1 */) {
    currentSlide++;
    updateCarousel();
  }
}

function updateCarousel() {
  const carousel = document.querySelector('.carousel');
  carousel.style.transform = `translateX(${-currentSlide * 33.33}%)`;
}