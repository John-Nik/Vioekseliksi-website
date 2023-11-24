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
            }
            if (numberOfOffers == 2 || numberOfOffers == 3) {
                offersLayers.forEach((layer) => {
                    layer.style.gap = '24px';
                })
            }


            let execution = 0;
            
            for (let i = 0; i < numberOfOffers; i++) {
                let forLoopIteration = i+1;
                let forLoopIterationPlusOne = forLoopIteration + 1;
                let individualOfferInformation = data.offersList[execution];
                let individualOfferInformationPlusOne = data.offersList[forLoopIteration];
                

                if (forLoopIterationPlusOne == numberOfOffers + 1) {
                    forLoopIterationPlusOne = forLoopIterationPlusOne - numberOfOffers;
                    individualOfferInformationPlusOne = data.offersList[0];
                }
                
                

                offersLayer1.innerHTML += `<img class="img${forLoopIteration} offerimg" src="${individualOfferInformation.image}" alt="">`;
                offersLayer2.innerHTML += `<img class="img${forLoopIterationPlusOne} offerimg2" src="${individualOfferInformationPlusOne.image}" alt="">`;
                execution++;
                if (i == numberOfOffers - 1) {
                    return flipOffers();
                }
            }


            
            function flipOffers() {
                const offerImage = document.querySelectorAll('.offerimg');
                const offerImage2 = document.querySelectorAll('.offerimg2');
                let executed = 0;
                let iteration = 1 + executed;
                let iteration2 = 2;
                console.log(iteration);
                setTimeout(offersdisplayedfunction, 12000);

                function offersdisplayedfunction() {
                    
                    console.log(iteration);
                    setInterval(offersdisplayedfunction, 12000);

                    offerImage.forEach((blabla) => {
                        let displayedOffer = data.offersList[iteration];
                        console.log(`For the first layer, the picture visible is on array position: ${iteration}`);
                        if (iteration >= numberOfOffers - 1) {
                            iteration = 0;
                            blabla.src = `${displayedOffer.image}`;
                            console.log('iteration reset to 0');
                            return;
                        }
                        blabla.src = `${displayedOffer.image}`;
                        iteration++;
                        
                        
                    })
                    executed++;
                }
                
            }
                
            
        })

setTimeout(offersInitialFadeInOutEffect, 5000);
setInterval(offersFadeInOutEffect, 10000);

function offersFadeInOutEffect() {
    offersLayers.forEach((layer) => {
        layer.classList.toggle('visible')
    })
    setTimeout(() => {
        offersLayers.forEach((layer) => {
            layer.classList.toggle('visible')
        })
    }, 5000)
}

function offersInitialFadeInOutEffect() {
    offersLayers.forEach((layer) => {
        layer.classList.toggle('visible')
    })
}

