const dataIndexElements = document.querySelectorAll('[data-index]');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

console.log(dataIndexElements)

function incrementCarousel() {
    dataIndexElements.forEach((element) => {
        ++element.dataset.index;
        
        if (element.dataset.index >= 10) {
            element.dataset.index = element.dataset.index - 10;
        }

        if (element.dataset.index < 0) {
            element.dataset.index = 9;
        }
    })
}

function decrementCarousel() {
    dataIndexElements.forEach((element) => {
        --element.dataset.index;
        
        if (element.dataset.index >= 10) {
            element.dataset.index = element.dataset.index - 10;
        }

        if (element.dataset.index < 0) {
            element.dataset.index = 9;
        }
    })
}

let carouselTimer = setInterval(incrementCarousel, 4000)

leftArrow.addEventListener('click', () => {
    decrementCarousel();

    clearInterval(carouselTimer);

    carouselTimer = setInterval(incrementCarousel, 4000)
})

rightArrow.addEventListener('click', () => {
    incrementCarousel();

    clearInterval(carouselTimer);

    carouselTimer = setInterval(incrementCarousel, 4000)
})