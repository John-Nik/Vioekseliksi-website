const dataIndexElements= document.querySelectorAll('[data-index]');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const card = document.querySelectorAll('.card');




function incrementCarousel() {
    dataIndexElements.forEach((element) => {
        ++element.dataset.index;
        
        if (element.dataset.index >= dataIndexElements.length) {
            element.dataset.index = element.dataset.index - dataIndexElements.length;
        }

        if (element.dataset.index < 0) {
            element.dataset.index = dataIndexElements.length - 1;
        }
    })
}

function decrementCarousel() {
    dataIndexElements.forEach((element) => {
        --element.dataset.index;
        
        if (element.dataset.index >= dataIndexElements.length) {
            element.dataset.index = element.dataset.index - dataIndexElements.length;
        }

        if (element.dataset.index < 0) {
            element.dataset.index = dataIndexElements.length - 1;
        }
    })
}

let carouselTimer = setInterval(incrementCarousel, 4000)

leftArrow.addEventListener('click', () => {
    card.forEach((c) => {
        c.style.transitionDuration = '0.25s'
    })
    setTimeout(() => {
        card.forEach((c) => {
            c.style.transitionDuration = '1s'
        })
    }, 270)
    decrementCarousel();

    clearInterval(carouselTimer);

    carouselTimer = setInterval(incrementCarousel, 4000)
})

rightArrow.addEventListener('click', () => {
    card.forEach((c) => {
        c.style.transitionDuration = '0.25s'
    })
    setTimeout(() => {
        card.forEach((c) => {
            c.style.transitionDuration = '1s'
        })
    }, 270)
    incrementCarousel();

    clearInterval(carouselTimer);

    carouselTimer = setInterval(incrementCarousel, 4000)
})