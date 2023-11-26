const offersLayers = document.querySelectorAll('.layer');
const offersLayer1 = document.querySelector('.layer1');
const offersLayer2 = document.querySelector('.layer2');
const offersWrappingContainer = document.querySelector('.offers-wrapper');

const test = new Request('/assets/js/offers.json');

fetch(test)
    .then((response) => response.json())
        .then((data) => {
            jsonData = data;
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
            let execution2 = 1;
            
            for (let i = 0; i < numberOfOffers; i++) {
                let forLoopIteration = i+1;
                let forLoopIterationPlusOne = forLoopIteration + 1;
                let individualOfferInformation = data.offersList[execution];
                let individualOfferInformationPlusOne = data.offersList[forLoopIteration];
                

                if (forLoopIterationPlusOne == numberOfOffers + 1) {
                    forLoopIterationPlusOne = forLoopIterationPlusOne - numberOfOffers;
                    individualOfferInformationPlusOne = data.offersList[0];
                }

                if (execution2 >= numberOfOffers) {
                    execution2 = execution2 - numberOfOffers;
                }
                
                

                offersLayer1.innerHTML += `<img class="img${forLoopIteration} offerimg" onclick="clicked();" data-cycle="${execution}" src="${individualOfferInformation.image}" alt="">`;
                offersLayer2.innerHTML += `<img class="img${forLoopIterationPlusOne} offerimg2" onclick="clicked();" data-cycle="${execution2}" src="${individualOfferInformationPlusOne.image}" alt="">`;
                execution++;
                execution2++;
                if (i == 3 || i == numberOfOffers - 1) {
                    return flipOffers();
                }
            }

            
            
            function flipOffers() {
                const offerImage = document.querySelectorAll('.offerimg');
                const offerImage2 = document.querySelectorAll('.offerimg2');
                setTimeout(offersdisplayedfunction, 12000);

                function offersdisplayedfunction() {

                    var imagesChanged = setTimeout(offersdisplayedfunction, 20000);
                    var layer2ImageChangeVar = setTimeout(layer2ImageChange, 10000);
                    
                    layer1ImageChange();
                    


                    

                    function layer2ImageChange() {
                        offerImage2.forEach((blabla) => {
                            executionCycle = blabla.dataset.cycle;
                            executionCycle++;
                            executionCycle++;
                            if (executionCycle >= numberOfOffers) {
                                executionCycle = executionCycle - numberOfOffers;
                            }
                            blabla.dataset.cycle = executionCycle;
                            blabla.src = data.offersList[executionCycle].image;
                        })
                        console.log('layer2 Images Changed');
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
                            blabla.src = data.offersList[executionCycle].image;
                        })
                        console.log('layer1 Images Changed');
                    }
                }
            }
        })


var intervalLayer = setInterval(offersFadeInOutEffect, 10000);

function offersFadeInOutEffect() {
    offersLayers.forEach((layer) => {
        layer.classList.toggle('visible')
    })
    if (offersLayer1.classList.contains('visible')) {
        console.log('layer 1 has visibility');
    } else {
        console.log('layer 2 has visibility');
    }
}

function clicked(buttonClicked) {
    clearInterval(intervalLayer);
    console.log('clear interval for the layer opacity switching');
    
}