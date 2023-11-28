const offersLayers = document.querySelectorAll('.layer');
const offersLayer1 = document.querySelector('.layer1');
const offersLayer2 = document.querySelector('.layer2');
const offersWrappingContainer = document.querySelector('.offers-wrapper');


const test = new Request('/assets/js/offers.json');

logMovies()
async function logMovies() {
    const response = await fetch(test);
    const jsonData = await response.json();
    const numberOfOffers = jsonData.offersList.length;

    if (numberOfOffers == 1) {
        offersWrappingContainer.style.opacity = '0';
    }
    if (numberOfOffers == 2 || numberOfOffers == 3) {
        offersLayers.forEach((layer) => {
            layer.style.gap = '24px';
        })
    }

    let populatingImagesExecutionCycle = 0;
    let populatingImagesExecutionCyclePlusOne = 1;
    
    for (let i = 0; i < numberOfOffers; i++) {
        let numberOfCycles = i+1;
        let numberOfCyclesPlusOne = numberOfCycles + 1;
        let individualOfferInformation = jsonData.offersList[populatingImagesExecutionCycle];
        let individualOfferInformationPlusOne = jsonData.offersList[numberOfCycles];
        
        if (numberOfCyclesPlusOne == numberOfOffers + 1) {
            numberOfCyclesPlusOne = numberOfCyclesPlusOne - numberOfOffers;
            individualOfferInformationPlusOne = jsonData.offersList[0];
        }

        if (i + 1 >= numberOfOffers) {
            populatingImagesExecutionCyclePlusOne = populatingImagesExecutionCyclePlusOne - numberOfOffers;
        }
        
        

        offersLayer1.innerHTML += `<img class="img${numberOfCycles} offerimg image" data-cycle="${i}" src="${individualOfferInformation.image}" alt="">`;
        offersLayer2.innerHTML += `<img class="img${numberOfCycles} offerimg2 image" data-cycle="${populatingImagesExecutionCyclePlusOne}" src="${individualOfferInformationPlusOne.image}" alt="">`;
        populatingImagesExecutionCycle++;
        populatingImagesExecutionCyclePlusOne++;
        if (i == 3 || i == numberOfOffers - 1) {
            return flipOffers();
        }
    }

    
    
    function flipOffers() {
        const offerImages = document.querySelectorAll('.image');
        const offerImage = document.querySelectorAll('.offerimg');
        const offerImage2 = document.querySelectorAll('.offerimg2');
        let layer2;
        let layer1;
        setTimeout(() => {
            layer1ImageChange();
            let layer1 = setInterval(layer1ImageChange, 20000);
        }, 12000);

        setTimeout(() => {
            layer2ImageChange();
            let layer2 = setInterval(layer2ImageChange, 20000);
        }, 22000);

        
        
        
        offerImages.forEach(userClickability);

        function userClickability(button) {
            button.addEventListener('click', flippingImageStop);
            button.addEventListener('click', (button) => {
                button.currentTarget.dataset.cycle
            })
        }

        function flippingImageStop() {
            clearInterval(6);
            clearInterval(5);
            clearInterval(intervalLayer);
            changeImagePosition;
        }

        function changeImagePosition() {

        }

        let intervalLayer = setInterval(offersFadeInOutEffect, 10000);

        function offersFadeInOutEffect() {
            offersLayers.forEach((layer) => {
                layer.classList.toggle('visible')
            })
        }

        function layer1ImageChange() {
            offerImage.forEach((blabla) => {
                executionCycle = blabla.dataset.cycle;
                executionCycle++;
                executionCycle++;
                if (executionCycle >= numberOfOffers) {
                    executionCycle = executionCycle - numberOfOffers;
                }
                blabla.dataset.cycle = executionCycle;
                blabla.src = jsonData.offersList[executionCycle].image;
            })
        }

        function layer2ImageChange() {
            offerImage2.forEach((blabla) => {
                executionCycle = blabla.dataset.cycle;
                executionCycle++;
                executionCycle++;
                if (executionCycle >= numberOfOffers) {
                    executionCycle = executionCycle - numberOfOffers;
                }
                blabla.dataset.cycle = executionCycle;
                blabla.src = jsonData.offersList[executionCycle].image;
            })
        }
    }
}