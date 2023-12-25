const hiddenElements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((elements) => {
    elements.forEach((element) => {
        if ( element.isIntersecting ) {
            element.target.classList.remove('hidden');
            element.target.classList.add('show');
        }
    })
});

hiddenElements.forEach((element) => observer.observe(element));