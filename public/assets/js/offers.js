const offersLayers = document.querySelectorAll('.layer');
const offersLayer1 = document.querySelector('.layer1');
const offersLayer2 = document.querySelector('.layer2');
const offersWrappingContainer = document.querySelector('.offers-wrapper');

const test = new Request('/assets/js/offers.json');

fetch(test)
    .then((response) => response.json())
        .then((data) => {
            let numberOfOffers = data.offersList.length;
            let offersArray = data.offersList.reverse();
            let loop = 1;

            if (numberOfOffers == 1) {
                offersWrappingContainer.style.opacity = '0';
            };
            if (numberOfOffers == 2) {
                offersLayers.forEach((layer) => {
                    layer.style.gap = '24px';
                })
            };
            if (numberOfOffers == 3) {
                offersLayers.forEach((layer) => {
                    layer.style.gap = '24px';
                })
            } else {
                // do nothing
            }

            for (let i = 0; i < numberOfOffers; i++) {
                let forLoopIteration = i+1;
                let forLoopIterationPlusOne = forLoopIteration + 1;

                if (forLoopIterationPlusOne == numberOfOffers + 1) {
                    forLoopIterationPlusOne = forLoopIterationPlusOne - numberOfOffers;
                }

                offersLayer1.innerHTML += `<img class="img${forLoopIteration}" src="/assets/img/offers${forLoopIteration}.png" alt="">`;
                offersLayer2.innerHTML += `<img class="img${forLoopIterationPlusOne}" src="/assets/img/offers${forLoopIterationPlusOne}.png" alt="">`;
            }


            
                
                
            
        });

setTimeout(offersInitialFadeInOutEffect, 5000);
setInterval(offersFadeInOutEffect, 10000);

function offersFadeInOutEffect() {
    offersLayer1.style.opacity = 1;
    offersLayer2.style.opacity = 0;
    setTimeout(() => {
        offersLayer1.style.opacity = 0;
        offersLayer2.style.opacity = 1;
    }, 5000);
};

function offersInitialFadeInOutEffect() {
    offersLayer1.style.opacity = 0;
    offersLayer2.style.opacity = 1;
};